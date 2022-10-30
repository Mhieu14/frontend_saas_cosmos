import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import DetailNode from './views/Projects/DetailProject/DetailNode/DetailNode';
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
                { path: '/projects/:projectId/:nodeId', element: <DetailNode /> },
                { path: '/', element: <Navigate to={'/projects'} /> },
            ],
        },
    ]);
}
