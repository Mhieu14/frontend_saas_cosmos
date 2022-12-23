import { Spoke } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { spinInfinity } from 'src/assets/animations/loading_spin';

interface LoadingBtnProps extends ButtonProps {
    onlyIconLoading?: boolean;
}

export default function LoadingButton(props: LoadingBtnProps) {
    return (
        <Button {...props} startIcon={props.disabled ? <Spoke sx={{ animation: spinInfinity, transformOrigin: 'center' }} /> : props.startIcon}>
            {props.disabled ? props.onlyIconLoading ? <></> : 'Loading...' : props.children}
        </Button>
    );
}
