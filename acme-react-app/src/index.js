import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Items from './routes/Items';
import Category from './routes/Category';
import SingleItem from './routes/SingleItem';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App route={<Home />} />} />
      <Route path='/items' element={<App route={<Items />} />} />
      <Route path='/item/:itemId' element={<App route={<SingleItem />} />} />
      <Route path='/anvil' element={<App route={<Category category="anvil" sectionName="Anvils" />} />} />
      <Route path='/encabulator' element={<App route={<Category category="encabulator" sectionName="Encabulators" />} />} />
      <Route path='/leisure' element={<App route={<Category category="leisure" sectionName="Leisure" />} />} />
      <Route path='/medicine' element={<App route={<Category category="medicine" sectionName="Miracle Remedies" />} />} />
    </Routes>
  </BrowserRouter>
);
