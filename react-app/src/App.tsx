import React from 'react';
import { Shield } from 'lucide-react';
import EmailAnalyzer from './components/EmailAnalyzer';
import URLScanner from './components/URLScanner';
import ThreatMap from './components/ThreatMap';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'


function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App;