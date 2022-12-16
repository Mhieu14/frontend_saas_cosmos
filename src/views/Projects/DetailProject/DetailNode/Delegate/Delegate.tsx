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
                <Grid item xs={12} sm={6}>
                    <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3 }}>
                        <Alert severity="success" color="info">
                            <AlertTitle>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>Your delegated value:</Typography>
                                    <Box>
                                        <Typography sx={{ fontWeight: 500 }}>12 ORAI</Typography>
                                        <Typography>~$1000</Typography>
                                    </Box>
                                </Box>
                            </AlertTitle>
                        </Alert>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="input-stake-more">Stake more token</InputLabel>
                                        <OutlinedInput
                                            id="input-stake-more"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button variant="outlined">Max</Button>
                                                </InputAdornment>
                                            }
                                            label="Stake more token"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Daily earning
                                        </Typography>
                                        <Box>
                                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                                0 ORAI
                                            </Typography>
                                            <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Monthly earning
                                        </Typography>
                                        <Box>
                                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                                0 ORAI
                                            </Typography>
                                            <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Yearly earning
                                        </Typography>
                                        <Box>
                                            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                                0 ORAI
                                            </Typography>
                                            <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" fullWidth>
                                        Delegate
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </BoxWrapper>
                </Grid>
            </Grid>
        </Box>
    );
}
