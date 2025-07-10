import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ModalProvider } from './components/ModalContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Dashboard/small-components/Loader';
import { ToastContainer } from 'react-toastify'

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));


const App = () => {
  return (
    <React.StrictMode>
      <ModalProvider>
        <Router>
          <Suspense fallback={<Loader global="true" />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route
                path='/dashboard/*'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </Suspense>
        </Router>
        <ToastContainer />
      </ModalProvider>
    </React.StrictMode>
  );
};

export default App;
