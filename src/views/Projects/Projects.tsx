import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { projectService } from 'src/api/project/projectService';
import { IResponseGetListProjects } from 'src/api/project/type';
import { useModalContext } from 'src/contexts/modal-context';
import CardProject from './CardProject/CardProject';
import ModalCreateProject from './ModalCreateProject/ModalCreateProject';

export default function Projects() {
    const { openModal } = useModalContext();
    const [data, setData] = useState<IResponseGetListProjects>({ projects: [], total: 0 } as IResponseGetListProjects);
    useEffect(() => {
        (async () => {
            try {
                const response = await projectService.getListProjects();
                console.log(response);
                setData(response);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

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
                    {data.projects.map((project, index) => {
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
