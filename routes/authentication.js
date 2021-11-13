const axios = require('axios');
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

exports.login = function(req ,res) {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`)
}

exports.callback = function(req, res) {
  const { code } = req.query
  
  const url = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
  let access_token = ''

  axios.post(url)
  .then((res) => {
     const { data } = res
     var myRe = /[A-Za-z0-9]+\_[A-Za-z0-9]+/gmi
     var myArray = data.match(myRe);
     access_token = myArray[1]
  })
  .then(()=> {
     axios.get('https://api.github.com/user', {
        headers: {
           'Authorization': `token ${access_token}`
        }
     })
     .then((result) => {
        let { data } = result
        return res.render('pages/logged.ejs', {data})
     })
     .catch((err) => {
        console.log(err)
     })
  })
}

exports.test = function(req, res) {
  let data = {
    login: 'Lucasarieiv',
    avatar_url: 'https://avatars.githubusercontent.com/u/32067321?v=4',
    name: 'Lucas Vieira',
    email: 'lucasvieira@luttos.com',
    local: 'Pernambuco - Brazil',
    followers: 12,
    following: 42
  }
  return res.render('pages/logged.ejs', {data})
}