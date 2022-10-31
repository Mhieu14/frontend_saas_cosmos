import { Autocomplete, Button, DialogContent, TextField } from '@mui/material';

export default function ModalAddNode() {
    const networks = ['Oraichain mainnet', 'aaaaa', 'fsdf', 'sdff'];
    const clouds = [
        { label: 'fdsfsdf', key: 'fsdf' },
        { label: 'wetwer', key: 'fsdf' },
        { label: 'hsgerdf', key: 'fsdf' },
        { label: 'hgggdg', key: 'fsdf' },
    ];
    return (
        <DialogContent sx={{ minHeight: '500px' }}>
            <TextField fullWidth label="Node name"></TextField>
            <br />
            <br />
            <Autocomplete fullWidth disablePortal id="combo-box-network" options={networks} renderInput={(params) => <TextField {...params} fullWidth label="Network" />} />
            <br />
            <br />
            <Autocomplete fullWidth disablePortal id="combo-box-clouds" options={clouds} renderInput={(params) => <TextField {...params} fullWidth label="Cloud provider" />} />
            <br />
            <br />
            <Button variant="contained" sx={{ margin: 'auto', display: 'block' }}>
                Add Node
            </Button>
        </DialogContent>
    );
}
