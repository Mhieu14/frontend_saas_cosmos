import { ViewSidebar } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useLayoutContext } from 'src/contexts/layout-context/layout-context';

export default function ToggleSidebarBtn() {
    const { toggleSidebar } = useLayoutContext();
    return (
        <IconButton onClick={() => toggleSidebar()} sx={{ marginRight: 'auto' }}>
            <ViewSidebar />
        </IconButton>
    );
}
