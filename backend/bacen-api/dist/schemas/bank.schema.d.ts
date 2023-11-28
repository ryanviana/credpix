import * as mongoose from 'mongoose';
export declare class Bank {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
}
export declare const BankSchema: mongoose.Schema<Bank, mongoose.Model<Bank, any, any, any, mongoose.Document<unknown, any, Bank> & Bank & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Bank, mongoose.Document<unknown, {}, mongoose.FlatRecord<Bank>> & mongoose.FlatRecord<Bank> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
