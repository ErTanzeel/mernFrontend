import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard'
import Home from '../Home/home'


export default function Mainpage() {

    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='/' element={<Home />} />

                    <Route path='/Dashboard/:id' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>

    )
}
