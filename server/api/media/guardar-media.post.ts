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
        // Utilizar el middleware para verificar el token antes de procesar la solicitud

        await verifyToken(event.req, event.res, () => { });

        // Procesar la solicitud y crear el nuevo registro
        const body = await readBody(event);
        const publicacion = await media.create({
            user: body.user,
            name: body.name,
            titulo: body.titulo,
            descripcion: body.descripcion,
            archivo: body.archivo
        });
        await publicacion.populate({ path: 'user', select: 'name' })
        return {
            data: publicacion,
            message: 'Publicación creada exitosamente.'
        };
    } catch (error) {
        console.log(error);
        return {
            error: 'Ocurrió un error al crear la publicación.'
        };
    }
});