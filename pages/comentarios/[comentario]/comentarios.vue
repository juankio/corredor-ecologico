<template>
  <div
    class="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12"
  >
    <div class="flex flex-col justify-between">
      <div class="space-y-2">
        <h2 class="text-4xl font-bold leading-tight text-yellow-400 lg:text-5xl">
          ¡Cuéntanos tu opinión sobre nuestra publicación!
        </h2>
        <div class="dark:text-gray-600">
          ¿Qué te pareció nuestro último artículo? ¡Queremos conocer tu opinión!
        </div>
      </div>
    </div>

    <UForm :schema="schema" :state="state" class="mt-24 space-y-6" @submit="onSubmit">
      <UFormGroup class="" name="tituloComentario">
        <UInput
          icon="i-heroicons-chat-bubble-bottom-center"
          class="text-center justify-center items-center"
          size="lg"
          color="yellow"
          placeholder="Titulo del comentario"
          v-model="state.tituloComentario"
        />
      </UFormGroup>

      <UFormGroup class="mt-10" name="password">
        <UTextarea
          v-model="state.comentario"
          size="lg"
          resize
          color="yellow"
          placeholder="Comentanos qué te pareció nuestra publicación"
          maxlength="120"
        />
      </UFormGroup>

      <UButton
        type="submit"
        color="yellow"
        class="justify-center mt-10 w-full"
        label=" Comentar"
      />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute();
const media = useMediaStore();
const schema = object({
  tituloComentario: string().required('Required'),
  comentario: string()
    .max(120, 'maximo de 120 caracteres')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  tituloComentario: undefined,
  comentario: undefined
})

const toast = useToast();
async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });
    const respuesta= await media.comentarios({
      tituloMensage: state.tituloComentario,
      mensaje: state.comentario,
      idMedia: route.params.comentario
});
    console.log("desde aca",respuesta)
    toast.add({title:respuesta ,color:'yellow' });

    state.tituloComentario = '';
    state.comentario = '';
   

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>
