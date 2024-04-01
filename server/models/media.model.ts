import mongoose from "mongoose";
import { array } from "yup";

const mediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    titulo: {
        type: String,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    archivo: {
        type: [String],
        require: true,
        trim: true,
    }
})

export const media = mongoose.model('media', mediaSchema)