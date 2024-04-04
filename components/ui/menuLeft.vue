<template>
  <header class="p-4 mt-6 text-black">
    <nav>
      <h1 class="text-xl text-white font-bold m-3">Corredor Ecologico</h1>
      <UVerticalNavigation :links="links" />
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

const links = [
  [
    {
      label: "Inicio",
      icon: "i-heroicons-home",
      to: "/dashboard",
    },
    {
      label: "Profile",
      icon: "i-heroicons-user",
      to: "/perfil",
    },
    {
      label: "Subir Fotos",
      icon: "i-heroicons-camera",
      to: "/subirMedia",
    },
  ],
  [
    {
      label: "Sobre Nosotros",
      icon: "i-heroicons-user-group",
      to: "/despiste",
    },
    {
      label: "Nuestras metas",
      icon: "i-heroicons-light-bulb",
      to: "/despiste",
    },
    {
      label: "Uniminuto",
      icon: "i-heroicons-academic-cap",
      to: "/despiste",
    },
  ],
  [
    {
      label: "Exit",
      icon: "i-heroicons-arrow-left-start-on-rectangle-20-solid",
      to: "/",
      onClick: function() {
        localStorage.clear(); // Borra todos los datos del localStorage
      }
    },
  ],
];
</script>
