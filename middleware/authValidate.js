const asyncHandler  = require('express-async-handler');
const jwt = require('jsonwebtoken');


const authValidate = asyncHandler(async(req , res ,next)=>{
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
  
    if(authHeader && authHeader.startsWith('Bearer')){

        token = authHeader.split(' ')[1];

        if(!token){
             res.status(400);
                throw new Error('Unauthorized User or missing token');
        }
        
         
        await jwt.verify(token,process.env.AccessToken,(err,decoder)=>{

            if(err){
                res.status(401);
                throw new Error('Unauthorized User');
            }

            req.user = decoder.user;
              console.log(req.user);           
            next();
        });

    }else{
           res.status(400);
                throw new Error('Unauthorized User or missing token');
    }
   

});

module.exports = authValidate;