import express from "express";
import { TransactionsController } from "../controllers/transaction.controller";

const transactionsController = new TransactionsController();
export const transactionsRoutes = express.Router();
transactionsRoutes.post('/transaction', transactionsController.createTransaction.bind(transactionsController));