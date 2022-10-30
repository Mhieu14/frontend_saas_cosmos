import { Grid, GridProps, styled } from '@mui/material';

const spacingDefault = 2;

const MyGrid: typeof Grid = (props: GridProps) => {
    return (
        <Grid spacing={spacingDefault} {...props} container>
            {props.children}
        </Grid>
    );
};
export const TableHeader = styled(MyGrid)(({ theme, spacing = spacingDefault }) => ({
    fontWeight: '500',
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(-Number(spacing) / 2),
    marginRight: theme.spacing(-Number(spacing) / 2),
})) as typeof Grid;
