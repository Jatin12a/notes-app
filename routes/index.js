const express = require('express')
const router = express.Router();
const passport = require('passport');
const localstatery = require('passport-local');
const userModel = require('../model/databse')
passport.use(new localstatery(userModel.authenticate()))






router.get('/', (req, res) => {
    const locals = {
        title:'homepage'
    }
    res.render('index',{
        locals,
        layout :'../views/layout/front-page'
    })
})

router.get('/about', (req, res) => {
    console.log('hello');
    res.render('about')
})
router.get('/add', (req, res) => {
    console.log('hii');
    res.render('add')
})  


//authentication====================
router.get('/login', (req, res) => {
    const locals = {
        title:'login'
    }
    res.render('login',{
        locals, 
        layout :'../views/layout/authenticate',
        error:req.flash('error')
    })
})


router.post('/login', passport.authenticate("local",{
    successRedirect : "/dashboard",
    failureRedirect:"/login",
    failureFlash:true
  }),
  (req,res)=>{
  
  })

router.get('/signup', (req, res) => {
    const locals = {
        title:'signup'
    }
    res.render('signup',{
        locals,
        layout :'../views/layout/authenticate'
    })
})

router.post("/signup",(req,res)=>{
    const { username, fullname, email } = req.body;
    const userData = new userModel({ username, fullname, email });
  
    userModel.register(userData,req.body.password)
    .then(function(){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/dashboard');
      })
    })
  })



router.get('/logout' , (req,res)=>{
    req.logOut((err)=>{
      if(err) {return next(err);}
      res.redirect('/');
    })
  })
  
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect("/login")
  }
  




module.exports = router;