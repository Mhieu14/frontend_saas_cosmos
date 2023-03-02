import { IChainConfig } from 'src/redux-toolkit/slice/walletSilce/type';

// TODO: write type golbal for current app
export type NodeStatusType = 'CREATE_PENDING' | 'CREATE_FAIL' | 'CREATED' | 'DELETE_PENDING' | 'DELETE_FAIL' | 'DELETED' | 'CREATE_RETRYING' | 'UNKNOW' | 'SYNCING';
export interface IDataCreateNode {
    nodeName: string;
    network: string;
    projectId: string;
}

export interface IDataCreateValidator {
    validatorAddress: string;
    walletAddress: string;
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
    mode: 'Validator' | 'Full Node';
    canCreateValidator: boolean;
    chainInfo: IChainConfig;
    chainStakeInfo: {
        apr: string | number;
        name: string;
        price: number;
        tokenBonded: number;
        totalToken: number;
    };
    monitoring: {
        cpuCount: number;
        cpuPercentage: number;
        ramPercentage: number;
        ramTotal: string;
        ramUsed: string;
    };
    endpoint: {
        lcd: string;
        rpc: string;
    };
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
    syncInfo: {
        catchingUp: boolean;
        lastestHeight: string;
        lastestTime: string;
        earliestHeight: string;
        earliestTime: string;
    };
    validator: {
        validatorAddress: string;
        totalDelegated: string | number;
        apr: string | number;
        denom: string;
        commission: {
            maxChangeRate: number;
            maxRate: number;
            rate: number;
        };
        price: number;
        uptime: number;
        selfBond: number;
        totalBondedToken: number;
        totalNotBondedTokens: number;
        votingPercentage: number;
        votingPower: number;
        jailed: boolean
    } | null;
    operatorAddress: string | null;
}
