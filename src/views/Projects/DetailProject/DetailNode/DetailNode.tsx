import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

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
        </Box>
    );
}
