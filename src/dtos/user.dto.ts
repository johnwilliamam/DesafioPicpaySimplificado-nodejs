
export interface IUser {
    id: number;
    firstName: string,
    lastName: string,
    document: string,
    email: string,
    password?: string,
    type: string,
    balance: number,
}