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
