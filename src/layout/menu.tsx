import { ReactNode } from 'react';
import { CableOutlined, IntegrationInstructions, Share } from '@mui/icons-material';

type MENU = {
    url: string;
    title: string;
    icon: ReactNode;
};

export const menu: MENU[] = [
    {
        url: '/projects',
        title: 'Projects',
        icon: <IntegrationInstructions />,
    },
    {
        url: '/endpoints',
        title: 'Endpoints',
        icon: <Share />,
    },
    {
        url: '/#',
        title: 'API',
        icon: <CableOutlined />,
    },
];
