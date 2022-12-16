import { callApiClouds } from './callApi';
import { ICloudData, IResponseGetListClouds } from './type';

export const cloudService = {
    getList: async (): Promise<IResponseGetListClouds> => {
        const response = await callApiClouds.getList();
        console.log('getListClouds', response.data);
        return response.data.data.cloud_providers.map((item: any) => {
            return {
                label: item.name,
                key: item.id,
            } as ICloudData;
        });
    },
};
