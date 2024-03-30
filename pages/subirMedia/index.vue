<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <UIcon name="i-heroicons-cloud-arrow-up" class="text-5xl" />
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click para subir archivo</span> o arrastrar y soltar
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" @change="handleFileInput" />
    </label>
  </div>
  <div class="mt-4" v-if="selectedFile">
    <img
      v-if="isImage(selectedFile)"
      :src="getObjectURL(selectedFile)"
      alt="Imagen seleccionada"
      class="max-w-full max-h-full"
    />
    <video
      v-else
      :src="getObjectURL(selectedFile)"
      controls
      class="max-w-full max-h-full"
    ></video>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
const selectedFile = ref(null);
const router = useRouter();

const handleFileInput = (event) => {
  const file = event.target.files[0];
  selectedFile.value = file;
};

const isImage = (file) => {
  return file.type.startsWith("image/");
};

const getObjectURL = (file) => {
  if (file) {
    return window.URL.createObjectURL(file);
  } else {
    return null;
  }
};
</script>
<style></style>
