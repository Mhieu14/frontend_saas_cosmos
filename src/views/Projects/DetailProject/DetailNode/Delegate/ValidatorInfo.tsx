import { Box, Grid, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { IDataNodeDetail } from 'src/api/nodes/type';
import { BoxWrapper } from 'src/common/BoxWrapper';
import CopyTextBtn from 'src/common/CopyTextBtn';
import { formatAddress, formatNumber } from 'src/utils/format';

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
                    <LineData
                        title="Voting power:"
                        value={`${formatNumber(data.validator?.votingPercentage || 0, { fractionDigits: 6 })}% 
                                (${formatNumber(data.validator?.votingPower, { fractionDigits: 2 })} 
                                ${data.validator?.denom || 'token'})`}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Self bonded:" value={`${formatNumber(data.validator?.selfBond)} ${data.validator?.denom || 'token'}`} />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Token price:" value={`$${formatNumber(data.validator?.price)}`} />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Uptime:" value={`${data.validator?.uptime}%`} />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="Commission:" value={`${data.validator?.commission?.rate || '---'}%`} />
                </Grid>
                <Grid item xs={12}>
                    <LineData title="APR:" value={`${formatNumber(data.validator?.apr, { fractionDigits: 2 })}%`} />
                </Grid>
            </Grid>
        </BoxWrapper>
    );
}
