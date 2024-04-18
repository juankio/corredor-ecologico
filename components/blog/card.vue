<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:max-w-md"
  >
    <div class="w-full h-full">
      <div class="w-full h-40">
        <!-- Aquí se establece el tamaño fijo de la imagen -->
        <img class="w-full h-full object-cover rounded-t-lg" :src="image" :alt="name" />
      </div>
      <div class="p-5">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="flex flex-col justify-between md:w-1/2">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ titulo }}
            </h5>
          </div>
          <div class="flex items-center">
            <div>
              <UIcon name="i-heroicons-user" />
            </div>
            <p class="ml-2 font-normal text-gray-700 dark:text-gray-400">{{ name }}.</p>
          </div>
        </div>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ descripcion }}.
        </p>
        <UButton
          icon="i-heroicons-arrow-small-right-solid"
          size="sm"
          color="yellow"
          variant="solid"
          label="Comentar"
          @click="navigateTo(`/comentarios/${comentario}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "Usuario",
  },
  titulo: {
    type: String,
    default: "Titulo",
  },
  descripcion: {
    type: String,
    default: "descripcion",
  },
  image: {
    type: String,
    default: "/images/uniminuto.webp",
  },
  comentario: {
    type: String,
    default: "111111",
  },
});

</script>
