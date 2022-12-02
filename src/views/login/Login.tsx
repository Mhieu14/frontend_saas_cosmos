import { Box } from '@mui/material';
import { imagePath } from 'src/constants/ImagePath';
import { ThemeCustomProvider } from 'src/contexts/theme-context';
import FormLogin from './FormLogin/FormLogin';

export default function Login() {
    return (
        <ThemeCustomProvider>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <img src={imagePath.LOGO_ICON_4X} style={{ maxWidth: '100%', maxHeight: '99vh' }} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FormLogin />
                </Box>
            </Box>
        </ThemeCustomProvider>
    );
}
