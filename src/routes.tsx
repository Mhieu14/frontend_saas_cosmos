import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from './views/login/Login';
import Endpoint from './views/Endpoint/Endpoint';
import DetailProject from './views/Projects/DetailProject/DetailProject';
import Projects from './views/Projects/Projects';
import DetailNode from './views/Projects/DetailProject/DetailNode/DetailNode';

// const Projects = React.lazy(() => import('./views/Projects/Projects'));
// const Endpoint = React.lazy(() => import('./views/Endpoint/Endpoint'));
// const DetailProject = React.lazy(() => import('./views/Projects/DetailProject/DetailProject'));

const Layout = React.lazy(() => import('./layout/Layout'));

export default function RouterUrl() {
    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/projects', element: <Projects /> },
                { path: '/projects/:projectId', element: <DetailProject /> },
                { path: '/projects/:projectId/:nodeId', element: <DetailNode /> },
                { path: '/endpoints', element: <Endpoint /> },
                { path: '/', element: <Navigate to={'/projects'} /> },
            ],
        },
        { path: '/login', element: <Login /> },
    ]);
}
