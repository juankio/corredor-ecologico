import { usuario } from "../../models/usuario.model"
import { preguntaUsuario } from "../../models/preguna-usuario.model"

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        // Buscar la pregunta clave y la respuesta en la base de datos
        const pregunta = await preguntaUsuario.findOne({
            preguntaClave: body.preguntaClave,
            respuesta: body.respuesta
        })

        // Verificar si se encontró una pregunta con la clave y respuesta proporcionadas
        if (!pregunta) {
            return {
                error: 'La pregunta clave o la respuesta son incorrectas.'
            }
        }

        // Cambiar la contraseña del usuario usando el ID proporcionado
        const usuarioActualizado = await usuario.findByIdAndUpdate(body._id, {
            password: body.password,
        })

        // Verificar si se pudo actualizar el usuario
        if (!usuarioActualizado) {
            return {
                error: 'No se pudo actualizar el usuario.'
            }
        }

        return {
            mensaje: 'Contraseña actualizada exitosamente.'
        }
    } catch (error) {
        return {
            error: 'Ocurrió un error al actualizar la contraseña.'
        }
    }
})