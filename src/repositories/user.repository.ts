import { AppDataSource } from "../config/datasource";
import { IUser } from "../dtos/user.dto";
import { Users } from "../entities/user.entity";
import { UserType } from "../types/User.type";
export const UserRepository = AppDataSource.getRepository(Users).extend({
    async findAllUsers(): Promise<Users[]> {
        return await this.find()
    }, 
    async findUserById(id: number){
        try{
            const find = await this.findOne({where: { id } } )
            return find
        }catch(err){
            console.log(err)
            throw new Error('Erro ao consultar usuário')
        }
    },
    async findUserByEmail(email: string){
        try {
            const user = await this.findOne({ where: { email } })
            return user
        }catch (err) {
            throw new Error('Erro ao consultar usuário')
        }
    },
    async findUserByDocument(document: string){
        try {
            const user = await this.findOne({ where: { document } })
            return user
        }catch (err) {
            throw new Error('Erro ao consultar usuário')
        }
    },
    async createUser(user: IUser): Promise<Users> {
        const typeReq = user.type as keyof typeof UserType;
        const userType = UserType[typeReq];
        user.type = userType
        try {
            console.log('SAVE')
            const newUser = await this.create(user)
            newUser.save()
            return newUser;
        } catch (err) {
            console.log(err)
            throw new Error('Erro ao cadastrar usuário')
        }
    },
    async updateUser(data: IUser, userId: number): Promise<Users>{
        const user = await this.findOneByOrFail({ id: userId });
        user.firstName = data?.firstName;
        user.lastName = data?.lastName;
        user.balance = data?.balance
        user.document = data?.document
        user.email = data?.email
        try{
            await user.save();
            return user
        }catch(err){
            console.log(err)
            throw new Error('Erro ao atualizar usuário')
        }
    }
})