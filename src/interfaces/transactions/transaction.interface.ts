export interface Transactions extends Document {
    readonly _id: string;
    serviceType: number;
    valueTotalService: number;
    finished: boolean
}