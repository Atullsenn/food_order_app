import express, {Request, Response, NextFunction} from 'express';
import { CreateVendorInput } from '../dto';
import {vendor} from '../models/Vendor';
import { GenerateSalt, GenratePassword } from '../utility';



 
export const findVandor = async (id: string | undefined, email?:string)=>{
    if(email){
        return await vendor.findOne({email:email})
    }

    else{
        return await vendor.findById(id)
    }
}



export const createVendor = async(req:Request, res:Response, next:NextFunction)=>{

    const {name, ownerName, foodType, pinCode, address, phone, email, password } = <CreateVendorInput>req.body;

    const existingVendor = await findVandor('', email);

    if(existingVendor !== null){
        return res.json({
            "message": "A vendor is exist with this email id"
        })
    }

    // generate salt
    const salt = await GenerateSalt();

    // generate password
    const userPassword = await GenratePassword(password, salt)


    const createVendor = await vendor.create({
        name:name,
        ownerName:ownerName,
        foodType:foodType,
        pinCode:pinCode,
        address:address,
        phone:phone,
        email:email,
        password:userPassword,
        salt:salt,
        rating: 0,
        serviceAvailable:false,
        coverImages:[]


    })


    return res.json({createVendor})
   

}


export const getVendors = async(req:Request, res:Response, next:NextFunction)=>{
    const vandors = await vendor.find();

    if(vandors !== null){
        return res.json(vandors)
    }

    return res.json({
        'message': 'vendor data does not availabel'
    })

}



export const getVendorById = async(req:Request, res:Response, next:NextFunction)=>{

    const vandorId = req.params.id;

    const vandor = await findVandor(vandorId);

    if(vandorId !== null){
        res.json(vandor)
    }
    else{
        return res.json({'message': 'vendor data does not available'});
    }

}