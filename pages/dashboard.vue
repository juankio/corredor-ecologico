<template>
  <div>
    <h1 class="text-end text-xl text-white font-bold m-3 pb-20">
      Bienvenidos a nuestra red corredor ecologico {{ user.users.name }}
    </h1>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
    <BlogCard
      v-for="(publicacion, index) in publicaciones"
      :key="index"
      :name="publicacion.name"
      :titulo="publicacion.titulo"
      :descripcion="publicacion.descripcion"
      :image="publicacion.archivo"
      class="mb-32"
    />
    <!-- <BlogCard
      name="juan"
      titulo="uni"
      descripcion="descripcion"
      image="/images/uniminuto.webp"
    /> -->
  </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
  // middleware: 'auth'
});
const user = useUserStore();
const media = useMediaStore();
const router = useRouter();
const nombre = ref(user.users.name);
const publicaciones = ref([]);
console.log("nombre", nombre);

onMounted(async () => {
  try {
    if (!user.token) {
      navigateTo("/");
      return; // Detiene la ejecución del código si el usuario no tiene un token
    }

    const response = await media.mostrarMedia();
    publicaciones.value = response;
    console.log("Publicaciones:", publicaciones);
    // Aquí podrías asignar las publicaciones a una variable en tu estado global o en el componente para mostrarlas en tu interfaz de usuario
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    // Aquí podrías mostrar un mensaje de error en tu interfaz de usuario si la solicitud falla
  }
});

</script>

<style lang="scss" scoped></style>
