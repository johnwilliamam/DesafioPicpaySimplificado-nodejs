import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user.service";

export class UsersController {
    private usersServices: UserServices;
    constructor(){
        this.usersServices = new UserServices();
    }
    async findAll(req: Request, res: Response, next: NextFunction){
        try{
            const users = await this.usersServices.getAllUsers();
            res.status(200).json(users);
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    async createUsers(req: Request, res: Response, next: NextFunction){
        console.log('AQUI', req.body)
        try {
            const newUser = await this.usersServices.createUser(req.body)
            return res.status(201).json(newUser)
        } catch(err){
            console.log(err)
            next(err)
        }
    }
}