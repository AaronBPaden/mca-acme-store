import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';

// Routes
import Home from './routes/Home';
import Items from './routes/Items';
import Category from './routes/Category';
import SingleItem from './routes/SingleItem';
import Error404 from './routes/Error404';
import About from './routes/About';
import Login from './routes/Login';

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App route={<Home />} />} />
        <Route path='/items' element={<App route={<Items />} />} />
        <Route path='/item/:itemId' element={<App route={<SingleItem />} />} />
        <Route path='/anvil' element={<App route={<Category category="anvil" sectionName="Anvils" />} />} />
        <Route path='/encabulator' element={<App route={<Category category="encabulator" sectionName="Encabulators" />} />} />
        <Route path='/leisure' element={<App route={<Category category="leisure" sectionName="Leisure" />} />} />
        <Route path='/medicine' element={<App route={<Category category="medicine" sectionName="Miracle Remedies" />} />} />
        <Route path='/about' element={<App route={<About />} />} />
        <Route path='/login' element={<App route={<Login />} />} />
        <Route path='*' element={<App route={<Error404 />} />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
