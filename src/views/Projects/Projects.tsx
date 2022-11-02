import { ChainInfo } from '@keplr-wallet/types';
import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useModalContext } from 'src/contexts/modal-context';
import useNotifier from 'src/hooks/useNotifier';
import { useUserSlice } from 'src/redux-toolkit/slice/userSlice/userSlice';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { useAppDispatch } from 'src/redux-toolkit/stores';
import CardProject, { CardProjectProps } from './CardProject/CardProject';
import ModalCreateProject from './ModalCreateProject/ModalCreateProject';

export default function Projects() {
    const { openModal } = useModalContext();
    const { action } = useWalletSlice();
    const notify = useNotifier();
    const dispatch = useAppDispatch();
    const fakeData: CardProjectProps[] = [
        {
            id: 'project1',
            name: 'Project 1',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 1,
        },
        {
            id: 'project2',
            name: 'Project 2',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 3,
        },
        {
            id: 'project3',
            name: 'Project 3',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 4,
        },
        {
            id: 'project4',
            name: 'Project 4',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 2,
        },
        {
            id: 'project5',
            name: 'Project 5',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 3,
        },
        {
            id: 'project6',
            name: 'Project 6',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 1,
        },
        {
            id: 'project7',
            name: 'Project 7',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 1,
        },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Projects</Typography>
                <Button variant="contained" color="success" sx={{ color: 'white' }} onClick={() => openModal('Create new project', <ModalCreateProject />)}>
                    <Add /> Create Project
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    {fakeData.map((project, index) => {
                        return (
                            <Grid key={'project' + project.name + index} item xs={12} xsm={6} md={4} lg={3}>
                                <CardProject data={project} index={index} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <button
                onClick={() =>
                    dispatch(
                        action.sendDelegate({
                            amount: 1000000,
                            notifier: notify,
                            validatorAddress: 'oraivaloper18hr8jggl3xnrutfujy2jwpeu0l76azprkxn29v',
                        })
                    )
                }
            >
                click
            </button>
        </Box>
    );
}
