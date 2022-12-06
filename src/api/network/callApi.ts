import axios from 'axios';
import { url } from './url';

export const callApiNetworks = {
    getList: () => {
        return axios.get(url.getListNetwork);
    },
};
