const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModels');
const getContact = asyncHandler(async(req,res)=>{

    const reponseData = await Contact.find({user_id:req.user.id});
    res.status(200).json(reponseData)
});

const createContact = asyncHandler(async(req,res)=>{
 
     const {name,email,phone} = req.body;
    const reponseData = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });

     res.status(201).json(reponseData);
    
});


const updateContact = asyncHandler(async(req,res)=>{

   const {name,email,phone} = req.body;

   const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error('All Field Mandatory');
    }

    const UpdateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new :true}
    );
    

        res.status(201).json(UpdateContact);
});

const deleteContact = asyncHandler(async(req,res)=>{

  
   const contact = await Contact.findByIdAndDelete(req.params.id);
    
    

        res.status(201).json(contact);
});

module.exports = {
    getContact,
    createContact,
    updateContact,
    deleteContact,
}