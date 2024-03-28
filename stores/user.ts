import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
    state: () => ({
        // Aquí defines el estado inicial de tu store
        token: (typeof localStorage !== 'undefined') ? localStorage.getItem('jwt') || null : null,
        users: [],
        idUsuario: '',
        preguntas: [],
    }),
    actions: {
        async agregarUsuario(userData: { email: string, name: string, password: string }) {
            console.log(userData)
            try {
                const { data, error } = await useFetch('/api/auth/agregar-usuario', {
                    method: 'POST',
                    body: JSON.stringify(userData)
                });

                if (data) {
                    navigateTo(`/auth/${data._rawValue.data._id}`);

                    return data._rawValue.message;

                } else {
                    const mensaje = 'No se pudo agregar el usuario.';
                    return mensaje
                }

            } catch (error) {
                // Captura cualquier error inesperado aquí
                console.error('Error inesperado:', error);

                const mensaje = 'No se pudo agregar el usuario, Error inesperado .';
                return mensaje
            }
        },
        async login(userData: { email: string, password: string }) {
            try {
                const { data, pending, error } = await useFetch('/api/auth/verificar-usuario', {
                    method: 'POST',
                    body: JSON.stringify(userData)
                });

                if (data) {
                    const token = data._rawValue.token;
                    if (token) {
                        localStorage.setItem('jwt', token);
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
                    const mensaje = 'No se recibió una respuesta válida del servidor.';
                    return mensaje;
                }
            } catch (error) {
                // Maneja cualquier error ocurrido durante la solicitud
                console.error('Error al iniciar sesión:', error);
                const mensaje = 'Error al iniciar sesión.';
                return mensaje;
            }
        },
        checkJWT() {
            this.token = (typeof localStorage !== 'undefined') ? localStorage.getItem('jwt') || null : null
        },

        async preguntaClave(userData: { user: any, preguntaClave: string, respuesta: string }) {
            try {
                const userString = typeof userData.user === 'object' ? userData.user.toString() : userData.user;

                const { data, pending, error } = await useFetch('/api/auth/agregar-preguntaUsuario', {
                    method: 'POST',
                    body: JSON.stringify({ ...userData, user: userString })
                });

                if (data && data._rawValue.preguntaCreada) {
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
                const mensaje = 'Error al crear la pregunta.';
                return mensaje
            }

        },
        async buscarCuenta(userData: { email: string, }) {
            try {
                const { data, pending, error } = await useFetch('/api/auth/buscar-usuario', {
                    method: 'POST',
                    body: JSON.stringify(userData)
                });

                if (data && data._rawValue._id) {
                    this.idUsuario = data._rawValue._id
                    navigateTo('/auth/recuperarContrasena');
                    this.buscarPreguntas(data._rawValue._id)
                    return data._rawValue.message;
                } else {
                    const mensaje = 'No se recibió una respuesta válida del servidor.';
                    return mensaje
                }
            }
            catch (error) {
                // Maneja cualquier error ocurrido durante la solicitud
                console.error('Error al crear la pregunta:', error);
                const mensaje = 'Error al crear la pregunta';
                return mensaje
            }

        },

        async buscarPreguntas(userData) {

            const body = {
                user: userData
            };

            try {
                const { data, error } = await useFetch('/api/auth/buscar-pregunta', {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                if (data) {
                    this.preguntas.push(userData)
                    return
                } else {
                    const mensaje = 'No se recibió preguntas.';
                    return mensaje
                }
                // Manejar la respuesta del servidor
            } catch (error) {
                // Manejar cualquier error ocurrido durante la solicitud
                console.error('Error al buscar las preguntas:', error);
            }

        },

    },
    getters: {
        // Define tus computados aquí
        isLoggedIn(state) {
            return !!state.token;
        },
    }
})