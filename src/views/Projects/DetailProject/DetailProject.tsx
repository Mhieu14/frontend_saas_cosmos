import { Add, NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'src/common/Table/Table';
import { TableHeader } from 'src/common/Table/TableHeader';
import { useModalContext } from 'src/contexts/modal-context';
import ModalAddNode from './ModalAddNode/ModalAddNode';
import NodeRow from './NodeRow/NodeRow';
import { useEffect, useState } from 'react';
import { projectService } from 'src/api/project/projectService';
import { IDetailProjectData } from 'src/api/project/type';
import { imagePath } from 'src/constants/ImagePath';
import useNotifier from 'src/hooks/useNotifier';

const initData: IDetailProjectData = {
    createdAt: '',
    description: '---',
    name: '---',
    nodes: [],
    projectId: '',
    status: 'UNKNOW',
    userId: '',
    numberNode: 0,
};

export default function DetailProject() {
    const { projectId } = useParams();
    const { openModal } = useModalContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IDetailProjectData>(initData);
    const { notifyError } = useNotifier();

    async function getProject() {
        try {
            const response = await projectService.getProject(projectId || '');
            setData(response);
        } catch (err) {
            console.log(err);
            notifyError((err as Error).message || '');
        }
    }

    useEffect(() => {
        (async () => {
            await getProject();
            setLoading(false);
        })();
        return () => {};
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                    <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                        <Typography color="text.secondary">Projects</Typography>
                    </Link>
                    {loading ? <Skeleton variant="text" animation="wave" width={150} height={19} /> : <Typography color="text.primary">{data.name}</Typography>}
                </Breadcrumbs>
                <Typography sx={{ marginLeft: 'auto' }}>
                    Created at: <b>{new Date(data.createdAt).toLocaleDateString()}</b>
                </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                {loading ? <Skeleton variant="text" animation="wave" width={150} height={24} /> : <Typography variant="h3">{data.name}</Typography>}
                <Button
                    variant="contained"
                    color="success"
                    sx={{ color: 'white', marginLeft: 'auto' }}
                    onClick={() => openModal('Add Node', <ModalAddNode updateData={getProject} projectId={projectId || ''} />)}
                >
                    <Add /> Add Node
                </Button>
            </Box>
            <Typography color={'text.secondary'} sx={{ mt: 1 }}>
                {data.description}
            </Typography>
            <Table sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Nodes
                </Typography>
                <TableHeader sx={{ minWidth: '1000px' }}>
                    <Grid item xs={3}>
                        Node name
                    </Grid>
                    <Grid item xs={2}>
                        Network
                    </Grid>
                    <Grid item xs={1.5}>
                        Status
                    </Grid>
                    <Grid item xs={1.5}>
                        Mode
                    </Grid>
                    <Grid item xs={2}>
                        Hosting
                    </Grid>
                    <Grid item xs={2}>
                        Date created
                    </Grid>
                </TableHeader>
                <Divider sx={{ bgcolor: 'divider', opacity: '0.7', mt: 1, minWidth: '1000px' }} />

                {loading ? (
                    <>
                        <Skeleton variant="rounded" width={'100%'} height={51} animation="wave" />
                        <Skeleton variant="rounded" width={'100%'} height={51} sx={{ mt: 2 }} animation="wave" />
                        <Skeleton variant="rounded" width={'100%'} height={51} sx={{ mt: 2 }} animation="wave" />
                    </>
                ) : (
                    <>
                        {data.nodes.length === 0 ? (
                            <>
                                <img src={imagePath.NO_DATA_IMAGE} alt="no node in project" height={250} style={{ display: 'flex', margin: '0 auto' }} />
                            </>
                        ) : (
                            <>
                                {data.nodes.map((item, index) => {
                                    return <NodeRow key={'nodeofproject' + index + item.name} projectId={projectId || 'unknow'} data={item} />;
                                })}
                            </>
                        )}
                    </>
                )}
            </Table>
        </Box>
    );
}
