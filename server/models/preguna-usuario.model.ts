import mongoose from "mongoose";

const preguntaUsuarioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        unique: true
    },
    preguntaClave: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    respuesta: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    }
})

export const preguntaUsuario = mongoose.model('preguntaUsuario', preguntaUsuarioSchema)