import { IUser } from "../dtos/user.dto";
import { Users } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserServices {
    constructor() { }
    async getAllUsers(): Promise<Users[]> {
        const allUsers = await UserRepository.findAllUsers();
        return allUsers;
    }
    async createUser(user: IUser): Promise<Users> {
        const findByEmail = await UserRepository.findUserByEmail(user.email)
        const findByDocument = await UserRepository.findUserByDocument(user.document)

        if (findByEmail) throw new Error('Já existe um usuário cadastrado com esse e-mail')
        if (findByDocument) throw new Error('Já existe um usuário cadastrado com esse documento')
        const saveUser = await UserRepository.createUser(user);
        return saveUser;
    }
    async findUserById(id: number) {
        const findUser = await UserRepository.findUserById(id);
        console.log(findUser)
        return findUser
    }
    async saveUser(user: IUser) {
        return await UserRepository.save(user);
    }
}