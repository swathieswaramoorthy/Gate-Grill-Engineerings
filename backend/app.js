const express = require('express');
const app= express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase.js');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({path : path.join(__dirname,'config','config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();
app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}));
app.use('/api/v1/',products);
app.use('/api/v1/',orders);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('DB Connection Error:', err));

app.listen(process.env.PORT,()=>{
    console.log(`Server is ruuning in the port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});
