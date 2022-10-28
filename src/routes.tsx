import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';

export default function RouterUrl() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
        },
    ]);
}
