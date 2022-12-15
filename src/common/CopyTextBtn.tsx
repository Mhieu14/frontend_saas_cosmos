import { CopyAll } from '@mui/icons-material';
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material';
import React from 'react';

type Props = {
    text: string;
    sxButton?: SxProps<Theme> | undefined;
    sxIcon?: SxProps<Theme> | undefined;
};

export default function CopyTextBtn({ text, sxButton, sxIcon }: Props) {
    const [titleToolTip, setTitleToolTip] = React.useState<string>(text);

    function onClick() {
        setTitleToolTip('Copied!');
        navigator.clipboard.writeText(text);
        setTimeout(() => {
            setTitleToolTip(text);
        }, 1500);
    }

    return (
        <Tooltip title={titleToolTip} onClick={onClick} placement="right">
            <IconButton sx={{ padding: 0.5, ...sxButton }}>
                <CopyAll sx={{ fontSize: '16px', ...sxIcon }} />
            </IconButton>
        </Tooltip>
    );
}
