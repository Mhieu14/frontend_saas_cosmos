import { callApiProjects } from './callApi';
import { IOverviewProjectData, IResponseGetListProjects } from './type';

export const projectService = {
    getListProjects: async (page: number = 1, itemPerPage: number = 12): Promise<IResponseGetListProjects> => {
        const resposne = await callApiProjects.getListProjects(page, itemPerPage);
        console.log(resposne.data);
        return {
            total: resposne.data.data.meta.total,
            projects: resposne.data.data.projects.map((item: any) => {
                return {
                    name: item.name,
                    createdAt: item.created_at,
                    description: item.description,
                    projectId: item.project_id,
                    status: item.status,
                    userId: item.user_id,
                } as IOverviewProjectData;
            }),
        };
    },
};
