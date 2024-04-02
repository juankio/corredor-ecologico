<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl">
    <div class="p-6 flex items-center space-x-4">
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12">
        <!-- <img
          class="aspect-square h-full w-full"
          alt="Avatar"
          src="/placeholder-user.jpg"
        /> -->
      </span>
      <div class="grid gap-1">
        <h1 class="text-2xl font-bold">{{user.users.email}}</h1>
      </div>
    </div>
    <div class="p-6">
      <div class="border-t border-b border-gray-200 dark:border-gray-800">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="field in profileFields" :key="field.label" class="flex flex-col">
            <div class="text-sm font-medium text-gray-500">{{ field.label }}</div>
            <div class="font-medium">{{ field.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
const user = useUserStore()

const profileFields = ref([])
if (!user.users.preguntasClave) {
  setTimeout(() => {
    profileFields.value = { 
      name: "Nombre de ejemplo",
      email: "correo@example.com",
      preguntasClave: {
        preguntaClave: "Pregunta de seguridad",
        respuesta: "Respuesta de seguridad"
      }
    };

    profileFields.value = [
      { label: "Nombre", value: user.users.name },
      { label: "Email", value: user.users.email },
      { label: "Pregunta Clave", value:  user.users.preguntasClave.preguntaClave },
      { label: "Respuesta Clave", value:  user.users.preguntasClave.respuesta }
    ];
  }, 1000); 
  } 
else{
  profileFields.value = [
    { label: "Nombre", value: user.users.name },
    { label: "Username", value: user.users.name },
    { label: "Email", value: user.users.email },
    { label: "Preguta Clave", value:  user.users.preguntasClave.preguntaClave },
    { label: "Respuesta Clave", value:  user.users.preguntasClave.respuesta },
  ];
}


</script>

<style scoped>
/* Estilos específicos del componente */
</style>
