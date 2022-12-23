import { Box, Grid } from '@mui/material';
import { IDataNodeDetail } from 'src/api/nodes/type';
import ValidatorInfo from './ValidatorInfo';
type Props = {
    data: IDataNodeDetail;
};

export default function Delegate({ data }: Props) {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ValidatorInfo data={data} />
                </Grid>
            </Grid>
        </Box>
    );
}
