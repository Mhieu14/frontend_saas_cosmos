import { callApiNetworks } from './callApi';
import { INetworkData, IResponseGetListNetworks } from './type';

export const networkService = {
    getList: async (): Promise<IResponseGetListNetworks> => {
        const response = await callApiNetworks.getList();
        // console.log('getListNetworks', response.data);
        return response.data.data.networks.map((item: any) => {
            return {
                name: item.name,
                network: item.network,
            } as INetworkData;
        });
    },
};
