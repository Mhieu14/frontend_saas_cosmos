import { NodeStatusType } from 'src/global.config';
import { IChainConfig } from 'src/redux-toolkit/slice/walletSilce/type';

export interface IDataCreateNode {
    nodeName: string;
    network: string;
    projectId: string;
}

export interface IDataNodeDetail {
    nodeId: string;
    nodeName: string;
    network: string;
    status: NodeStatusType;
    message: string | null;
    address: string;
    syncing: boolean;
    createdAt: string;
    publicKey: string;
    mode: string;
    canCreateValidator: boolean;
    chainInfo: IChainConfig;
    project: {
        projectId: string;
        status: string;
        name: string;
        totalNodes: number;
        createdAt: string;
    };
    cloudProvider: {
        id: string;
        name: string;
    };
    validator: {
        validatorAddress: string;
        totalDelegated: string | number;
        commission: {
            maxChangeRate: string | number;
            maxRate: string | number;
            rate: string | number;
        };
    } | null;
    operatorAddress: string | null;
}
