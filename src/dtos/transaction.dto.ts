import { Users } from "../entities/user.entity";

export interface ITransaction {
    receiver: Users,
    sender: Users,
    value: number,
}

export interface CreateTransactionDTO {
    receiverId: number,
    senderId: number,
    value: number
}