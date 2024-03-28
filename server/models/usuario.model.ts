import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token: {
        type: String,
        default: () => Date.now().toString(32) + Math.random().toString(32).substring(2)
    },
    verified: {
        type: Boolean,
        default: false
    },
})

export const usuario = model('usuario', usuarioSchema)