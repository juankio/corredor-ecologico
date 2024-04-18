<template>
  <div class="flex justify-between items-start w-full">
    <div>
      <UButton
        v-if="route.path !== '/auth/crearCuenta'"
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/auth/crearCuenta')"
        >Crear cuenta</UButton
      >
      <UButton
        v-else
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/')"
        >Iniciar sesión</UButton
      >
    </div>

    <div>
      <UButton
        v-if="route.path !== '/auth/olvideContrasena' && route.path !== '/auth/recuperarContrasena'"
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/auth/olvideContrasena')"
        >Olvide contraseña</UButton
      >
      <UButton
        v-else
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/')"
        >Iniciar sesión</UButton
      >
      <!-- <UButton
        v-if="route.path !== '/auth/olvideContrasena' || route.path !== '/auth/recuperarContrasena'"
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/auth/olvideContrasena')"
        >Olvide contraseña</UButton
      >
      <UButton
        v-else
       color="yellow"
        variant="link"
        class="text-start"
        @click="navigateTo('/')"
        >Iniciar sesión</UButton> -->
    </div>
  </div>
</template>
<script setup>
const router = useRouter();
const route = useRoute();
</script>
