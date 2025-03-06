import { Transactions } from "../transactions/transaction.interface";

export interface Users extends Document {
    readonly _id: string;
    name: string;
    admin: boolean;
    password?: string;
    photo: string;
    owner: string;
    phone: string;
    autoType: number;
    carMaker: string;
    vehicleModel: string;
    fabrication: string;
    plate: string;
    count: number;
    transactions: Array<Transactions>;
}