// export default defineNuxtRouteMiddleware(async () => {
//     const user = useUserStore();
//     user.checkJWT()
//     const prueba = user.isLoggedIn
//     console.log('Valor de user.token:', user.$state.token);
//     console.log('Valor de user.token:', prueba);

//     // Verificar si el usuario tiene un token y si está intentando acceder a la ruta '/dashboard'
//     // if (to.path === '/dashboard' && !user.token) {
//     //     return navigateTo('/');
//     // } else if (to.path !== '/dashboard' && user.token) {
//     //     return navigateTo('/dashboard');
//     // }

//     // Si no se cumple ninguna de las condiciones anteriores, permite que la navegación continúe
//     return;
// });