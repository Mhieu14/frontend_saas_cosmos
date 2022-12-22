import axios from 'axios';
import { IDataLogin } from './type';
import { url } from './url';

export const callApiUser = {
    login: (dataPost: IDataLogin) => {
        return axios.post(url.login, dataPost);
    },
};
