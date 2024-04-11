import jwt from 'jsonwebtoken';
import { comentario } from '../../models/comentarios.model';

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

// Asegúrate de importar la función verifyToken desde donde esté definida

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        await verifyToken(event.req, event.res, () => { }); // Verificar el token antes de procesar la solicitud
        // Crear un nuevo comentario en la base de datos
        const nuevoComentario = await comentario.create({
            userName: body.userName,
            mensaje: body.mensaje,
            tituloMensage: body.tituloMensage,
            idMedia: body.idMedia,
            img: body.img
        });

        return {
            data: nuevoComentario,
            message: 'Comentario creado exitosamente.'
        };
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        return {
            error: 'Error interno del servidor al crear el comentario.'
        };
    }
});
