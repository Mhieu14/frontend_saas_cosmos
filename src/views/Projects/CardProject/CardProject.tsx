import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IOverviewProjectData } from 'src/api/project/type';
import { BoxWrapper } from 'src/common/BoxWrapper';
import ChipNodeStatus from 'src/common/ChipNodeStatus';

export type CardProjectProps = {
    name: string;
    desc: string;
    nodeNumber: number | string;
    id: string;
};

export default function CardProject(props: { data: IOverviewProjectData; index: number }) {
    const { data, index } = props;
    return (
        <BoxWrapper
            sx={(theme) => ({
                overflow: 'hidden',
                position: 'relative',
                bgcolor: 'background.paper',
                transition: '0.3s',
                boxShadow: theme.shadows[3],
                height: '100%',
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
                <Link to={`/projects/${data.projectId}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h5" color="text.primary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {data.name}
                    </Typography>
                </Link>
                <ChipNodeStatus status={data.status} sx={{ mt: 1 }} />
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 2, maxWidth: '100%', overflow: 'hidden', display: '-webkit-box', height: '38px', textOverflow: 'ellipsis', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}
                >
                    {data.description}
                </Typography>
            </Box>
        </BoxWrapper>
    );
}
