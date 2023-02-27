import axios from 'axios';
import { IDataCreateProject } from './type';
import { url } from './url';

export const callApiProjects = {
    getListProjects: (page: number = 1, itemPerPage: number = 12) => {
        return axios.get(url.getListProjects(page, itemPerPage));
    },
    createProject: (dataPost: IDataCreateProject) => {
        return axios.post(url.createProject, dataPost);
    },
    getProject: (projectId: string) => {
        return axios.get(url.getProject(projectId));
    },
    deleteProject: (projectId: string) => {
        return axios.delete(url.deleteProject(projectId));
    },
};
