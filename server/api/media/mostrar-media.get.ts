import { media } from "../../models/media.model";
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
        // Obtener todas las publicaciones ordenadas por fecha de creación (la más reciente primero)
        const publicaciones = await media.find().sort({ createdAt: -1 });

        return {
            data: publicaciones,
            message: 'Publicaciones recuperadas exitosamente.'
        };
    } catch (error) {
        console.error('Error al recuperar las publicaciones:', error);
        return {
            error: 'Ocurrió un error al recuperar las publicaciones.'
        };
    }
});