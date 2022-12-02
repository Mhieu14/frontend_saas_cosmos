import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from './views/login/Login';
// import Layout from './layout/Layout';
import DetailNode from './views/Projects/DetailProject/DetailNode/DetailNode';
import DetailProject from './views/Projects/DetailProject/DetailProject';
import Projects from './views/Projects/Projects';
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
                { path: '/', element: <Navigate to={'/projects'} /> },
            ],
        },
        { path: '/login', element: <Login /> },
    ]);
}
