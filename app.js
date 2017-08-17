const express = require('express');
const mustacheExpress = require('mustache-express');
const parseurl = require('parseurl');
const session = require('express-session');
const bodyParser = require('body-parser')

const app = express();

let logins = [{
  username: 'georgemessina',
  password: 'angryeyes'
}, {
  username: 'kennyloggins',
  password: 'dangerzone'
}];

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {

  if (req.url === '/login') {
    next();
  } else if (!req.session.login) {
    res.render('login');
  } else {
    next();
  }

})

app.get('/', function(req, res) {
  res.render('home')
})

app.post('/login', function(req, res) {
  let name = req.body.username;
  let pword = req.body.password;
  console.log(name);
  console.log(pword);
  for (var i = 0; i < logins.length; i++) {
    if (name === logins[i].username && pword === logins[i].password) {
      req.session.login = true;
    }
  }
  if(req.session.login === true){
    res.render('home');
  }
  else{
    res.render('login', {errormessage:"Not a member of Loggins and Messina"});
  }


})
app.listen(3000, function() {
  console.log('Catcha raaaaaaiiiiiiiiide')
})
