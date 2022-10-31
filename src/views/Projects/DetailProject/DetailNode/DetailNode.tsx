import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Chip, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';
import CreateValidator from './CreateValidator/CreateValidator';
import Delegate from './Delegate/Delegate';

export default function DetailNode() {
    const { projectId, nodeId } = useParams();
    console.log({ projectId, nodeId });
    return (
        <Box>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                    <Typography color="text.secondary">Projects</Typography>
                </Link>
                <Link to={`/projects/${projectId}`} style={{ textDecoration: 'none' }}>
                    <Typography color="text.secondary">{projectId}</Typography>
                </Link>
                <Typography color="text.primary">{nodeId}</Typography>
            </Breadcrumbs>
            <BoxWrapper sx={{ mt: 2, bgcolor: 'background.paper' }}>
                <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                    Detail node
                </Typography>
                <Box sx={{ display: 'flex', placeItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="h3" sx={{ mr: 1 }}>
                        Node name
                    </Typography>
                    <Chip label="Running" color="success" size="small"></Chip>

                    <Typography variant="body1" sx={{ marginLeft: 'auto' }}>
                        <Box component={'span'} sx={{ color: 'text.secondary', mr: 1 }}>
                            Created at:
                        </Box>
                        <b>{'20/10/2022'}</b>
                    </Typography>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Network
                                </Typography>
                                <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                    Oraichain mainnet
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3} sx={{ borderLeft: { xs: 'none', xsm: '1px solid' }, borderColor: { xsm: 'background.divider' } }}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Mode
                                </Typography>
                                <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                    Full
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3} sx={{ borderLeft: '1px solid', borderColor: 'background.divider' }}>
                            <Box>
                                <Typography variant="body1" color={'text.secondary'}>
                                    Hosting
                                </Typography>
                                <Typography variant="h5" color={'text.primary'} sx={{ mt: 1 }}>
                                    Digital Ocean
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </BoxWrapper>
            <CreateValidator />
            <Delegate />
        </Box>
    );
}
