import { Chip, SxProps, Theme } from '@mui/material';
import { NodeStatusType } from 'src/api/nodes/type';

type Props = {
    status: NodeStatusType;
    sx?: SxProps<Theme> | undefined;
};
export default function ChipNodeStatus(props: Props) {
    const { status = 'UNKNOW', sx } = props;
    const variant: 'outlined' | 'filled' = 'outlined';
    const size: 'small' | 'medium' = 'small';
    if (status === 'CREATED') {
        return <Chip label="Running" variant={variant} color="success" size={size} sx={sx} />;
    }
    if (status === 'CREATE_FAIL' || status === 'DELETE_FAIL') {
        return <Chip label="Fail" variant={variant} color="error" size={size} sx={sx} />;
    }
    if (status === 'DELETED') {
        return <Chip label="Deleted" variant={variant} color="error" size={size} sx={sx} />;
    }
    if (status === 'UNKNOW') {
        return <Chip label="Unknow" variant={variant} color="secondary" size={size} sx={sx} />;
    }
    if (status === 'SYNCING') {
        return <Chip label="Syncing" variant={variant} color="info" size={size} sx={sx} />;
    }

    return <Chip label="Pending" variant={variant} color="warning" size={size} sx={sx} />;
}
