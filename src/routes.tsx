import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import DetailProject from './views/Projects/DetailProject/DetailProject';
import Projects from './views/Projects/Projects';

export default function RouterUrl() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/projects', element: <Projects /> },
                { path: '/projects/:projectId', element: <DetailProject /> },
                { path: '/', element: <Navigate to={'/projects'} /> },
            ],
        },
    ]);
}
