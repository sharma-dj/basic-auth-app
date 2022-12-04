import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav id='menu'>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App