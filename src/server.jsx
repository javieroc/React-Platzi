import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { IntlProvider } from 'react-intl';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import messages from './messages.json';

const domain = process.env.NODE_ENV === 'production'
  ? 'https://connan-react-sfs.now.sh'
  : 'http://localhost:3001';

function requestHandler(req, res) {
  res.setHeader('Content-Type', 'text/html');

  const locale = req.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = createServerRenderContext();

  // render the first time
  let markup = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ServerRouter location={req.url} context={context}>
        <Pages />
      </ServerRouter>
    </IntlProvider>,
  );

  const result = context.getResult();

  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (result.redirect) {
    res.writeHead(301, {
      Location: result.redirect.pathname,
    });
    res.end();
  }

  if (result.missed) {
    res.writeHead(404);
    markup = renderToString(
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ServerRouter location={req.url} context={context}>
          <Pages />
        </ServerRouter>
      </IntlProvider>,
    );
  }

  res.write(renderToStaticMarkup(<Layout title="Application" content={markup} domain={domain} />));
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
