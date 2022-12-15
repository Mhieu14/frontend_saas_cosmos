import { Box, Grid, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { IDataNodeDetail } from 'src/api/nodes/type';
import { BoxWrapper } from 'src/common/BoxWrapper';
import CopyTextBtn from 'src/common/CopyTextBtn';
import { formatAddress } from 'src/utils/format';

type Props = {
    data: IDataNodeDetail;
};

function LineData({ title, value }: { title: string; value: ReactNode }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                {value}
            </Typography>
        </Box>
    );
}

export default function ValidatorInfo({ data }: Props) {
    return (
        <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3, boxShadow: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <LineData title="Chain ID:" value={data.chainInfo.chainId} />
                </Grid>
                <Grid item xs={12}>
                    <LineData
                        title="Validator address:"
                        value={
                            data.validator?.validatorAddress ? (
                                <>
                                    <CopyTextBtn text={data.validator.validatorAddress} />
                                    {formatAddress(data.validator.validatorAddress, 6, 6)}
                                </>
                            ) : (
                                '---'
                            )
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <LineData
                        title="Operator address:"
                        value={
                            data.operatorAddress ? (
                                <>
                                    <CopyTextBtn text={data.operatorAddress} />
                                    {formatAddress(data.operatorAddress, 6, 6)}
                                </>
                            ) : (
                                '---'
                            )
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Voting power:" value="5%(1231token)" />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Self bonded:" value="1000 token" />
                </Grid>

                <Grid item xs={12}>
                    <LineData title="Uptime:" value="100%" />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Commission:" value="1%" />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="APR:" value="53.67%" />
                </Grid>
            </Grid>
        </BoxWrapper>
    );
}
