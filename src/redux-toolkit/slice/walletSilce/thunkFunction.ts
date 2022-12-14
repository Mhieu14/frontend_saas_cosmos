import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkFcConnectWalletInput, ThunkFcConnectWalletOutput, ThunkFcSendDelegateInput, ThunkFcSignUserLoginInput } from './type';
import VchainCosm from '@tovchain/cosms';
import { BaseProvider } from '@tovchain/cosms/build/main/lib/providers';
import { Wallet } from '@tovchain/cosms/build/main/lib/wallet';
import { BaseThunkApiProps } from 'src/redux-toolkit/stores';
import { coin, GasPrice, SigningStargateClient, StdFee } from '@cosmjs/stargate';
import Long from 'long';

export const thunkFuntion = {
    connectWallet: createAsyncThunk<ThunkFcConnectWalletOutput, ThunkFcConnectWalletInput, BaseThunkApiProps>('wallet/connect-wallet', async (input, thunkApi) => {
        const {
            notifier: { notifyWarn, notifyError, notifySuccess },
            chainConfig,
        } = input;

        if (!window.keplr) {
            notifyWarn('You must install Keplr to continue!');
            return {
                address: '',
                vchainClient: null,
                chainConnectedInfo: null,
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
                        chainConnectedInfo: null,
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
                    chainConnectedInfo: chainConfig,
                    cosmStargateClient: _cosmStargateClient,
                };
            } catch (err) {
                console.log(err);
                return {
                    address: '',
                    vchainClient: null,
                    chainConnectedInfo: null,
                    cosmStargateClient: null,
                };
            }
        }
    }),
    sendDelegate: createAsyncThunk<void, ThunkFcSendDelegateInput, BaseThunkApiProps>('wallet/send-delegate', async (input, thunkApi) => {
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
    signUserLogin: createAsyncThunk<void, ThunkFcSignUserLoginInput, BaseThunkApiProps>('wallet/sign-user-login', async (input, thunkApi) => {
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
