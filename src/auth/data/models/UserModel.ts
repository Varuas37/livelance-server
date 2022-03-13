import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
    id: string
    email: string
    password?: string
}

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: String,
})