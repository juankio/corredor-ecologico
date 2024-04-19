export default defineNuxtRouteMiddleware(async () => {
    const user = useUserStore();
    const router = useRouter();

    // Verificar si el usuario tiene un token y si está intentando acceder a la ruta '/dashboard'
    // if (navigateTo('/dashboard') === '/dashboard' && !user.token) {
    //     return navigateTo('/');
    // } else if (navigateTo('navigateTo') !== '/dashboard' && user.token) {
    //     return navigateTo('/dashboard');
    // }

    // Si no se cumple ninguna de las condiciones anteriores, permite que la navegación continúe
    return;
});