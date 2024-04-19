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

            if (data._rawValue.message) {
                navigateTo('/dashboard');
                return data._rawValue.message;
            } else {
                return data._rawValue.error;
            }
        } catch (error) {
            // Capturar cualquier error inesperado aquí
            console.error('Error inesperado:', error);
            return data._rawValue.error;
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
        user: string,
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
                    // user: useUserStore.users._id
                })
            });

            if (data._rawValue.message) {
                navigateTo(`/dashboard`)

                return data._rawValue.message;
            } else {
                return data._rawValue.error;
            }
        } catch (error) {
            // Capturar cualquier error inesperado aquí
            console.error('Error inesperado:', error);

            const mensaje = 'No se pudo agregar el medio. Error inesperado.';
            return mensaje;
        }
    }
    async function todosComentarios(mediaData: {
        idMedia: string,
    }) {
        try {
            const token = localStorage.getItem('jwt'); // Obtener el token de localStorage

            const { data, error } = await useFetch('/api/media/mostrar-comentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(mediaData)
            });


            if (data._rawValue.message) {
                return data._rawValue.data;
            } else {
                return data._rawValue.error;
            }

        } catch (error) {
            // Mostrar mensajes de error más descriptivos al usuario
            console.error('Error al obtener los comentarios:', error.message);
            return 'No se pudieron obtener los comentarios. Por favor, inténtalo de nuevo más tarde.';
        }
    }

    //enviar los datos ala base de datos
    return {
        archivo,
        tituloMedia,
        descripcionMedia,
        agregarMedia,
        mostrarMedia,
        comentarios,
        todosComentarios
    }
})