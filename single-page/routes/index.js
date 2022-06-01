const apiRoutes = require('./api');

const constructorMethod = (app) => {
  app.use('/', apiRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;