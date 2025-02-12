import React from 'react';
import { Shield } from 'lucide-react';
import EmailAnalyzer from './components/EmailAnalyzer';
import URLScanner from './components/URLScanner';
import ThreatMap from './components/ThreatMap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard.tsx';


function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      
    </Routes>
    </BrowserRouter>
  )
  
}

export default App;