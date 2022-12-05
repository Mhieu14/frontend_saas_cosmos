import { Box } from '@mui/material';
import { BoxWrapper } from 'src/common/BoxWrapper';
import { layoutConfig } from 'src/contexts/layout-context/layout-context';
import ConnectWalletBtn from './ConnectWalletBtn/ConnectWalletBtn';
import ToggleSidebarBtn from './ToggleSidebarBtn/ToggleSidebarBtn';
import ToggleThemeButton from './ToggleThemeButton/ToggleThemButton';

export default function Header() {
    return (
        <BoxWrapper sx={{ py: { xs: 0 } }}>
            <Box sx={{ height: layoutConfig.header.height, display: 'flex', alignItems: 'center' }}>
                <ToggleSidebarBtn />
                <ToggleThemeButton />
                <ConnectWalletBtn />
            </Box>
            <Box sx={{ height: '1px', bgcolor: 'divider', margin: '0px' }}></Box>
        </BoxWrapper>
    );
}
