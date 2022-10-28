import { ReactNode } from 'react';
import { IntegrationInstructions, Share } from '@mui/icons-material';

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
        url: '/#',
        title: 'Networks',
        icon: <Share />,
    },
];
