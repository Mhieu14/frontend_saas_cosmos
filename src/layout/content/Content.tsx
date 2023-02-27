import { Box, styled } from '@mui/material';
import { layoutConfig, useLayoutContext } from 'src/contexts/layout-context/layout-context';
import Header from './header/Header';
import MainContent from './main-content/MainContent';

const HeaderAndContentBox = styled(Box)(({ theme }) => ({
    transition: `margin ${layoutConfig.transition}`,
})) as typeof Box;

export default function Content() {
    const { sidebarWidth, breakPointLayout } = useLayoutContext();

    return (
        // <HeaderAndContentBox sx={{ marginLeft: breakPointLayout ? '0px' : sidebarWidth }}>
        <HeaderAndContentBox>
            <Header />
            <MainContent />
        </HeaderAndContentBox>
    );
}
