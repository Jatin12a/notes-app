require('dotenv').config();  
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");
const expresslayouts = require('express-ejs-layouts')
var expresssession = require('express-session')
var usersRouter = require('./model/databse');
const passport = require('passport');
const flash = require('connect-flash')


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 



app.use(express.static('public'));
app.set("view engine", "ejs");

app.use(flash());
app.use(expresslayouts)
app.use(methodOverride("_method"));
app.set('layout','./layout/main')

app.use(expresssession({
  resave:false,
  saveUninitialized: false,
  secret:"heyhey"
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());



//

app.use('/',require('./routes/index'))
app.use('/',require('./routes/dashboard'))

app.get('*', (req, res) => {
  res.status(404).send('GO BACK')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});