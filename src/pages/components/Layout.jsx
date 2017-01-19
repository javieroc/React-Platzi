import React, { PropTypes } from 'react';

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css" />
        <link rel="stylesheet" href={`${props.domain}/styles.css`} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.content }} />
        <script src={`${props.domain}/app.js`} />
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};

export default Layout;
