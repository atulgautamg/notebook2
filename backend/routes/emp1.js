const express=require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const emp=require('../models/Emp.js');
const fetchuser=require('../middleware/fetchuser.js')
const router=express.Router();
router.post('/createuser',[body('name','enter valid name').isLength({ min: 5 }),body('password').isLength({ min: 5 }),body('email').isEmail(),],
async (req,res)=>{
   let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    let user=await emp.findOne({email:req.body.email});
    if(user){
        return res.status(400).json("sorry this  name already exists");
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    let emp1= await emp.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
        date: req.body.date
        
      });
      const data={
        emp1:{
            id:emp1.id
        }
      }
const token = jwt.sign(data,'hh');
success=true;
console.log(token);
      res.json({token,success,emp1});
})
router.post('/login',[body('password').isLength({ min: 5 }),body('email').isEmail(),],
async (req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    const {password,email}=req.body;
    try {
        let user=await emp.findOne({email});
        if(!user)
        {
            res.status(400).json({error:"enter valid credentails"});
        }
        const comparepassword= await bcrypt.compare(password,user.password);
        if(!comparepassword)
        {  success=false;
            res.status(400).json({error:"user does not exists"});
        }
        
      const data={
        user:{
            id:user.id
        }
      }
const token = jwt.sign(data,'hh');
success=true;
res.json({success,token});
    } catch (error) {
        console.error(error.message);
        res.status(400).send("error is occurred");
    }
  
});

router.post('/getuser',fetchuser,
async (req,res)=>{
try {
 const userid=req.user.id;
const user= await emp.findById(userid).select("-password")  
res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}});

module.exports=router; 