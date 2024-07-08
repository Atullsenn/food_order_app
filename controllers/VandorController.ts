import {Request, Response, NextFunction} from 'express';
import { editVandorInput, vandorLoginInput } from '../dto';
import { findVandor } from './AdminController';
import { generateSignature, validatePassword } from '../utility';

export const vandorLogin = async(req:Request, res:Response, next:NextFunction)=>{

    const {email,password} = <vandorLoginInput>req.body;

    const existingVendor = await findVandor('', email)

    if(existingVendor !== null){
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt)

        if(validation){
            const signature = generateSignature({
                _id:existingVendor.id,
                email:existingVendor.email,
                name:existingVendor.name,
                foodType:existingVendor.foodType

            })
            return res.json(signature)
        }

        else{
            return res.json({'message': 'password is not valid'})
        }
    }

    return res.json({'message': 'login credenital is not valid'})

}



export const getVandorProfile = async(req:Request, res:Response, next:NextFunction)=>{

    const user = req.user;
    if(user){
        const existingVendor = await findVandor(user._id)
        return res.json(existingVendor)
    }

    return res.json({'message': 'vandor infortmation not found'})
    
}



export const updateVandorProfile = async(req:Request, res:Response, next:NextFunction)=>{

    const {name, address, foodType, phone} = <editVandorInput>req.body;

    const user = req.user;
    if(user){
        const existingVendor = await findVandor(user._id)

        if(existingVendor !== null){
            existingVendor.name = name;
            existingVendor.address= address;
            existingVendor.phone= phone;
            existingVendor.foodType = foodType;

            const saveResult = await existingVendor.save()

            return res.json(saveResult)

        }
        return res.json(existingVendor)
    }

    return res.json({'message': 'vandor infortmation not found'})


}


export const updateVandorService = async(req:Request, res:Response, next:NextFunction)=>{


    const user = req.user;
    if(user){
        const existingVendor = await findVandor(user._id)

        if(existingVendor !== null){
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable
            const saveResult = await existingVendor.save()
            return res.json(saveResult)

        }
        return res.json(existingVendor)
    }

    return res.json({'message': 'vandor infortmation not found'})


}



export const addFoods = async(req:Request, res:Response, next:NextFunction)=>{
    
}


export const getFoods = async(req:Request, res:Response, next:NextFunction)=>{

}