import { callApiUser } from './callApi';
import { IDataLogin } from './type';

export const userService = {
    login: async (dataPost: IDataLogin): Promise<{ token: string }> => {
        const response = await callApiUser.login(dataPost);
        console.log(response);
        return {
            token: response.data.data.token,
        };
    },
};
