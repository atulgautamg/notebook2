
var jwt = require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
const token=req.header('auth-token');
if(!token)
{
    res.status(401).send({error:"please autheticate valid token"})
}
try {
 
const string =jwt.verify(token,'hh');
req.user=string.user;
next();   
} catch (error) {
    res.send(401);
}
}
module.exports=fetchuser;