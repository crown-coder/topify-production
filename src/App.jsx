import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './components/ModalContext';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const App = () => {
  return (
    <React.StrictMode>
      <ModalProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/admin/*' element={<AdminDashboard />} />
              <Route path='/dashboard/*' element={<Dashboard />} />
            </Routes>
          </Suspense>
        </Router>
      </ModalProvider>
    </React.StrictMode>
  );
};

export default App;