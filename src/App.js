import React from 'react';
import { render } from 'react-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MenuBuilder from './components/menuBuilder/MenuBuilder';
import MenuContextProvider from './context/MenuContext';

import './app.scss';

render(
  <React.StrictMode>
    <Header />
    <MenuContextProvider>
        <MenuBuilder />
    </MenuContextProvider>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root'),
);
