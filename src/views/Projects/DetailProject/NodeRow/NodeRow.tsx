import { Box, Grid } from '@mui/material';
import { TableRow } from 'src/common/Table/TableRow';

type Props = {};

export default function NodeRow({}: Props) {
    return (
        <TableRow sx={{ mt: 2 }}>
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
        </TableRow>
    );
}
