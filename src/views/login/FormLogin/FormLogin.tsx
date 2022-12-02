import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import { imagePath } from 'src/constants/ImagePath';

interface State {
    acount: string;
    password: string;
    showPassword: boolean;
}

export default function FormLogin() {
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
    return (
        <Box
            sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(50px)',
                width: '50%',
                minWidth: '270px',
                minHeight: '550px',
                borderRadius: '20px',
                textAlign: 'center',
                p: 2,
                boxShadow: '0px 45px 100px #44759d45',
            }}
        >
            <Typography color="#061544" sx={{ fontWeight: '500', mb: 1 }}>
                Welcome to
            </Typography>
            <img src={imagePath.LOGO_LONG_BLUE} alt="logo vchain" width={170} />
            <Typography variant="h5" sx={{ color: '#091846', fontWeight: '600', mt: 2, mb: 1 }}>
                Sign up
            </Typography>
            <Typography color="text.secondary">to start working!</Typography>

            <Box sx={{ mt: 5, maxWidth: '270px', mx: 'auto', '& .MuiFormLabel-root': { color: '#061544!important' } }}>
                <TextField variant="standard" label="Acount" fullWidth name="acount" value={values.acount} onChange={handleChange('acount')} />
                <FormControl sx={{ mt: 5 }} variant="standard" fullWidth>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button sx={{ mt: 4 }} variant="contained">
                    Login
                </Button>
            </Box>
        </Box>
    );
}
