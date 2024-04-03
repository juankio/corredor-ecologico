import { preguntaUsuario } from "../../models/preguna-usuario.model"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        // Verificar si el usuario ya existe
        const usuarioExistente = await preguntaUsuario.findOne({ user: body.user })
        if (usuarioExistente) {
            return {
                error: 'El usuario ya existe.'
            }
        }
        // Si el usuario no existe, crear el nuevo registro
        const preguntaCreada = await preguntaUsuario.create({
            user: body.user,
            preguntaClave: body.preguntaClave,
            respuesta: body.respuesta,
        })

        return {
            preguntaCreada,
            message: 'Pregunta creada exitosa mente.'
        }
    } catch (error) {
        return {
            error: 'Ocurrió un error al crear la pregunta.'
        }
    }
})