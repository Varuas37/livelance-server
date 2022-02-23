import * as mongoose from 'mongoose'
export default interface MongoCrudModel {
    getModelName();
    getBodyParameters();
    createModel(reqBody);
    getModelSchema();
}

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
})