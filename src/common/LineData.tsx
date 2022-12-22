import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    title: string;
    value: ReactNode;
    customValue?: boolean;
    sx?: SxProps<Theme> | undefined;
    sxValue?: SxProps<Theme> | undefined;
};

export default function LineData(props: Props) {
    const { title, value, customValue = false, sxValue, sx } = props;
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', ...sx }}>
            <Typography variant="body1" color={'text.secondary'}>
                {title}
            </Typography>
            {customValue ? (
                value
            ) : (
                <Typography variant="body1" color={'text.primary'} sx={{ fontWeight: 500, ml: 'auto', ...sxValue }}>
                    {value}
                </Typography>
            )}
        </Box>
    );
}
