import { IconButton, IconButtonProps } from '@mui/material';
import { MoonIcon, SunIcon } from 'src/assets/icons';
import { useThemeContext } from 'src/contexts/theme-context';

export default function ToggleThemeButton(props: IconButtonProps) {
    const { mode, toggleThemeMode } = useThemeContext();

    return (
        <IconButton {...props} onClick={() => toggleThemeMode()} sx={{ mr: 1 }}>
            {mode === 'dark' ? <SunIcon fontSize="large" /> : <MoonIcon fontSize="large" />}
        </IconButton>
    );
}
