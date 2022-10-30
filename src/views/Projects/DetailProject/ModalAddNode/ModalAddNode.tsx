import { Button, DialogContent, TextField } from '@mui/material';

export default function ModalAddNode() {
    return (
        <DialogContent>
            <TextField fullWidth label="Node name"></TextField>
            <br />
            <br />
            <Button variant="contained" sx={{ margin: 'auto', display: 'block' }}>
                Add Node
            </Button>
        </DialogContent>
    );
}
