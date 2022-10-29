import { Box, styled } from '@mui/material';
import { layoutConfig } from 'src/contexts/layout-context/layout-context';

export const BoxWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: layoutConfig.borderRadius,
    [theme.breakpoints.down('xsm')]: {
        padding: theme.spacing(1.5),
    },
})) as typeof Box;
