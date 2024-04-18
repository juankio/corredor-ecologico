<template>
  <section v-if="$route.name === 'comentarios-comentario'">
    <div class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
      <div class="grid grid-cols-1 gap-32 md:grid-cols-2">
        <!-- Columna de la imagen -->
        <div class="max-w-sm mx-auto sm:max-w-full">
          <img
            v-if="imagenComentario"
            :src="imagenComentario"
            alt=""
            class="mt-9 w-full h-auto rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
          />
          <p v-else class="text-white text-2xl text-center mt-5">No hay imagen disponible</p>
        </div>
        <!-- Columna de los comentarios, el botón y el acordeón -->
        <div class="max-w-sm mx-auto sm:max-w-full">
          <div class=" space-y-4"> <!-- Incrementamos el espacio vertical entre elementos a 4 -->
            <div class="flex justify-between items-center ">
              <h3 class="text-2xl font-semibold text-yellow-500 sm:text-4xl mr-5">
                Comentarios
              </h3>
              <!-- Botón para agregar comentario -->
              <UButton
                v-if="comentario.length > 0"
                icon="i-heroicons-pencil-square"
                size="sm"
                color="yellow"
                variant="solid"
                label="Agregar comentario"
                :trailing="false"
                @click="navigateTo(`/comentarios/${route.params.comentario}/comentarios`)"
              />
              <p v-else class="text-white text-2xl text-center ">No hay comentarios</p>
            </div>
            <!-- Acordeón de comentarios -->
            <UAccordion v-if="comentario.length > 0" color="yellow" variant="outline" size="sm" :items="comentario" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});

// Variables reactivas
const comentario = ref([]);
const imagenComentario = ref(null);

// Obtenemos la ruta actual
const route = useRoute();

// Llamada a la función para obtener los comentarios cuando el componente se monta
onMounted(async () => {
  try {
    // Llamada a la función para obtener los comentarios
    const media = useMediaStore();
    const response = await media.todosComentarios({ idMedia: route.params.comentario });
    if (Array.isArray(response) && response.length > 0) {
      comentario.value = response.map((item, index) => ({
        label: `usuario: ${item.idMedia.user.name} Titulo: ${item.tituloMensage}`,
        icon: "i-heroicons-user",
        content: item.mensaje,
      }));
      imagenComentario.value = response[0].idMedia.archivo[0];
    } else {
      console.error("Error: No se obtuvieron datos válidos de la respuesta");
    }
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
  }
});
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
