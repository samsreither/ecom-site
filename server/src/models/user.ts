import { Schema, model } from 'mongoose';

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    availableMoney: number;
    purchasedItems: string[];
}

// this is what the user will look like when it comes in from front end
const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    availableMoney: { type: Number, default: 5000 },
    purchasedItems: [{type: Schema.Types.ObjectId, ref: "product", default: []}]
})

export const userModel = model<IUser>("user", UserSchema);