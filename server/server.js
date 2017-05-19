import path from 'path';
import fs from 'fs';
import express from 'express';
import routes from '../src/routes';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import App from '../src/StaticApp';
import ErrorPage from '../src/components/ErrorPage';

const app = express();
const htmlFilePath = path.join(__dirname, '../build', 'index.html');
const staticFiles = [
  '/manifest.json',
  '/service-worker.js'
];

staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, '../build', req.url);
    res.sendFile(filePath);
  });
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('*', (req, res) => {
  const match = routes.reduce((acc, route) =>
    matchPath(req.url, route, { exact: route.exact }) || acc, null);

  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    let stringToRender = !match || err
      ? (<ErrorPage
          code={ err ? 500 : 404 } 
          errorText={ err ? 'Something went wrong' : '404 Page Not Found' } />)
      : <App />;

    const context = {};
    const markup = <Router context={context} location={req.url}>{stringToRender}</Router>;
    const RenderedApp = htmlData.replace('<div style="display:none">{{SSR}}</div>',
        renderToString(markup));

    if (!context.url) {
      res.status(200).send(RenderedApp);
    } else {
      res.redirect(302, context.url);
    }
  });
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
