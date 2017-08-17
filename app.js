const express = require('express');
const mustacheExpress = require('mustache-express');
const parseurl = require('parseurl');
const session = require('express-session');

const app = express();

let logins = [{username:'kennyloggins', password: 'dangerzone'}];

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');


// app.use(function(req,res,next){
//
// })

app.get('/login', function(req,res){
  res.render('login')
})
app.listen(3000, function(){
  console.log('Catcha raaaaaaiiiiiiiiide')
})
