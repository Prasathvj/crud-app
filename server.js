const express = require('express');
const dotenv =require('dotenv');
const { dbConnection } = require('./db');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const cors = require('cors');
//confic the env
dotenv.config();
const PORT = process.env.PORT

//init the server
const app = express();

//middleware
app.use(express.json())
app.use(cors())

//dbconnection
dbConnection();

//routers
app.use('/product',productRouter);
app.use('/user', userRouter)

//listen the server
app.listen(PORT, ()=>console.log(`server running in localhost:${PORT}`))