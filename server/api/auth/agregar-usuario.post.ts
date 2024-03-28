import { usuario } from "../../models/usuario.model"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        // Verificar si el usuario ya existe
        const usuarioExistente = await usuario.findOne({ email: body.email })
        if (usuarioExistente) {
            return {
                message: 'El usuario ya existe.'
            }
        }
        // Si el usuario no existe, crear el nuevo registro
        const usuarioCreado = await usuario.create({
            name: body.name,
            email: body.email,
            password: body.password,
        })
        return {
            data: usuarioCreado,
            message: 'Usuario creado exitosamente.'
        };
    } catch (error) {
        if (error.name === 'UsuarioNoEncontrado') {
            return {
                error: 'Usuario no encontrado.',
                status: 404 // Establecer el código de estado 404
            };
        }
        return {
            error: 'Ocurrió un error al crear el usuario.',
            status: 500 // Establecer un código de estado genérico para otros errores
        };
    }
})