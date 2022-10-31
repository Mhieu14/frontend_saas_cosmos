import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableRow } from 'src/common/Table/TableRow';

type Props = {
    projectId: number | string;
};

export default function NodeRow(props: Props) {
    const navigate = useNavigate();
    return (
        <TableRow sx={{ mt: 2 }} onClick={() => navigate(`/projects/${props.projectId}/nodeid_4564561`)}>
            <Grid item xs={2}>
                Node 1
            </Grid>
            <Grid item xs={2}>
                Oraichain mainnet
            </Grid>
            <Grid item xs={2}>
                Running
            </Grid>
            <Grid item xs={2}>
                Full
            </Grid>
            <Grid item xs={2}>
                Digital Ocean
            </Grid>
            <Grid item xs={2}>
                20/10/2022
            </Grid>
        </TableRow>
    );
}
