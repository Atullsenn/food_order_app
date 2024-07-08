import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {AdminRoute} from './routes/AdminRoute';
import { MONGO_URI } from './config';
import { VendorRoute } from './routes/VendorRoute';



const app = express();


//middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/admin', AdminRoute);
app.use('/vandor', VendorRoute)


mongoose.connect(MONGO_URI).then((result)=>{
    console.log('connected')
}).catch((Err)=>{
    console.log(Err)
})


app.listen(4000, ()=>{
    console.log('Server running on port 4000')
})