import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
    tituloMensage: {
        type: String,
        require: true,
        trim: true,
    },
    mensaje: {
        type: String,
        require: true,
        trim: true,
    },
    mensaje: {
        type: String,
        require: true,
        trim: true,
    },
    idMedia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'media',
        required: true
    }
})

export const comentario = mongoose.model('comentario', comentarioSchema)