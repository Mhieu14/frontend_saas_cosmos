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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
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
            <Typography variant="h4" color={'text.primary'} sx={{ mb: 0 }}>
                Validator information
            </Typography>

            <LineData title="Chain ID:" value={data.chainInfo?.chainId || '---'} />

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

            <LineData
                title="Voting power:"
                value={`${formatNumber(data.validator?.votingPercentage || 0, { fractionDigits: 6 })}% 
                                (${formatNumber(data.validator?.votingPower, { fractionDigits: 2 })} 
                                ${data.validator?.denom || 'token'})`}
            />

            <LineData title="Self bonded:" value={`${formatNumber(data.validator?.selfBond)} ${data.validator?.denom || 'token'}`} />

            <LineData title="Jailed:" value={`$${formatNumber(data.validator?.jailed)}`} />

            <LineData title="Commission rate:" value={`${data.validator?.commission?.rate || '---'}%`} />

            <LineData title="Commission max rate:" value={`${data.validator?.commission?.maxRate || '---'}%`} />

            <LineData title="Commission max change rate:" value={`${data.validator?.commission?.maxChangeRate || '---'}%`} />
        </BoxWrapper>
    );
}
