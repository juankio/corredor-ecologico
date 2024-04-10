import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';

export const useMediaStore = defineStore('media', () => {
    const archivo = ref({})
    const tituloMedia = ref('')
    const descripcionMedia = ref('')
    const userStore = useUserStore();

    async function agregarMedia(mediaData: {
        titulo: string,
        descripcion: string,
        archivo: string
    }) {
        console.log(mediaData);
        try {
            const token = localStorage.getItem('jwt'); // Obtener el token de localStorage

            const { data, error } = await useFetch('/api/media/guardar-media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar el token de autorización al encabezado
                },
                body: JSON.stringify({
                    ...mediaData,
                    user: userStore.users._id,
                    name: userStore.users.name
                })
            });

            if (data) {
                navigateTo('/dashboard');
                return data._rawValue.message;
            } else {
                const mensaje = 'No se pudo agregar el medio.';
                return mensaje;
            }
        } catch (error) {
            // Capturar cualquier error inesperado aquí
            console.error('Error inesperado:', error);
            const mensaje = 'No se pudo agregar el medio. Error inesperado.';
            return mensaje;
        }
    }
    async function mostrarMedia() {
        try {
            const token = localStorage.getItem('jwt'); // Obtener el token de localStorage

            const { data, error } = await useFetch('/api/media/mostrar-media', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar el token de autorización al encabezado
                }
            });

            if (data) {
                console.log('back o frond', data._rawValue.data)
                return data._rawValue.data;
            } else {
                const error = 'No se pudo encontrar publicaciones.';
                return error;
            }
        } catch (error) {
            // Capturar cualquier error inesperado aquí
            console.error('Error inesperado:', error);
            const mensaje = 'No se pudo agregar el medio. Error inesperado.';
            return mensaje;
        }
    }
    async function comentarios(mediaData: {
        titulo: string,
        comentario: string,
        idMedia: string,
    }) {
        try {
            const token = localStorage.getItem('jwt'); // Obtener el token de localStorage

            const { data, error } = await useFetch('/api/media/comentar-media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Agregar el token de autorización al encabezado
                },
                body: JSON.stringify({
                    ...mediaData,
                    userName: userStore.users._id,
                })
            });

            if (data) {
                console.log('back o frond', data._rawValue.data)
                return data._rawValue.data;
            } else {
                const error = 'No se pudo encontrar publicaciones.';
                return error;
            }
        } catch (error) {
            // Capturar cualquier error inesperado aquí
            console.error('Error inesperado:', error);
            const mensaje = 'No se pudo agregar el medio. Error inesperado.';
            return mensaje;
        }
    }


    //enviar los datos ala base de datos
    return {
        archivo,
        tituloMedia,
        descripcionMedia,
        agregarMedia,
        mostrarMedia
    }
})