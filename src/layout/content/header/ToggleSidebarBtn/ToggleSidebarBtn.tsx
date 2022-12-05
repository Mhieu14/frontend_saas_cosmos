import { Menu } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useLayoutContext } from 'src/contexts/layout-context/layout-context';
import { useThemeContext } from 'src/contexts/theme-context';

export default function ToggleSidebarBtn() {
    const { toggleSidebar } = useLayoutContext();
    const { desktopPoint } = useThemeContext();
    return (
        <>
            {desktopPoint ? (
                <Box sx={{ marginRight: 'auto' }}></Box>
            ) : (
                <IconButton onClick={() => toggleSidebar()} sx={{ marginRight: 'auto' }}>
                    <Menu />
                </IconButton>
            )}
        </>
    );
}
