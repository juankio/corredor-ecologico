<template>
  <header class="p-4 mt-6 text-black">
    <nav>
      <h1 class="text-xl text-white font-bold m-3">Corredor Ecologico</h1>
      <UVerticalNavigation
        :links="links"
        :ui="{
          wrapper: 'truncate',
          base: 'group block  leading-6 before:hidden',
          padding: 'p-0 pt-4',
          active: 'text-yellow-400 dark:text-yellow-400 border-current font-semibold',
          inactive:
            'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-yellow-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-500',
        }"
      >
        <template #icon="{ link }">
          <UIcon
            v-if="link.type"
            :name="types[link.type].icon"
            :class="types[link.type].color"
            class="text-lg"
          />
          <UIcon
            v-else
            :name="types.default.icon"
            :class="types.default.color"
            class="text-base"
          />
        </template>
      </UVerticalNavigation>
      <UVerticalNavigation
        :links="links2"
        :ui="{
          wrapper: 'truncate',
          base: 'group block  leading-6 before:hidden',
          padding: 'p-0 pt-4',
          active: 'text-red-400 dark:text-red-400 border-current font-semibold',
          inactive:
            'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-red-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500',
        }"
        @click="handleExit"
      >
        <template #icon="{ link }">
          <UIcon
            v-if="link.type"
            :name="types[link.type].icon"
            :class="types[link.type].color"
            class="text-lg"
          />
          <UIcon
            v-else
            :name="types.default.icon"
            :class="types.default.color"
            class="text-base"
          />
        </template>
      </UVerticalNavigation>

      <img
        src="/images/UNIMINUTO.png"
        alt="uniminuto"
        class="w-full absolute bottom-0 left-0"
      />
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

const types = {
  inicio: {
    icon: "i-heroicons-home",
    color: "text-yellow-400",
  },
  perfil: {
    icon: "i-heroicons-user",
    color: "text-yellow-400",
  },
  media: {
    icon: "i-heroicons-camera",
    color: "text-yellow-400",
  },
  nosotros: {
    icon: "i-heroicons-user-group",
    color: "text-yellow-400",
  },
  metas: {
    icon: "i-heroicons-light-bulb",
    color: "text-yellow-400",
  },
  uni: {
    icon: "i-heroicons-academic-cap",
    color: "text-yellow-400",
  },
  exit: {
    icon: "i-heroicons-arrow-left-start-on-rectangle-20-solid",
    color: "text-red-400",
  },
};
const links = [
  {
    label: "Inicio",
    type: "inicio",
    to: "/dashboard",
  },
  {
    label: "Profile",
    type: "perfil",
    to: "/perfil",
  },
  {
    label: "Subir Fotos",
    type: "media",
    to: "/subirMedia",
  },
  {
    label: "Sobre Nosotros",
    type: "nosotros",
    to: "/despiste",
  },
  {
    label: "Nuestras metas",
    type: "metas",
    to: "/despiste",
  },
  {
    label: "Uniminuto",
    type: "uni",
    to: "/despiste",
  },
];
const links2 = [
  {
    label: "Exit",
    type: "exit",
    to: "/",
  },
];
const toast = useToast();
// const handleExit = () => {
//   // Lógica para manejar la acción de salida...
//   localStorage.clear(); // Esta línea borra todos los elementos del localStorage
//   toast.add({ title: "Cerrando sesión", color: "yellow" });
// };
const handleExit = () => {
  // Lógica para manejar la acción de salida...
  localStorage.removeItem("users");
  localStorage.removeItem("jwt");
  localStorage.removeItem("id");
  toast.add({ title: "Cerrando session", color: "yellow" });
  // Redirigir a la ruta de salida
};
</script>
