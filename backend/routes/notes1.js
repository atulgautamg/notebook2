const express=require('express');
const notes=require('../models/notes');
const fetchuser=require('../middleware/fetchuser.js')
const { body, validationResult } = require('express-validator');

const router=express.Router();
router.get('/getnotes',fetchuser,async (req,res)=>{
    try {
     
    const notes1=await notes.find({user:req.user.id})
    res.json(notes1);
   
    } catch (error) {
        console.error(error.message);
         res.status(500).send("internal server error");
    }});
router.post('/addnotes',[body('title','enter valid title').isLength({ min: 5 }),body('description').isLength({ min: 5 })],fetchuser,
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    try{

        const {title,description,date}=req.body;
        let notes1= await notes.create({
            title,description,date,user:req.user.id
          });
          const notessave=await notes1.save();
          res.json(notessave);
    
    }
      catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
   }
  
});

router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try {
    const {title,description}=req.body;
    let newNote={};
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
  let notes1=await notes.findById(req.params.id);
  if(!notes1){
    return res.status(404).send("not found");
  }
  if(notes1.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
  }
  notes1=await notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json(notes1);

    } catch (error) {
        console.error(error.message);
         res.status(500).send("internal server error");
    }});
    
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    try {
    const {title,description}=req.body;
    
  let notes1=await notes.findById(req.params.id);
  if(!notes1){
    return res.status(404).send("not found");
  }
  if(notes1.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
  }
  notes1=await notes.findByIdAndDelete(req.params.id);
  res.json({"success":"note has been deleted", "note":notes1});

    } catch (error) {
        console.error(error.message);
         res.status(500).send("internal server error");
    }});
module.exports=router;