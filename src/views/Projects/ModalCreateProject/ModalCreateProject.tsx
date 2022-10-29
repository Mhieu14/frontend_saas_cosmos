import { Button, DialogContent, TextField } from '@mui/material';
import { BoxWrapper } from 'src/common/BoxWrapper';

type Props = {};

export default function ModalCreateProject({}: Props) {
    return (
        <DialogContent>
            <TextField fullWidth label="Project name"></TextField>
            <br />
            <br />
            <TextField fullWidth label="Description"></TextField>
            <br />
            <br />
            <Button variant="contained" sx={{ margin: 'auto', display: 'block' }}>
                Create New
            </Button>
        </DialogContent>
    );
}
