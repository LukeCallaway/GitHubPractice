import './App.css';
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import VendingMachine from './VendingMachine'
import Water from './Water'
import Tea from './Tea'
import Soda from './Soda'

function App() {
  return (
  <>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<VendingMachine />} />
        <Route path='/water' element={<Water />} />
        <Route path='/tea' element={<Tea />} />
        <Route path='/soda' element={<Soda />} />
      </ Routes>
    </ BrowserRouter >
  </>
  );
}

export default App;
