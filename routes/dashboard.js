const express = require('express')
const router = express.Router();
const Note = require('../model/notesdb')
const mongoose = require('mongoose')



router.get('/dashboard',async (req, res) => {

let perPage = 12;
let page = req.query.page || 1;

const locals = {
  title: "Dashboard",
  description: "Free NodeJS Notes App.",
};

try {
  // Mongoose "^7.0.0 Update
  const notes = await Note.aggregate([
    { $sort: { updatedAt: -1 } },
    { $match: {} },
    {
      $project: {
        title: { $substr: ["$title", 0, 30] },
        body: { $substr: ["$body", 0, 100] },
      },
    }
    ])
  .skip(perPage * page - perPage)
  .limit(perPage)
  .exec(); 
    let count=12
  res.render('dashboard/index',{
    locals,
    layout :'../views/layout/dashboardmain',
    user:'jatin',
    notes:notes,
    current:page,
    pages:Math.ceil(count / perPage),
    })

  } catch (error) {
    console.log(error);
  }
})

router.get('/dashboard/item/:id',async function(req,res){
  const note = await Note.findById({_id:req.params.id});
  if(note){
    res.render('dashboard/show',{
      note,
      layout: '../views/layout/dashboardmain',
    })
  }
})


router.put('/dashboard/item/:id',async(req,res)=>{
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
})

router.delete('/dashboard/item-delete/:id',async(req,res)=>{
  try {
    await Note.deleteOne({ id: req.params._id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.get('/dashboard/add',(req,res)=>{
  console.log('helloadd');
  res.render('add')
});


router.post('/dashboard/add',async(req,res)=>{
  try {
    
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});







function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect("/login")
  }




module.exports = router;