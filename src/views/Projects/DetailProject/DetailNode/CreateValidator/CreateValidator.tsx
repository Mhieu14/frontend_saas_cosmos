import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BoxWrapper } from 'src/common/BoxWrapper';
import useNotifier from 'src/hooks/useNotifier';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';

type IKeyDataPost = 'amountToken' | 'commissionRate' | 'commissionMaxRate' | 'commissionMaxChangeRate' | 'minSelf';

export type IEnterDataCreateValidator = {
    [key in IKeyDataPost]: string | number;
};

const initData: IEnterDataCreateValidator = {
    amountToken: 0,
    commissionMaxChangeRate: 0,
    commissionMaxRate: 0,
    commissionRate: 0,
    minSelf: 0,
};

type Props = {
    nodeId: string;
    nodeName: string;
    nodePublicKey: string;
    updateData: () => Promise<boolean>;
};

export default function CreateValidator({ nodeId, nodeName, nodePublicKey, updateData }: Props) {
    const dispatch = useAppDispatch();
    const {
        action: { createValidator },
    } = useWalletSlice();
    const notifier = useNotifier();
    const [dataPost, setDataPost] = useState<IEnterDataCreateValidator>(initData);

    function changeValuePost(key: IKeyDataPost, value: string) {
        const numberValue = Number(value);
        if (numberValue >= 0) {
            const afterComma = value.split('.')[1];
            if (!afterComma || afterComma.length < 7) {
                setDataPost((prev) => {
                    return {
                        ...prev,
                        [key]: value,
                    };
                });
            }
        } else {
            if (isNaN(numberValue)) {
                if (value == '.') {
                    setDataPost((prev) => {
                        return {
                            ...prev,
                            [key]: '0.',
                        };
                    });
                }
            } else {
                setDataPost((prev) => {
                    return {
                        ...prev,
                        [key]: '0',
                    };
                });
            }
        }
    }

    async function postData() {
        console.log(dataPost);
        await dispatch(createValidator({ notifier: notifier, nodeId: nodeId, dataEnter: dataPost, nodeName: nodeName, nodePublicKey: nodePublicKey }));
        updateData();
    }

    return (
        <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3 }}>
            <Alert severity="info" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: '500' }}>You need to stake to this node become a validator</Typography>
            </Alert>
            <Typography variant="h5" sx={{ my: 2 }}>
                Create Validator
            </Typography>
            <Box>
                <TextField
                    label="Amount token"
                    value={dataPost.amountToken}
                    onChange={(e) => changeValuePost('amountToken', e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '450px', mx: 'auto' }}
                ></TextField>
                <TextField
                    label="Commission rate"
                    value={dataPost.commissionRate}
                    onChange={(e) => changeValuePost('commissionRate', e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}
                ></TextField>
                <TextField
                    label="Commission max rate"
                    value={dataPost.commissionMaxRate}
                    onChange={(e) => changeValuePost('commissionMaxRate', e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}
                ></TextField>
                <TextField
                    label="Commission max change rate"
                    value={dataPost.commissionMaxChangeRate}
                    onChange={(e) => changeValuePost('commissionMaxChangeRate', e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}
                ></TextField>
                <TextField
                    label="Min self delegation"
                    value={dataPost.minSelf}
                    onChange={(e) => changeValuePost('minSelf', e.target.value)}
                    fullWidth
                    sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}
                ></TextField>
                <Button variant="contained" sx={{ display: 'block', mx: 'auto', mt: 2 }} onClick={postData}>
                    Create validator
                </Button>
            </Box>
        </BoxWrapper>
    );
}
