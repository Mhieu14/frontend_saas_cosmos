import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainContentStyle = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('xsm')]: {
        padding: theme.spacing(1.5),
    },
}));

export default function MainContent() {
    return (
        <MainContentStyle>
            <Outlet />
        </MainContentStyle>
    );
}
