import { Grid, GridProps, styled } from '@mui/material';
import { layoutConfig } from 'src/contexts/layout-context/layout-context';

const spacingDefault = 2;
const MyGrid: typeof Grid = (props: GridProps) => {
    return (
        <Grid spacing={spacingDefault} container {...props}>
            {props.children}
        </Grid>
    );
};

export const TableRow = styled(MyGrid)(({ theme, spacing = spacingDefault }) => ({
    background: theme.palette.mode === 'dark' ? '#0d0d0d52' : '#f9f9fc',
    borderRadius: layoutConfig.borderRadius,
    paddingBottom: theme.spacing(Number(spacing)),
    marginLeft: theme.spacing(-Number(spacing) / 2),
    marginRight: theme.spacing(-Number(spacing) / 2),
    transition: 'background 0.3s',
    cursor: 'pointer',
    '&:hover': {
        background: theme.palette.primary.light,
    },
})) as typeof Grid;
