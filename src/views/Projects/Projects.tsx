import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useUserSlice } from 'src/redux-toolkit/slice/userSlice/userSlice';

export default function Projects() {
    const { action, state } = useUserSlice();
    const dispatch = useDispatch();
    return (
        <Box>
            <Typography variant="h4">Projects</Typography>
            <Button onClick={() => dispatch(action.getAddress())}>Click</Button>
            <div>{state.data || '---'}</div>
        </Box>
    );
}
