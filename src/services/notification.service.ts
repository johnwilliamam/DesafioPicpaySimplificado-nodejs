import axios from "axios";
import { Users } from "../entities/user.entity";

export class NotificationService {
    constructor() {}
    async sendNotification(user: Users, message: string) {
        console.log("Sending notification");
        const url = 'http://o4d9z.mocklab.io/notify'
        try{
            const res = await axios(url, {
                method: 'POST',
                data: {
                    email: user.email,
                    message: message
                }
            })
            return res.data
        } catch (err){
            console.log(err)
            // throw new Error('Erro ao enviar notificação para usuário')
        }
    }
}