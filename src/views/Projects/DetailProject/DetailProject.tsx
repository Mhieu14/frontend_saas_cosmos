import { Add, NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Divider, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'src/common/Table/Table';
import { TableHeader } from 'src/common/Table/TableHeader';
import { useModalContext } from 'src/contexts/modal-context';
import ModalAddNode from './ModalAddNode/ModalAddNode';
import NodeRow from './NodeRow/NodeRow';

export default function DetailProject() {
    const { projectId } = useParams();
    const { openModal } = useModalContext();
    return (
        <Box>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                    <Typography color="text.secondary">Projects</Typography>
                </Link>
                <Typography color="text.primary">{projectId}</Typography>
            </Breadcrumbs>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Prject name</Typography>
                <Button variant="contained" color="success" sx={{ color: 'white' }} onClick={() => openModal('Add Node', <ModalAddNode />)}>
                    <Add /> Add Node
                </Button>
            </Box>

            <Table sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Nodes
                </Typography>
                <TableHeader>
                    <Grid item xs={2}>
                        Node name
                    </Grid>
                    <Grid item xs={2}>
                        Network
                    </Grid>
                    <Grid item xs={2}>
                        Status
                    </Grid>
                    <Grid item xs={2}>
                        Mode
                    </Grid>
                    <Grid item xs={2}>
                        Hosting
                    </Grid>
                    <Grid item xs={2}>
                        Date created
                    </Grid>
                </TableHeader>
                <Divider sx={{ bgcolor: 'divider', opacity: '0.7', mt: 1 }} />
                <NodeRow projectId={projectId || 'unknow'} />
            </Table>
        </Box>
    );
}
