import { AppDataSource } from "../config/datasource";
import { ITransaction } from "../dtos/transaction.dto";
import { Transactions } from "../entities/transaction.entity";

export const TransactionRepository = AppDataSource.getRepository(Transactions).extend({
    async createTransaction(transaction: ITransaction): Promise<Transactions> {
        try{
            console.log(transaction)
            const newTransaction = await this.create(transaction)
            const save = await this.save(newTransaction);
            console.log(save)
            return newTransaction
        } catch (err) {
            throw new Error('Erro ao efetuar transação')
        }
    },
})