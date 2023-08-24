import { NextFunction, Request, Response } from "express";
import { TransactionsService } from "../services/transaction.service";

export class TransactionsController {
    private transactionsServices: TransactionsService;
    constructor() {
        this.transactionsServices = new TransactionsService();
    }
    async createTransaction(req: Request, res: Response, next: NextFunction){
        try{
            const newTransaction = await this.transactionsServices.createTransaction(req.body)
            res.status(201).json(newTransaction)
        }catch(err){
            console.log(err)
            next(err)
        }
    }
}