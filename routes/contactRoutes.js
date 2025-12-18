const express = require('express');
const routes = express.Router();
const { getContact,updateContact ,createContact,deleteContact} = require('../controllers/contactController');
const authValidate = require('../middleware/authValidate');
routes.use(authValidate);
routes.get('/',getContact);
routes.post('/createContact',createContact);
routes.post('/updateContact/:id',updateContact);
routes.post('/deleteContact/:id',deleteContact);

 
module.exports = routes;