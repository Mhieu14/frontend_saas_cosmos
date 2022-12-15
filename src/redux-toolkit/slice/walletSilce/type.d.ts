import { ChainInfo } from '@keplr-wallet/types';
import Cosm from '@tovchain/cosms';
import { FetchingStatus } from 'src/constants/FetchingStatus';
import { NotifyFunctionInferface } from 'src/hooks/useNotifier';
import { SigningStargateClient } from '@cosmjs/stargate';
import { IEnterDataCreateValidator } from 'src/views/Projects/DetailProject/DetailNode/CreateValidator/CreateValidator';

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
    chainConnectedInfo: IChainConfig;
}

// * thunkFuntion.connectWallet  -------------------------------------------------------------
export interface IConnectWalletInput {
    notifier: NotifyFunctionInferface;
}
export interface IConnectWalletOutput {
    address: string;
    vchainClient: Cosm | null;
    cosmStargateClient: SigningStargateClient | null;
}

// * thunkFuntion.sendDelegate  -------------------------------------------------------------
export interface ISendDelegateInput {
    notifier: NotifyFunctionInferface;
    amount: string | number;
    validatorAddress: string;
}

// * thunkFuntion.signUserLogin -------------------------------------------------------------
export interface ISignUserLoginInput {
    notifier: NotifyFunctionInferface;
}

export interface ICreateValidatorInput {
    notifier: NotifyFunctionInferface;
    nodeName: string;
    nodeId: string;
    nodePublicKey: string;
    dataEnter: IEnterDataCreateValidator;
}
