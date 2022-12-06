import { NodeStatusType } from 'src/global.config';

export interface IOverviewProjectData {
    createdAt: string;
    description: string;
    name: string;
    projectId: string;
    status: NodeStatusType;
    userId: string;
}

export interface IResponseGetListProjects {
    total: number;
    projects: IOverviewProjectData[];
}

export interface IOverviewNode {
    idNode: string;
    name: string;
    network: string;
    status: NodeStatusType;
    host: string;
    mode: string;
    createdAt: string;
}

export interface IDetailProjectData extends IOverviewProjectData {
    nodes: IOverviewNode[];
}

export interface IDataCreateProject {
    name: string;
    description: string;
}
