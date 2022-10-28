import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Projects from './views/Projects/Projects';

export default function RouterUrl() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/projects', element: <Projects /> },
                { path: '/', element: <Navigate to={'/projects'} /> },
            ],
        },
    ]);
}
