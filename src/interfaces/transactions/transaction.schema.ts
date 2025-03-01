import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema({
    serviceType: Number,
    valueTotalService: Number,
    finished: Boolean
}, {timestamps: true, collection: 'transactions'});