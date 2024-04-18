import { preguntaUsuario } from "../../models/preguna-usuario.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Buscar la pregunta del usuario
        const preguntaEncontrada = await preguntaUsuario.findOne({ user: body.user }, { preguntaClave: 1, respuesta: 1, _id: 0 });

        if (!preguntaEncontrada) {
            return {
                error: 'No se encontró ninguna pregunta para este usuario.'
            };
        }

        return {
            pregunta: preguntaEncontrada,
            message: 'Pregunta encontrada exitosamente.'
        };
    } catch (error) {
        return {
            error: 'Ocurrió un error al buscar la pregunta.'
        };
    }
});
