import { Spoke } from '@mui/icons-material';
import { Box, Button, ButtonProps } from '@mui/material';
import { spinInfinity } from 'src/assets/animations/loading_spin';

export default function LoadingButton(props: ButtonProps) {
    return (
        <Button {...props}>
            {props.disabled ? (
                <Box component={'span'} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Spoke sx={{ animation: spinInfinity, transformOrigin: 'center', mr: 1 }} /> Loading...
                </Box>
            ) : (
                props.children
            )}
        </Button>
    );
}
