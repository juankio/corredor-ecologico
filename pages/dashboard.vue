<template>
  <div>
    <h1 class="text-xl text-white font-bold m-3 pb-20">
      Bienvenidos a nuestra red corredor ecologico <span class="text-yellow-400 hover:text-white">{{ user.users.name }}</span>
    </h1>
    <div v-if="publicaciones.length > 0" class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="(publicacion, index) in publicaciones"
        :key="index"
        :name="publicacion.name"
        :titulo="publicacion.titulo"
        :descripcion="publicacion.descripcion"
        :image="publicacion.archivo"
        class="mb-32"
      />
    </div>
    <div v-else>
      <BlogCard
        name="juan"
        titulo="uni"
        descripcion="descripcion"
        image="/images/uniminuto.webp"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useMediaStore } from '@/stores/media';

definePageMeta({
  layout: "custom",
});

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
