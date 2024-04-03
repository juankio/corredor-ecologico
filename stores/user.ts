import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const users = ref([])
    const preguntas = ref([])

    onMounted(() => {
        token.value = (typeof localStorage !== 'undefined') ? localStorage.getItem('jwt') || '' : ''
        users.value = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('users')) || [] : []
        preguntas.value = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('preguntaClave')) || [] : []
    })

    async function agregarUsuario(userData: { email: string, name: string, password: string }) {
        console.log(userData)
        try {
            const { data, error } = await useFetch('/api/auth/agregar-usuario', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (data && data._rawValue.message) {
                navigateTo(`/auth/${data._rawValue.data._id}`);

                return data._rawValue.message;

            } else {
                return data._rawValue.error
            }

        } catch (error) {
            // Captura cualquier error inesperado aquí
            console.error('Error inesperado:', error);

            return data._rawValue.error
        }
    }
    async function login(userData: { email: string, password: string }) {
        try {
            const { data, pending, error } = await useFetch('/api/auth/verificar-usuario', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (data) {

                token.value = data._rawValue.token;

                const preguntasClave = await buscarPreguntas(data._rawValue.usuarioEncontrado._id)
                const usuarioConPreguntas = {
                    ...data._rawValue.usuarioEncontrado,
                    preguntasClave: preguntasClave
                };
                users.value = usuarioConPreguntas;

                console.log('>:)', users)

                if (token.value && data._rawValue.message) {
                    localStorage.setItem('users', JSON.stringify(users.value))
                    localStorage.setItem('jwt', token.value);
                    // Verificar si useFetch está configurado correctamente para manejar encabezados personalizados
                    if (useFetch.defaults?.headers?.common) {
                        useFetch.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }
                    navigateTo('/dashboard');
                    return data._rawValue.message;
                }
                // Redirige al usuario a la página principal u otra página según sea necesario
                return data._rawValue.message;
            } else {

                return data._rawValue.error
            }
        } catch (error) {
            // Maneja cualquier error ocurrido durante la solicitud
            console.error('Error al iniciar sesión:', error);
            return data._rawValue.error
        }
    }

    async function preguntaClave(userData: { user: any, preguntaClave: string, respuesta: string }) {
        try {
            const userString = typeof userData.user === 'object' ? userData.user.toString() : userData.user;

            const { data, pending, error } = await useFetch('/api/auth/agregar-preguntaUsuario', {
                method: 'POST',
                body: JSON.stringify({ ...userData, user: userString })
            });

            if (data._rawValue.message && data._rawValue.preguntaCreada) {
                navigateTo('/');
                return data._rawValue.message;
            } else {
                const mensaje = 'No se recibió una respuesta válida del servidor.';
                return mensaje
            }
        }
        catch (error) {
            // Maneja cualquier error ocurrido durante la solicitud
            console.error('Error al crear la pregunta:', error);

            return data._rawValue.error
        }

    }
    async function buscarCuenta(userData: { email: string, }) {
        try {
            const { data, pending, error } = await useFetch('/api/auth/buscar-usuario', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (data._rawValue.message && data._rawValue._id) {
                navigateTo('/auth/recuperarContrasena');
                const pregunta = await buscarPreguntas(data._rawValue._id)
                preguntas.value = pregunta
                if (pregunta) {
                    console.log("pregunta dudosas", preguntas.value)

                    localStorage.setItem('preguntaClave', JSON.stringify(preguntas.value))
                    localStorage.setItem('id', JSON.stringify(data._rawValue._id))
                }

                preguntas.value = pregunta
                return data._rawValue.message;
            } else {
                return data._rawValue.error
            }
        }
        catch (error) {
            // Maneja cualquier error ocurrido durante la solicitud
            console.error('Error al crear la pregunta:', error);
            return data._rawValue.error
        }

    }

    async function buscarPreguntas(userData) {

        const body = {
            user: userData
        };

        try {

            const { data, error } = await useFetch('/api/auth/buscar-pregunta', {
                method: 'POST',
                body: JSON.stringify(body)
            });
            if (data && data._rawValue.message) {
                return data._rawValue.pregunta
            } else {

                return data._rawValue.error
            }
            // Manejar la respuesta del servidor
        } catch (error) {
            // Manejar cualquier error ocurrido durante la solicitud
            console.error('Error al buscar las preguntas:', error);
        }

    }
    async function actualizarContrasena(userData: { _id: string, preguntaClave: string, respuesta: string, password: string }) {
        try {
            const { data, pending, error } = await useFetch('/api/auth/actualizar-contrasena', {
                method: 'PATCH',
                body: JSON.stringify(userData)
            });

            if (data._rawValue.message) {
                navigateTo('/');
                return data._rawValue.message;
            } else {
                return data._rawValue.error
            }
        }
        catch (error) {
            // Maneja cualquier error ocurrido durante la solicitud
            console.error('Error al crear la pregunta:', error);
            const mensaje = 'Error al crear la pregunta';
            return mensaje
        }

    }


    return {

        actualizarContrasena,
        buscarPreguntas,
        buscarCuenta,
        preguntaClave,
        login,
        agregarUsuario,
        token,
        users
    }
})