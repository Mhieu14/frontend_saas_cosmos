import axios from 'axios';
import { IDataCreateNode } from './type';
import { url } from './url';

export const callApiNodes = {
    createProject: (dataPost: IDataCreateNode) => {
        return axios.post(url.createNode, { project_id: dataPost.projectId, network: dataPost.network, moniker: dataPost.nodeName });
    },
    getNode: (nodeId: string) => {
        return axios.get(url.getNode(nodeId));
    },
};
