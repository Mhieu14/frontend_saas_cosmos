export interface IDataCreateNode {
    nodeName: string;
    network: string;
    projectId: string;
}

export interface IDataNodeDetail {
    nodeId: string;
    nodeName: string;
    network: string;
    status: string;
    message: string | null;
    address: string;
    createdAt: string;
    publicKey: string;
    canCreateValidator: boolean;
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
}
