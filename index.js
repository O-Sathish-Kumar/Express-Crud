const express = require('express');
const dotenv = require('dotenv').config();
const contact_route = require('./routes/contactRoutes');
const user_route = require('./routes/userRoute');
const errorMiddleware = require('./middleware/errorHandler')
const connecDB = require('./config/dbConnection');
connecDB();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;

app.use('/api/contacts',contact_route);
app.use('/api/user',user_route);
app.use(errorMiddleware);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});