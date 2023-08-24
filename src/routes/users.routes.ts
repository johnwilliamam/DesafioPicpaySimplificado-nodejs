import { Router } from "express";
import { UsersController } from './../controllers/users.controller';

const usersController = new UsersController(); 
export const usersRoutes: Router = Router()
usersRoutes.post('/users', usersController.createUsers.bind(usersController));
usersRoutes.get('/users', usersController.findAll.bind(usersController));