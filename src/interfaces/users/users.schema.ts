import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    owner: { type: String, unique: false },
    admin: { type: Boolean, unique: false },
    password: { type: String, unique: false },
    photo: String,
    phone: String,
    autoType: Number,
    carMaker: String,
    vehicleModel: String,
    fabrication: String,
    plate: String,
    count: Number,
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transactions'
    }],
}, { timestamps: true, collection: 'users' });