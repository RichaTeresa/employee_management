import {Request,Response,NextFunction} from "express"
import HttpException from "../exception/httpException";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constraints";
import { Jwtpayload } from "../dto/jwt-payload";



const getToken=(req:Request):string =>{
    const token=req.headers.authorization;
    if(!token){
        throw new HttpException(401,"Not Authorized")
    }
    const tokenSplits=token.split(' ')
    if(tokenSplits.length !=2){
        throw new HttpException(401,"token invalid")
    }
    return tokenSplits[1]
}




export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const token=getToken(req);
    if(!token){
        throw new HttpException(401,"Not Authorized")
    }
    try{
        const payload=jwt.verify(token,JWT_SECRET) as Jwtpayload
        console.log(payload)
        req.user=payload;
    }
    catch{
        throw new HttpException(401,"invalid or expired token")
    }
    next()
}

