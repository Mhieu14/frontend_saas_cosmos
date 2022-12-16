import axios from 'axios';
import { url } from './url';

export const callApiClouds = {
    getList: () => {
        return axios.get(url.getListClouds);
    },
};
