const express = require('express');
const path = require('path');

module.exports = (app) => {
  const appPath = path.join(__dirname, '..', 'build');
  app.use(express.static(appPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
};
