import React from 'react';
import { Match, Miss } from 'react-router';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function pages() {
  return (
    <main role="application">
      <Header />
      {/* Lista de articulos */}
      <Match pattern="/" exactly component={Home} />
      {/* Detalle de articulo */}
      <Match pattern="/post/:id" exactly component={Post} />
      {/* User profile */}
      <Match pattern="/user/:id" exactly component={Profile} />
      {/* Error */}
      <Miss component={Error404} />
    </main>
  );
}

export default pages;
