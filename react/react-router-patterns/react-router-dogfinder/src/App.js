import './App.css';
import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import DogDetails from './DogDetails';
import DogList from './DogList';
import Navbar from './Navbar';
import DogListInfo from './DogListInfo';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar names={['Whiskey', 'Duke', 'Perry']}/>

    <Routes>
        <Route path='/' element={<Navigate to='/dogs' />} />
        <Route path='/dogs' element={<DogList dogs={DogListInfo}/>} />
        <Route path='/dogs/:name' element={<DogDetails dogs={DogListInfo} />} />

        <Route path='*' element={<Navigate to='/dogs' />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;