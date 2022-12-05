import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import { useThemeContext } from 'src/contexts/theme-context';

export default function ToggleThemeButton(props: IconButtonProps) {
    const { mode, toggleThemeMode } = useThemeContext();

    return (
        <IconButton {...props} onClick={() => toggleThemeMode()} sx={{ mr: 1 }}>
            {mode === 'dark' ? <LightModeOutlined fontSize="large" /> : <DarkModeOutlined fontSize="large" />}
        </IconButton>
    );
}
