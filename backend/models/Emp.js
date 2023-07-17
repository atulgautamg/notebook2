
const mongoose = require('mongoose');
  const { Schema } = mongoose;


const EmpSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        default:Date.now
        
    }

    
  });
  const User=mongoose.model('user',EmpSchema);
  User.createIndexes();
  module.exports=User;
