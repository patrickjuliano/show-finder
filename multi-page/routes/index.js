const userApiRoutes = require('./userApi');

const constructorMethod = (app) => {
  app.use('/', userApiRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;