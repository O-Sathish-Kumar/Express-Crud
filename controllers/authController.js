
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const upload = require('../services/imageUpload');

const regiterFunction = asyncHandler(async (req,res)=>{
    

    upload.single("image")(req, res, async (err) => {
        console.log("Multer Error:", err); 
        if (err) {
            res.status(400);
            throw new Error("Image upload failed");
        }
    const {name , email , password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('all field required');
    }
    const getUser = await User.findOne({email});
    console.log(getUser);
    if(getUser){
        res.status(400);
        throw new Error('user already exist');
    }

    const hashPassword = await bcrypt.hash(password,10);
    const userData = await User.create({
        name,
        email,
        password : hashPassword,
        image: req.file ? req.file.filename : null,
    });
    
    res.status(201).json(userData);
    });
});


const loginFunction = asyncHandler(async (req,res)=>{

    const {email , password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('all field required');
    }
    const getUser = await User.findOne({email});
    
    if(getUser && await bcrypt.compare(password,getUser.password)){
        
        const accessToken = jwt.sign({
            user : {
                username : getUser.name,
                email : getUser.email,
                id : getUser.id,
            },
        },process.env.AccessToken,
        { expiresIn : "60m" }
    );
       res.status(200).json({accessToken});
    }else{
         res.status(400);
        throw new Error('user does not exist');
    }

    
});



const loginUserFunction = asyncHandler(async (req,res)=>{
    // console.log(req.user);
    const userDetail = await User.findOne({'_id':req.user.id});
    const userData = {
        name:userDetail.name,
        email:userDetail.email,
        id:userDetail.id,
        imageUrl: __dirname

    };
    console.log(userDetail);
    res.status(200).json({'message':'I am a current login  user','user':userData});
});

module.exports = {
    regiterFunction,
    loginFunction,
    loginUserFunction,
};