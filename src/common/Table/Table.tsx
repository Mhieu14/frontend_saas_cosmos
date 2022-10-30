import { Box, styled } from '@mui/material';
import { layoutConfig } from 'src/contexts/layout-context/layout-context';

export const Table = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: layoutConfig.borderRadius,
    overflow: 'auto',
    background: theme.palette.background.paper,

    [theme.breakpoints.down('xsm')]: {
        padding: theme.spacing(1.5),
    },
})) as typeof Box;
