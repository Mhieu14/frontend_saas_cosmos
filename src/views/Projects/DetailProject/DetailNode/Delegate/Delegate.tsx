import { Alert, AlertTitle, Box, Button, Divider, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { BoxWrapper } from 'src/common/BoxWrapper';
import { Table } from 'src/common/Table/Table';
import { TableHeader } from 'src/common/Table/TableHeader';
import { TableRow } from 'src/common/Table/TableRow';

function LineData({ title, value }: { title: string; value: string }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '400px' }}>
            <Typography variant="body1" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="body1" color="text.primary">
                {value}
            </Typography>
        </Box>
    );
}

export default function Delegate() {
    return (
        <>
            <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Validator:" value="Node 1" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Chain ID:" value="Oraichain mainnet" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Voting Power:" value="5%(1231token)" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Self bonded:" value="1000 token" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Address:" value="sdasdf...dfdff" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Uptime:" value="100%" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="Commission:" value="1%" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                        <LineData title="APR:" value="53.67%" />
                    </Grid>
                </Grid>
            </BoxWrapper>
            <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3 }}>
                <Alert severity="success" color="info">
                    <AlertTitle>Your delegated value:</AlertTitle>
                    <LineData title="12 ORAI" value="~$1000"></LineData>
                </Alert>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                                Delegate
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Table sx={{ bgcolor: 'background.default' }}>
                                <TableHeader spacing={1}>
                                    <Grid item xs={4}>
                                        Daily earning
                                    </Grid>
                                    <Grid item xs={4}>
                                        Monthly earning
                                    </Grid>
                                    <Grid item xs={4}>
                                        Yearly earning
                                    </Grid>
                                </TableHeader>
                                <Divider sx={{ mt: 1, mb: 2 }} />
                                <TableRow spacing={1}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography variant="body1">0 ORAI</Typography>
                                            <Typography variant="body3" color={'text.secondary'}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography variant="body1">0 ORAI</Typography>
                                            <Typography variant="body3" color={'text.secondary'}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography variant="body1">0 ORAI</Typography>
                                            <Typography variant="body3" color={'text.secondary'}>
                                                ~ $0
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </TableRow>
                            </Table>
                        </Grid>
                    </Grid>
                </Box>
            </BoxWrapper>
        </>
    );
}
