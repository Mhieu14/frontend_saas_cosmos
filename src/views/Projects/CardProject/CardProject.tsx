import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { BoxWrapper } from 'src/common/BoxWrapper';

export type CardProjectProps = {
    name: string;
    desc: string;
    nodeNumber: number | string;
    id: string;
};

export default function CardProject(props: { data: CardProjectProps; index: number }) {
    const { data, index } = props;
    return (
        <BoxWrapper
            sx={(theme) => ({
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'background.paper',
                transition: '0.3s',
                boxShadow: theme.shadows[3],
                ':hover': { boxShadow: theme.shadows[2], '& .indexProject': { top: 16, opacity: 0.2 } },
            })}
        >
            <Box
                className="indexProject"
                sx={{ transition: 'top 0.5s, opacity 0.5s', position: 'absolute', fontSize: '50px', fontWeight: '500', right: 20, top: -25, color: 'text.secondary', opacity: '0' }}
            >
                {index + 1}
            </Box>
            <Box>
                <Link to={`/projects/${data.id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h5" color="text.primary">
                        {data.name}
                    </Typography>
                </Link>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {data.desc}
                </Typography>
                <Typography variant="body3" color="primary.main" sx={{ fontWeight: '500', mt: 1 }}>
                    Node {data.nodeNumber}
                </Typography>
            </Box>
        </BoxWrapper>
    );
}
