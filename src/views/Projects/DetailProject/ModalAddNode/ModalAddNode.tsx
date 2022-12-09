import { Autocomplete, Button, DialogContent, TextField } from '@mui/material';
import { useNetworkSlice } from 'src/redux-toolkit/slice/networkSlice/networkSlice';
import { useState } from 'react';
import { IDataCreateNode } from 'src/api/nodes/type';
import useNotifier from 'src/hooks/useNotifier';
import { callApiNodes } from 'src/api/nodes/callApi';

export default function ModalAddNode({ projectId, updateData }: { projectId: string; updateData: () => Promise<void> }) {
    const { state: networkState } = useNetworkSlice();
    const [dataPost, setDataPost] = useState<IDataCreateNode>({ nodeName: '', network: '', projectId: projectId });
    const { notifyError, notifySuccess } = useNotifier();

    function changeDataPost(key: 'nodeName' | 'network' | 'projectId', value: string) {
        setDataPost((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    }

    const networks = networkState.data.map((item) => {
        return {
            label: item.name + ' - ' + item.network,
            key: item.network,
        };
    });

    const clouds = [
        { label: 'fdsfsdf', key: 'fsdf' },
        { label: 'wetwer', key: 'fsdf' },
        { label: 'hsgerdf', key: 'fsdf' },
        { label: 'hgggdg', key: 'fsdf' },
    ];

    async function addNodeFunc() {
        console.log(dataPost);
        try {
            const response = await callApiNodes.createProject(dataPost);
            console.log(response);
            updateData();
            notifySuccess('Create node successful!');
        } catch (err) {
            console.log(err);
            notifyError((err as Error).message);
        }
    }
    return (
        <DialogContent
            sx={{
                minHeight: '500px',
                '& .MuiAutocomplete-popper': {
                    boxShadow: 3,
                    borderRadius: '10px',
                },
            }}
        >
            <TextField fullWidth label="Node name" value={dataPost.nodeName} onChange={(e) => changeDataPost('nodeName', e.target.value)}></TextField>
            <br />
            <br />
            <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-network"
                options={networks}
                renderInput={(params) => <TextField {...params} fullWidth label="Network" />}
                onChange={(_, value) => {
                    changeDataPost('network', value?.key || '');
                }}
            />
            <br />
            <br />
            <Autocomplete fullWidth disablePortal id="combo-box-clouds" options={clouds} renderInput={(params) => <TextField {...params} fullWidth label="Cloud provider" />} />
            <br />
            <br />
            <Button variant="contained" sx={{ margin: 'auto', display: 'block' }} onClick={addNodeFunc}>
                Add Node
            </Button>
        </DialogContent>
    );
}
