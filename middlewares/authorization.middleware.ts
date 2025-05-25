import { Request,Response,NextFunction } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const checkRole = (authorizedRoles:EmployeeRole[]) => {
return (req:Request,res:Response,next:NextFunction)=>{
    const role =req.user?.role
    console.log(req.user)
    console.log(role)
    if(!authorizedRoles.includes(role)){
        throw new HttpException(403,"user has no privilegesto access the resource")
    }
    next()
}

}
