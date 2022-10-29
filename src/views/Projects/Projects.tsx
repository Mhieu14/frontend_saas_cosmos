import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useModalContext } from 'src/contexts/modal-context';
import CardProject, { CardProjectProps } from './CardProject/CardProject';
import ModalCreateProject from './ModalCreateProject/ModalCreateProject';

export default function Projects() {
    const { openModal } = useModalContext();
    const fakeData: CardProjectProps[] = [
        {
            name: 'Project 1',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 1,
        },
        {
            name: 'Project 2',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 3,
        },
        {
            name: 'Project 3',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 4,
        },
        {
            name: 'Project 4',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 2,
        },
        {
            name: 'Project 5',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 3,
        },
        {
            name: 'Project 6',
            desc: 'Oraichain validator to get reward.',
            nodeNumber: 1,
        },
        {
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
        </Box>
    );
}