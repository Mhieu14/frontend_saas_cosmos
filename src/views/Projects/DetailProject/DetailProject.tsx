import { Add, NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Divider, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';

export default function DetailProject() {
    const { projectId } = useParams();
    return (
        <Box>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                <Link to={'/projects'} style={{ textDecoration: 'none' }}>
                    <Typography color="text.secondary">Projects</Typography>{' '}
                </Link>
                <Typography color="text.primary">{projectId}</Typography>
            </Breadcrumbs>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Prject name</Typography>
                <Button variant="contained" color="success" sx={{ color: 'white' }}>
                    <Add /> Add Node
                </Button>
            </Box>

            <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Nodes
                </Typography>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Node name
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Network
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Status
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Mode
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Hosting
                        </Grid>
                        <Grid item xs={2} sx={{ fontWeight: '500', color: 'text.secondary' }}>
                            Date created
                        </Grid>
                    </Grid>
                    <Divider sx={{ bgcolor: 'background.divider', opacity: '0.7', mt: 1 }} />
                </Box>
            </BoxWrapper>
        </Box>
    );
}
