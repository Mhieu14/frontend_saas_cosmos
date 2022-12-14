import { ChainInfo } from '@keplr-wallet/types';
import Cosm from '@tovchain/cosms';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { NotifyFunctionInferface } from 'src/hooks/useNotifier';
import { SigningStargateClient } from '@cosmjs/stargate';

export interface IChainConfig extends ChainInfo {
    readonly decimal?: number;
    readonly distributionDecimal?: number;
    readonly mintDecimal?: number;
}
export interface WalletSliceState {
    status: {
        connectWallet: FetchingStatus;
    };
    error: Error | undefined;
    address: string;
    vchainClient: Cosm | null;
    cosmStargateClient: SigningStargateClient | null;
    chainConnectedInfo: IChainConfig | null;
}

// * thunkFuntion.connectWallet  -------------------------------------------------------------
export interface ThunkFcConnectWalletInput {
    notifier: NotifyFunctionInferface;
    chainConfig: IChainConfig;
}
export interface ThunkFcConnectWalletOutput {
    address: string;
    vchainClient: Cosm | null;
    cosmStargateClient: SigningStargateClient | null;
    chainConnectedInfo: IChainConfig | null;
}

// * thunkFuntion.sendDelegate  -------------------------------------------------------------
export interface ThunkFcSendDelegateInput {
    notifier: NotifyFunctionInferface;
    amount: string | number;
    validatorAddress: string;
}

// * thunkFuntion.signUserLogin -------------------------------------------------------------
export interface ThunkFcSignUserLoginInput {
    notifier: NotifyFunctionInferface;
}
