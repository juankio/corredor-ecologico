import { comentario } from "../../models/comentarios.model";
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.headers['authorization'];

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ error: 'Token de autorización no proporcionado.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token.split(' ')[1], 'secreto');
        // Agregar el usuario decodificado al objeto de solicitud para su posterior uso
        req.user = decoded;
        // Continuar con la ejecución de la solicitud
        next();
    } catch (error) {
        // Manejar errores de token inválido
        return res.status(401).json({ error: 'Token de autorización inválido.' });
    }
};

export default defineEventHandler(async (event) => {
    try {
        await verifyToken(event.req, event.res, () => { });

        const body = await readBody(event);

        // Buscar todos los comentarios con el idMedia especificado
        const comentarios = await comentario.find(
            { idMedia: body.idMedia },
            { tituloMensage: 1, mensaje: 1, idMedia: 1, user: 1 }
        ).populate({
            path: 'idMedia', select: 'archivo'
        }).populate({
            path: 'user',
            select: 'name',
        })

        return {
            data: comentarios,
            message: 'Comentarios obtenidos exitosamente.'
        };
    } catch (error) {
        console.error('Error al recuperar los comentarios:', error);
        return {
            statusCode: 500,
            body: {
                error: 'Ocurrió un error al recuperar los comentarios.'
            }
        };
    }
});