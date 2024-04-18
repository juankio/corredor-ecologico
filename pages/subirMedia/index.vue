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

  <UForm :schema="schema" :state="state" class="space-y-4 mt-10" @submit="onSubmit">
    <UFormGroup label="Título " name="titulo">
      <UInput
        v-model="state.titulo"
        size="lg"
        color="yellow"
        placeholder="Ingrese el título"
      />
    </UFormGroup>

    <UFormGroup label="Descripción" name="descripcion">
      <UTextarea
        v-model="state.descripcion"
        size="lg"
        resize
        color="yellow"
        placeholder="Ingrese la descripción"
        maxlength="120"
      />
    </UFormGroup>

    <UButton
      type="submit"
      color="yellow"
      class="w-full text-center items-center justify-center text-3xl"
    >
      Publicar
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { ref as firebaseRef, getDownloadURL, uploadBytes } from 'firebase/storage';

definePageMeta({
  layout: "custom",
});
useSeoMeta({
  title: 'Subir Media-Corredor Ecologico',
  ogTitle: 'Subir Media-Corredor Ecologico',
  description: 'Descubre un paraíso natural en el Corredor Ecológico, donde la biodiversidad y la conservación se unen en armonía.',
  ogDescription: 'Explora la belleza natural del Corredor Ecológico y enamórate de la naturaleza como nunca antes.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
const {$storage} =useNuxtApp()

const mostrar=ref()

const schema = object({
  titulo: string().required('Required'),
  descripcion: string()
    .max(120, 'maximo de 120 caracteres')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  titulo: undefined,
  descripcion: undefined
})


const selectedFile = ref(null);
const router = useRouter();
const media =useMediaStore()
const toast = useToast();

const uploadMediaImages = async (images) => {
    console.log(images)

    if (images?.length === 0) return []
    const urls = images.map(async image => {
      const imagesRef = firebaseRef($storage, `/images/${crypto.randomUUID()}`)
      await uploadBytes(imagesRef, image)
      return await getDownloadURL(imagesRef)
    })

    return await Promise.all(urls)
  }

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


async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });


    // const responde = await userStore.login(event.data);
    // console.log("desde aca",responde)
    // toast.add({title:responde,color:'yellow' });
    const data =await uploadMediaImages([selectedFile.value])
    console.log(data)

   const respuesta= await media.agregarMedia({
    titulo: state.titulo,
    descripcion: state.descripcion,
    archivo: data
});
console.log("desde aca",respuesta)
    toast.add({title:respuesta,color:'yellow' });


  console.log('datos',state.titulo ,state.descripcion, data )

  selectedFile.value=null
    state.titulo = '';
    state.descripcion = '';

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>
<style></style>
