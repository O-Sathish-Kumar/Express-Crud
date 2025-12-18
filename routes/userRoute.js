const express = require('express');
const { regiterFunction , loginFunction , loginUserFunction } = require('../controllers/authController'); 
const authValidate = require('../middleware/authValidate');
const routes = express.Router();


routes.post('/register',regiterFunction);

routes.post('/login',loginFunction);

routes.get('/userDetails',authValidate,loginUserFunction);


module.exports = routes;