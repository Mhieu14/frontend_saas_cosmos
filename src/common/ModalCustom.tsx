import { Clear } from '@mui/icons-material';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import { useModalContext } from 'src/contexts/modal-context';

export default function ModalCustom() {
    const { open, closeModal, content, title, maxWidth } = useModalContext();
    function closeDialog() {
        closeModal();
    }

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            fullWidth
            maxWidth={maxWidth}
            sx={(theme) => ({
                [theme.breakpoints.down('xsm')]: { '& .MuiPaper-root': { maxWidth: '100%!important', margin: '0!important', width: 'calc(100% - 16px)' } },
            })}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', py: 1.3, alignItems: 'center', px: { xs: 2, xsm: 3 } }}>
                <Typography variant="h5" color={'text.primary'}>
                    {title}
                </Typography>
                <Clear onClick={closeDialog} sx={{ color: 'text.secondary', fontSize: '30px', cursor: 'pointer' }} />
            </DialogTitle>
            {content}
        </Dialog>
    );
}
