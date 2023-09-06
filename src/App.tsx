import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Main} from './pages/main/main';
import {Login} from './pages/login';
import { Navbar } from './components/navbar';
import { WriteMessage} from './pages/write-message/write-message';



function App() {
  
  return (
    <div className="App"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Main/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path ='/write-message' element= {<WriteMessage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
