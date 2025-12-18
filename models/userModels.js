const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name:{
        type:'String',
        required:[true,'Please Add Name Field'],
    },
     email:{
        type:'String',
        required:[true,'Please Add Email Field'],
        unique:[true,'exist same email already'],
    },
     password:{
        type:'String',
        required:[true,'Please Add Password Field'],
    },
      image:{
        type:'String',
        required:[true,'Please Add file Field'],
    },
});

module.exports = mongoose.model('User',userSchema);