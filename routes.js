const express = require('express')
const routes = express.Router();
const path = require('path');
const authentication = require('./routes/authentication')

routes.get('/', (req, res)=> {
  res.render('pages/index.ejs')
})

routes.get('/login', authentication.login);
routes.get('/user/signin/callback', authentication.callback);
routes.get('/testes', authentication.test)

module.exports = routes