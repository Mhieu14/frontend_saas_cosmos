import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { BoxWrapper } from 'src/common/BoxWrapper';

export default function CreateValidator() {
    return (
        <BoxWrapper sx={{ bgcolor: 'background.paper', mt: 3 }}>
            <Alert severity="info" sx={{ justifyContent: 'center' }}>
                <Typography sx={{ fontWeight: '500' }}>You need to stake to this node become a validator</Typography>
            </Alert>
            <Typography variant="h5" sx={{ my: 2 }}>
                Create Validator
            </Typography>
            <Box>
                <TextField label="Amount token" fullWidth sx={{ maxWidth: '450px', mx: 'auto' }}></TextField>
                <TextField label="Moniker name" fullWidth sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}></TextField>
                <TextField label="Commission rate" fullWidth sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}></TextField>
                <TextField label="Commission max rate" fullWidth sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}></TextField>
                <TextField label="Commission max change rate" fullWidth sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}></TextField>
                <TextField label="Min self delegation" fullWidth sx={{ maxWidth: '450px', mt: 2, mx: 'auto' }}></TextField>
                <Button variant="contained" sx={{ display: 'block', mx: 'auto', mt: 2 }}>
                    Create validator
                </Button>
            </Box>
        </BoxWrapper>
    );
}
