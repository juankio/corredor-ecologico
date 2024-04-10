import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true,
    },
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
    idMedia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'media',
    }
})

export const comentario = mongoose.model('comentario', comentarioSchema)