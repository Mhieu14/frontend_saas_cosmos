import { useState } from 'react';
import { DialogContent, TextField } from '@mui/material';
import { IDataCreateProject } from 'src/api/project/type';
import { useModalContext } from 'src/contexts/modal-context';
import { callApiProjects } from 'src/api/project/callApi';
import useNotifier from 'src/hooks/useNotifier';
import LoadingButton from 'src/common/LoadingButton/LoadingButton';

type Props = {
    updateData: () => void;
};

export default function ModalCreateProject({ updateData }: Props) {
    const [dataPost, setDataPost] = useState<IDataCreateProject>({ name: '', description: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const { closeModal } = useModalContext();
    const { notifyError, notifySuccess } = useNotifier();
    const onchange = (key: 'name' | 'description', value: string) => {
        setDataPost((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const createNewProject = async () => {
        console.log(dataPost);
        setLoading(true);
        try {
            const response = await callApiProjects.createProject(dataPost);
            console.log(response);
            updateData();
            notifySuccess('Create successful!');
            closeModal();
        } catch (err) {
            console.log(err);
            notifyError((err as Error).message);
        }
        setLoading(false);
    };

    return (
        <DialogContent>
            <TextField fullWidth label="Project name" name="project_name" value={dataPost.name} onChange={(e) => onchange('name', e.target.value)}></TextField>
            <br />
            <br />
            <TextField fullWidth label="Description" name="desc" value={dataPost.description} onChange={(e) => onchange('description', e.target.value)}></TextField>
            <br />
            <br />
            <LoadingButton variant="contained" sx={{ margin: 'auto', display: 'block' }} onClick={createNewProject} disabled={loading}>
                Create New
            </LoadingButton>
        </DialogContent>
    );
}
