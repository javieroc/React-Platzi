import React from 'react';
import { Link } from 'react-router';

function Error404() {
  return (
    <section name="error404">
      <h1>Error404</h1>
      <Link to="/">Go back to Home</Link>
    </section>
  );
}

export default Error404;
