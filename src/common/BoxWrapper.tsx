import { Box, styled } from '@mui/material';

export const BoxWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('xsm')]: {
        padding: theme.spacing(1.5),
    },
})) as typeof Box;
