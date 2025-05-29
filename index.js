import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import userRoute from "./rout/user.rout.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/user" , userRoute);

app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server litsen at port ${PORT}`);
    
})