import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IOverviewNode } from 'src/api/project/type';
import ChipNodeStatus from 'src/common/ChipNodeStatus';
import { TableRow } from 'src/common/Table/TableRow';

type Props = {
    projectId: number | string;
    data: IOverviewNode;
};

export default function NodeRow(props: Props) {
    const navigate = useNavigate();
    return (
        <TableRow sx={{ mt: 2, minWidth: '1000px', placeItems: 'center' }} onClick={() => navigate(`/projects/${props.projectId}/${props.data.idNode}`)}>
            <Grid item xs={2}>
                {props.data.name}
            </Grid>
            <Grid item xs={2}>
                {props.data.network}
            </Grid>
            <Grid item xs={2}>
                <ChipNodeStatus status={props.data.status} />
            </Grid>
            <Grid item xs={2}>
                {props.data.mode}
            </Grid>
            <Grid item xs={2}>
                {props.data.host}
            </Grid>
            <Grid item xs={2}>
                {props.data.createdAt ? new Date(props.data.createdAt).toLocaleDateString() : '---'}
            </Grid>
        </TableRow>
    );
}
