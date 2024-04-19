import { usuario } from "../../models/usuario.model";
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        // Buscar el usuario por correo electrónico en la base de datos
        const usuarioEncontrado = await usuario.findOne({ email: body.email })

        if (!usuarioEncontrado) {
            return {
                error: 'Correo electrónico no encontrado.'
            }
        }

        // Verificar si la contraseña es correcta
        if (body.password !== usuarioEncontrado.password) {
            return {
                error: 'contraseña incorrectos.',
            }
        }

        // Generar un token de autenticación JWT
        const token = jwt.sign({ id: usuarioEncontrado._id }, 'secreto', { expiresIn: '30d' });

        return {
            token,
            usuarioEncontrado,
            message: 'Credenciales correctas.'
        }

    } catch (error) {
        return {
            error: 'Ocurrió un error al iniciar sesión.'
        };
    }
});
