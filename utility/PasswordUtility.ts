import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { vandorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { authPayload } from '../dto/Auth.dto';
import { Request } from 'express';

export const GenerateSalt = async ()=>{
    return await bcrypt.genSalt()
}


export const GenratePassword = async (password:string, salt:string)=>{

    return await bcrypt.hash(password, salt)
}


export const validatePassword = async (enteredPassword:string, savedPassword:string, salt:string)=>{

    return await GenratePassword(enteredPassword, salt) === savedPassword;

}


export const generateSignature = (payload:vandorPayload)=>{
    return jwt.sign(payload, APP_SECRET,{expiresIn:'1d'})
}


export const validateSignature = async (req:Request)=>{

    try{

        const signature = req.get('Authorization')

        if(signature){
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as authPayload;
            req.user = payload;
            return true;    
    
        }

    }

    catch{
        return false;
    }
      

}
