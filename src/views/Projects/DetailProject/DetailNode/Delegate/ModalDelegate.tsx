import { Alert, AlertTitle, Box, Button, DialogContent, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { DataSaverOnOutlined } from '@mui/icons-material';
import { useWalletSlice } from 'src/redux-toolkit/slice/walletSilce/walletSlice';
import { BN } from 'src/utils';
import { useState } from 'react';
import { formatNumber } from 'src/utils/format';
import LoadingButton from 'src/common/LoadingButton/LoadingButton';
import BigNumber from 'bignumber.js';

type Props = {
    tokenApr: string | number;
    tokenPrice: string | number;
    operatorAddress: string;
};

export default function ModalDelegate({ tokenApr, tokenPrice, operatorAddress }: Props) {
    const { state, nonDispatchFunction } = useWalletSlice();
    const { chainConnectedInfo } = state;
    const [valueInput, setValueInput] = useState<string>('0');

    async function getMaxValueInput() {
        const value = await nonDispatchFunction.getTokenBalance();
        setValueInput(value.toFixed());
    }

    async function delegateToken() {
        await nonDispatchFunction.delegateToken(valueInput, operatorAddress);
    }

    const _yearly = BN(valueInput).times(tokenApr || 0);
    const _daily = _yearly.div(BN(365));
    const _weekly = _daily.times(BN(30));
    const profit = {
        daily: { token: _daily.toString(), usdt: _daily.times(tokenPrice || 0).toString() },
        weekly: { token: _weekly.toString(), usdt: _weekly.times(tokenPrice || 0).toString() },
        yearly: { token: _yearly.toString(), usdt: _yearly.times(tokenPrice || 0).toString() },
    };

    function changeValueInput(newInput: string) {
        if (Number(newInput) >= 0) {
            const afterComma = newInput.split('.')[1];
            if (!afterComma || afterComma.length < 7) {
                setValueInput(newInput);
            }
        } else {
            if (isNaN(Number(newInput))) {
                if (newInput == '.') {
                    setValueInput('0.');
                }
            } else {
                setValueInput('0');
            }
        }
    }
    return (
        <DialogContent>
            <Alert severity="success" color="info" variant="outlined">
                <AlertTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Your delegated value:</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography sx={{ fontWeight: 500 }}>12 {chainConnectedInfo.stakeCurrency.coinDenom}</Typography>
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
                                onChange={(e) => changeValueInput(e.target.value)}
                                value={valueInput}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <ButtonMaxValInput _onclick={getMaxValueInput} />
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
                                    {formatNumber(profit.daily.token, { fractionDigits: 2 })} {chainConnectedInfo?.stakeCurrency?.coinDenom || 'token'}
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                    ~ ${formatNumber(profit.daily.usdt, { fractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body1" color="text.secondary">
                                Monthly earning
                            </Typography>
                            <Box>
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                    {formatNumber(profit.weekly.token, { fractionDigits: 2 })} {chainConnectedInfo?.stakeCurrency?.coinDenom || 'token'}
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                    ~ ${formatNumber(profit.weekly.usdt, { fractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body1" color="text.secondary">
                                Yearly earning
                            </Typography>
                            <Box>
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                    {formatNumber(profit.yearly.token, { fractionDigits: 2 })} {chainConnectedInfo?.stakeCurrency?.coinDenom || 'token'}
                                </Typography>
                                <Typography variant="body1" color="text.primary" sx={{ textAlign: 'right' }}>
                                    ~ ${formatNumber(profit.yearly.usdt, { fractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonDelegate delegateF={delegateToken} />
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
    );
}

function BoxDelegatedValue() {}

function ButtonDelegate({ delegateF }: { delegateF: () => Promise<void> }) {
    const [loading, setLoading] = useState<boolean>(false);

    async function onclick() {
        setLoading(true);
        await delegateF();
        setLoading(false);
    }

    return (
        <LoadingButton variant="contained" fullWidth startIcon={<DataSaverOnOutlined />} onClick={onclick} disabled={loading}>
            Delegate
        </LoadingButton>
    );
}

function ButtonMaxValInput({ _onclick }: { _onclick: () => Promise<void> }) {
    const [loading, setLoading] = useState<boolean>(false);

    async function onclick() {
        setLoading(true);
        await _onclick();
        setLoading(false);
    }

    return (
        <LoadingButton variant="outlined" onClick={onclick} disabled={loading} onlyIconLoading={true}>
            Max
        </LoadingButton>
    );
}
