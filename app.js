const express = require('express');
const mustacheExpress = require('mustache-express');
const parseurl = require('parseurl');
const session = require('express-session');
const bodyParser = require('body-parser')

const app = express();

let logins = {username:'kennyloggins', password: 'dangerzone'};

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req,res){
  res.render('login')
})
app.use(function(req, res, next){
  let name = req.body.username;
  let pword = req.body.password;
    if(name === logins.username && pword === logins.password){
      next();
    }
    else{
      res.render('login');
    }
})
app.post('/login', function(req, res){
  console.log(req.body.username);
  console.log(req.body.password);
  res.render('home');
})
app.listen(3000, function(){
  console.log('Catcha raaaaaaiiiiiiiiide')
})
