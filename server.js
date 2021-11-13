const express = require('express');
const axios = require('axios');
const path = require('path')
const { application } = require('express');
const routes = require('./routes')

const app = express()
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static(path.join(__dirname, '/public')));
app.use(routes)

app.listen(5500, ()=> {
  console.log('Server running')
})