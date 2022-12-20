import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from 'src/api/user/userService';
import { imagePath } from 'src/constants/ImagePath';
import useNotifier from 'src/hooks/useNotifier';

interface State {
    acount: string;
    password: string;
    showPassword: boolean;
}

export default function FormLogin() {
    const { notifyError, notifySuccess } = useNotifier();
    const navigate = useNavigate();
    const [values, setValues] = React.useState<State>({
        acount: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    async function login() {
        try {
            const response = await userService.login({ password: values.password, username: values.acount });
            localStorage.setItem('token', response.token);
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
            notifySuccess('Login successful!');
        } catch (err: any) {
            console.log(err);
            notifyError(err.response?.data?.error?.message || (err as Error).message);
        }
    }

    return (
        <Box
            sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(70px)',
                width: '50%',
                minWidth: '280px',
                minHeight: '550px',
                borderRadius: '20px',
                textAlign: 'center',
                p: 2,
                boxShadow: '0px 45px 100px #44759d45',
            }}
        >
            <Typography color="#061544" sx={{ fontWeight: '500', mb: 1, mt: 1 }}>
                Welcome to
            </Typography>
            <img src={imagePath.LOGO_BLUE_VERTICLE} alt="logo vchain" width={130} />
            <Typography variant="h5" sx={{ color: '#091846', fontWeight: '600', mt: 2, mb: 1 }}>
                Sign up
            </Typography>
            <Typography color="secondary">to start working!</Typography>

            <Box sx={{ mt: 5, maxWidth: '280px', mx: 'auto', '& .MuiFormLabel-root': { color: '#061544!important' } }}>
                <TextField variant="standard" label="Acount" fullWidth name="account" value={values.acount} onChange={handleChange('acount')} />
                <FormControl sx={{ mt: 4 }} variant="standard" fullWidth>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" sx={{ mb: 1 }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button sx={{ mt: 4 }} variant="contained" onClick={login}>
                    Login
                </Button>

                <Typography sx={{ mt: 5 }}>Don't have account? Sign up here!</Typography>
            </Box>
        </Box>
    );
}
