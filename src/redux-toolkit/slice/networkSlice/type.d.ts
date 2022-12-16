import { IResponseGetListNetworks } from 'src/api/network/type';
import { FetchingStatus } from 'src/constants/FetchingStatus';

export interface INetworkSliceState {
    status: FetchingStatus;
    data: IResponseGetListNetworks;
}
