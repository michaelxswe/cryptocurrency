import React from 'react'
import ReactDOM from 'react-dom/client';
import Home from './pages/Home'
import Show from './pages/Show'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './style.scss'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route index element = {<Home/>}/>
      <Route path = '/:id' element = {<Show/>}/>
    </Routes>
  </BrowserRouter>
)