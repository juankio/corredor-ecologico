import { usuario } from "../../models/usuario.model";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Buscar el usuario por correo electrónico en la base de datos
        const usuarioEncontrado = await usuario.findOne({ email: body.email }, '_id');

        if (!usuarioEncontrado) {
            return {
                message: 'Correo electrónico no encontrado.'
            };
        }

        return {
            _id: usuarioEncontrado._id,
            message: 'Usuario encontrado.'
        };

    } catch (error) {
        console.error(error);
        return {
            error: 'Ocurrió un error al buscar el usuario.'
        };
    }
});