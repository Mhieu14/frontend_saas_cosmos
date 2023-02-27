import { callApiProjects } from './callApi';
import { IDetailProjectData, IOverviewNode, IOverviewProjectData, IResponseGetListProjects } from './type';

export const projectService = {
    getListProjects: async (page: number = 1, itemPerPage: number = 12): Promise<IResponseGetListProjects> => {
        const response = await callApiProjects.getListProjects(page, itemPerPage);
        console.log('getListProject', response.data);
        return {
            total: response.data.data.meta.total,
            projects: response.data.data.projects.map((item: any) => {
                return {
                    name: item.name,
                    createdAt: item.created_at,
                    description: item.description,
                    projectId: item.project_id,
                    status: item.status,
                    userId: item.user_id,
                    numberNode: item.total_nodes,
                } as IOverviewProjectData;
            }),
        };
    },
    getProject: async (projectId: string): Promise<IDetailProjectData> => {
        const response = await callApiProjects.getProject(projectId);
        console.log('getProjectDetail', response.data);
        const item = response.data.data.project;
        return {
            name: item.name,
            createdAt: item.created_at,
            description: item.description,
            projectId: item.project_id,
            status: item.status,
            userId: item.user_id,
            numberNode: item.total_nodes,
            nodes: item.nodes.map((item: any) => {
                return {
                    idNode: item.node_id,
                    name: item.moniker,
                    createdAt: item.created_at,
                    host: item.cloud_provider.name,
                    mode: item.validator ? 'Validator' : 'Full node',
                    network: item.network,
                    status: item.status,
                } as IOverviewNode;
            }),
        };
    },
    deleteProject: async (projectId: string): Promise<any> => {
        const response = await callApiProjects.deleteProject(projectId);
        console.log('deleteProject', response.data);
        return;
    }
};
