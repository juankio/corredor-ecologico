<template>
  <div>
    <h1 class="text-xl text-white font-bold m-3 pb-20">
      Bienvenidos a nuestra red corredor ecologico <span class="text-yellow-400 hover:text-white">{{ user.users.name }}</span>
    </h1>
    <div v-if="publicaciones.length > 0" class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="(publicacion, index) in publicaciones"
        :key="index"
        :name="publicacion.user.name"
        :titulo="publicacion.titulo"
        :descripcion="publicacion.descripcion"
        :image="publicacion.archivo"
        :comentario="publicacion._id" 
        class="mb-32"
      />
    </div>
      <p v-else class="text-white text-2xl text-center mt-5">No Publicaciones </p>
      
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useMediaStore } from '@/stores/media';

definePageMeta({
  layout: "custom",
});

useSeoMeta({
  title: 'Dashboard-Corredor Ecologico',
  ogTitle: 'Dashboard-Corredor Ecologico',
  description: 'Descubre un paraíso natural en el Corredor Ecológico, donde la biodiversidad y la conservación se unen en armonía.',
  ogDescription: 'Explora la belleza natural del Corredor Ecológico y enamórate de la naturaleza como nunca antes.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
const user = useUserStore();
const media = useMediaStore();
const router = useRouter();
const publicaciones = ref([]);

onMounted(async () => {
  try {
    if (!user.token) {
      navigateTo("/");
      return; 
    }
    setTimeout(async () => {
      const response = await media.mostrarMedia();
      publicaciones.value = response || [];
    }, 100);
    
    const response = await media.mostrarMedia();
    publicaciones.value = response || [];
    
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
  }
});
</script>

<style lang="scss" scoped></style>
