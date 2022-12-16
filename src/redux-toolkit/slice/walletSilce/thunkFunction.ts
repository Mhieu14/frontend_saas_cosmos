import { createAsyncThunk } from '@reduxjs/toolkit';
import { IConnectWalletInput, IConnectWalletOutput, ICreateValidatorInput, ISendDelegateInput, ISignUserLoginInput } from './type';
import VchainCosm from '@tovchain/cosms';
import { BaseProvider } from '@tovchain/cosms/build/main/lib/providers';
import { Wallet } from '@tovchain/cosms/build/main/lib/wallet';
import { BaseThunkApiProps } from 'src/redux-toolkit/stores';
import { coin, GasPrice, SigningStargateClient, StdFee } from '@cosmjs/stargate';
import Long from 'long';
import { MsgCreateValidator } from 'cosmjs-types/cosmos/staking/v1beta1/tx';
import Cosm from '@tovchain/cosms';
import { fromBase64 } from '@cosmjs/encoding';
import { baseDivident, BN, concatTypedArrays } from 'src/utils';
import { callApiNodes } from 'src/api/nodes/callApi';

export const thunkFuntion = {
    connectWallet: createAsyncThunk<IConnectWalletOutput, IConnectWalletInput, BaseThunkApiProps>('wallet/connect-wallet', async (input, thunkApi) => {
        const {
            notifier: { notifyWarn, notifyError, notifySuccess },
        } = input;
        const { chainConnectedInfo: chainConfig } = thunkApi.getState().wallet;
        if (!window.keplr) {
            notifyWarn('You must install Keplr to continue!');
            return {
                address: '',
                vchainClient: null,
                cosmStargateClient: null,
            };
        } else {
            try {
                await window.keplr.enable(chainConfig.chainId);
            } catch (err) {
                // console.log((err as Error).message);
                if ((err as Error).message == 'Request rejected') {
                    localStorage.setItem('isConnected', 'no');
                    notifyError('Request rejected');
                    return {
                        address: '',
                        vchainClient: null,
                        cosmStargateClient: null,
                    };
                } else {
                    await window.keplr.experimentalSuggestChain(chainConfig);
                }
            }
            try {
                // TODO: setup VchainCosm--------------------------------------
                const provider = new BaseProvider();
                await provider.connect(chainConfig.rpc, chainConfig.bech32Config.bech32PrefixAccAddr, chainConfig.feeCurrencies[0].coinMinimalDenom);

                const offlineSigner = window.keplr.getOfflineSigner(chainConfig.chainId);
                const wallets = await Wallet.getWalletsFromOfflineSigner(provider, offlineSigner);
                const wallet = wallets[0];

                const vChainCosm = new VchainCosm(provider);
                await vChainCosm.setWallet(wallet);

                // TODO: setup cosmjs stargate----------------------------------
                const _cosmStargateClient: SigningStargateClient = await SigningStargateClient.connectWithSigner(chainConfig.rpc, offlineSigner, {
                    gasPrice: GasPrice.fromString(`0${chainConfig.feeCurrencies[0].coinMinimalDenom}`),
                });

                window.keplr.defaultOptions = {
                    sign: {
                        preferNoSetFee: true,
                        preferNoSetMemo: true,
                    },
                };

                notifySuccess('Successfully connected with address: ' + wallet.address);

                return {
                    address: wallet.address,
                    vchainClient: vChainCosm,
                    cosmStargateClient: _cosmStargateClient,
                };
            } catch (err) {
                console.log(err);
                return {
                    address: '',
                    vchainClient: null,
                    cosmStargateClient: null,
                };
            }
        }
    }),
    sendDelegate: createAsyncThunk<void, ISendDelegateInput, BaseThunkApiProps>('wallet/send-delegate', async (input, thunkApi) => {
        const { notifier, amount, validatorAddress } = input;
        const { notifyError, notifySuccess } = notifier;
        const { vchainClient, address, chainConnectedInfo, cosmStargateClient } = thunkApi.getState().wallet;

        if (!vchainClient || !cosmStargateClient) {
            notifyError('You have not connected your wallet yet!');
        } else {
            try {
                const denomStake = chainConnectedInfo?.stakeCurrency?.coinMinimalDenom || '';
                const denomFee = chainConnectedInfo?.feeCurrencies[0]?.coinMinimalDenom || '';

                const amountDelegate = coin(amount, denomStake);
                const fee: StdFee = {
                    gas: '180000',
                    amount: [{ amount: '0', denom: denomFee }],
                };

                const tx = await cosmStargateClient.delegateTokens(address, validatorAddress, amountDelegate, fee);
                console.log(tx);
                notifySuccess('Transaction successful!');
            } catch (err) {
                console.log(err);
                notifyError('Transaction error!');
            }
        }
    }),
    createValidator: createAsyncThunk<void, ICreateValidatorInput, BaseThunkApiProps>('wallet/create-validator', async (input, thunkApi) => {
        const { notifier, nodePublicKey, dataEnter, nodeName, nodeId } = input;
        const { notifyError, notifySuccess } = notifier;
        const { vchainClient, address, chainConnectedInfo, cosmStargateClient } = thunkApi.getState().wallet;

        if (!vchainClient || !cosmStargateClient) {
            notifyError('You have not connected your wallet yet!');
        } else {
            try {
                const denomStake = chainConnectedInfo?.stakeCurrency?.coinMinimalDenom || '';
                const denomFee = chainConnectedInfo?.feeCurrencies[0]?.coinMinimalDenom || '';
                const prefixCons = chainConnectedInfo.bech32Config.bech32PrefixValAddr;
                const baseMinDivident = baseDivident(chainConnectedInfo.mintDecimal || 6);
                const baseDecimalDivident = baseDivident(chainConnectedInfo.decimal || 6);
                const fee: StdFee = {
                    gas: '180000',
                    amount: [{ amount: '0', denom: denomFee }],
                };

                const cosPubObject = {
                    typeUrl: '/cosmos.crypto.ed25519.PubKey',
                    value: nodePublicKey,
                };

                const addressHex = Cosm.utils.bech32.toHex(address);
                const validatorAddress = Cosm.utils.bech32.toBech32(prefixCons, addressHex);

                const pubPrefix = new Uint8Array([10, 32]);
                console.log(cosPubObject.value);
                const pubKeyBytes = fromBase64(cosPubObject.value);

                const msgCreateValidator: MsgCreateValidator = {
                    description: {
                        moniker: nodeName,
                        identity: 'fadfasdf',
                        website: 'http://abc.xyz/',
                        securityContact: '...',
                        details: '...',
                    },
                    // decimal : 10^18
                    commission: {
                        rate: BN(dataEnter.commissionRate).times(baseMinDivident).toFixed(),
                        maxRate: BN(dataEnter.commissionMaxRate).times(baseMinDivident).toFixed(),
                        maxChangeRate: BN(dataEnter.commissionMaxChangeRate).times(baseMinDivident).toFixed(),
                    },
                    minSelfDelegation: BN(dataEnter.minSelf).times(baseDecimalDivident).toFixed(),
                    delegatorAddress: address,
                    validatorAddress: validatorAddress,
                    pubkey: {
                        typeUrl: '/cosmos.crypto.ed25519.PubKey',
                        value: concatTypedArrays(pubPrefix, pubKeyBytes),
                    },
                    value: coin(BN(dataEnter.amountToken).times(baseDecimalDivident).toFixed(), denomStake),
                };

                const resCreateVali = await vchainClient.cosmos.staking.message.CreateValidator(msgCreateValidator);
                console.log(resCreateVali);
                const tx = await vchainClient.cosmos.staking.sendMessage(fee);
                console.log(tx);

                if (tx.code != 0) {
                    notifyError(tx.rawLog || '');
                } else {
                    const resApi = await callApiNodes.createValidator(nodeId, { validatorAddress: validatorAddress, walletAddress: address });
                    console.log(resApi.data);
                    notifySuccess('Transaction successful!');
                }
            } catch (err) {
                console.log(err);
                notifyError('Transaction error!');
            }
        }
    }),
    signUserLogin: createAsyncThunk<void, ISignUserLoginInput, BaseThunkApiProps>('wallet/sign-user-login', async (input, thunkApi) => {
        const { notifier } = input;
        const { notifyWarn, notifySuccess, notifyError } = notifier;
        if (!window.keplr) {
            notifyWarn('You must install Keplr to continue!');
        } else {
            const { address, chainConnectedInfo: chain } = thunkApi.getState().wallet;
            if (!address) {
                notifyError('You have not connected your wallet yet!');
            } else {
                try {
                    const chainId = chain?.chainId || '';
                    const authInfo = Buffer.from(JSON.stringify({ exp: '120' }));
                    console.log(Buffer.from(JSON.stringify({ exp: '120' })));

                    const sign = await window.keplr.signDirect(chainId, address, {
                        chainId: chainId,
                        authInfoBytes: Uint8Array.from([1, 2, 34, 5, 45, 63, 45, 23]),
                        bodyBytes: Uint8Array.from([1, 2, 3, 34, 454, 53, 5]),
                        accountNumber: Long.fromString('1'),
                    });
                    console.log(sign);

                    // const sign = await window.keplr.signArbitrary(chainId, address, authInfo);
                    // console.log(sign);
                    // const decode = await window.keplr.verifyArbitrary(chainId, address, authInfo, sign);
                    // console.log(decode);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }),
    testGetData: createAsyncThunk<void, any, BaseThunkApiProps>('wallet/testgetdata', async (useNotifier, thunkApi) => {
        try {
            const { notifySuccess } = useNotifier;
            notifySuccess('alooooo');
        } catch (err) {
            console.log(err);
        }
    }),
};
