import './App.css';
import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import Color from './Color'
import ColorList from './ColorList'

function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>
        <Route path='/' element={<Navigate to='/colors' />} />
        <Route path='/colors' element={<ColorList />} />
        <Route path='/colors/:colorName' element={<Color />} />

        <Route path='*' element={<Navigate to='/colors' />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;