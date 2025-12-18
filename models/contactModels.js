const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    name : {
        type : String,
        required : [true,"Please add Name"],
    },
    email : {
         type : String,
         required : [true,"Please add Email"],
    },
    phone : {
         type : String,
         required : [true,"Please add Phone"],
    },
    user_id : {
         type : String,
         required : [true,"Please add Phone"],
    }
});

module.exports = mongoose.model('Contact',contactSchema);