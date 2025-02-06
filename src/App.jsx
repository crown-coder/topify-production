import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import { ModalProvider } from './components/ModalContext'

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/admin/*' element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ModalProvider>
  )
}

export default App
