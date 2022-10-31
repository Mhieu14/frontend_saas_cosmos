import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import LoadingPage from './common/LoadingPage/LoadingPage';

import reportWebVitals from './reportWebVitals';
import RouterUrl from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Suspense fallback={<LoadingPage sx={{ position: 'absolute', top: 0, left: 0 }} />}>
            <RouterUrl />
        </Suspense>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
