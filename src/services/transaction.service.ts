import axios from "axios";
import { CreateTransactionDTO } from "../dtos/transaction.dto";
import { Transactions } from "../entities/transaction.entity";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UserType } from "../types/User.type";
import { NotificationService } from "./notification.service";
import { UserServices } from "./user.service";
export class TransactionsService {
    private usersServices: UserServices;
    private notificationServices: NotificationService
    constructor() {
        this.usersServices = new UserServices();
        this.notificationServices = new NotificationService();
    }
    async createTransaction(transaction: CreateTransactionDTO): Promise<Transactions> {
        const receiver = await this.usersServices.findUserById(transaction.receiverId);
        const sender = await this.usersServices.findUserById(transaction.senderId);
        if (receiver && sender) {
            const authorizeTransaction = await this.authorizeTransaction(transaction.senderId, transaction.value)
            if(authorizeTransaction){
                if(sender.balance - transaction.value < 0) throw new Error('Saldo insuficiente')
                if(sender.type == UserType.Lojista) throw new Error('Ação não permitida para Lojistas!')
                sender.balance = sender.balance - transaction.value;
                receiver.balance = receiver.balance + transaction.value;
                await this.usersServices.saveUser(sender)
                await this.usersServices.saveUser(receiver)
                const newTransaction = await TransactionRepository.createTransaction({
                    sender: sender,
                    value: transaction.value,
                    receiver: receiver,
                });
                this.notificationServices.sendNotification(sender, 'Transação realizada com sucesso')
                this.notificationServices.sendNotification(receiver, 'Nova transação recebida')
                return newTransaction
            } else {
                throw new Error('Transação não autorizada')
            }
        } else throw new Error('Erro ao criar transação')
    }
    async authorizeTransaction(senderId: number, amount: number){
        const url = 'https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6'
        const response = await axios(url, {
            method: 'GET',
        })
        if(response.status === 200){
            console.log(response.data.message)
            return 'Autorizado' == response.data.message
        } else {
            return false
        }
    }
}