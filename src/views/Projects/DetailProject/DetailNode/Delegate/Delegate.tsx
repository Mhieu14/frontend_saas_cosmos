import { Alert, AlertTitle, Box, Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { IDataNodeDetail } from 'src/api/nodes/type';
import { BoxWrapper } from 'src/common/BoxWrapper';
import ValidatorInfo from './ValidatorInfo';
type Props = {
    data: IDataNodeDetail;
};

export default function Delegate({ data }: Props) {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <ValidatorInfo data={data} />
                </Grid>
            </Grid>
        </Box>
    );
}
