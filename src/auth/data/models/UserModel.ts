import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
    id: string
    username: string
    email: string
    password?: string
    kitchenId?: string
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    kitchenId: String
})