import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Items from './routes/Items';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App route={<Home />} />} />
      <Route path='/items' element={<App route={<Items />} />} />
    </Routes>
  </BrowserRouter>
);
