import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNetworkSlice } from 'src/redux-toolkit/slice/networkSlice/networkSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';

export default function AutoFetchData() {
    const dispatch = useAppDispatch();
    const { getList } = useNetworkSlice().action;

    useEffect(() => {
        dispatch(getList());
    }, []);

    return <></>;
}
