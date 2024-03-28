<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <div>
        <h2 class="text-white text-3xl font-semibold">Corredor Ecológico</h2>
        <p class="text-white text-sm mb-10">by Uniminuto</p>
        <p class="text-white text-sm font-semibold mb-4">
          Pregunta de recuperacion de contraseña
        </p>
      </div>
      <UForm :schema="schema" :state="state" class="text-start w-80" @submit="onSubmit">
        <UFormGroup class="" name="pregunta">
          <UInput
            icon="i-heroicons-question-mark-circle"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            :trailing="false"
            placeholder="Pregunta Clave"
            v-model="state.pregunta"
          />
        </UFormGroup>

        <UFormGroup class="mt-10" name="respuesta">
          <UInput
            icon="i-heroicons-archive-box-arrow-down-solid"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            placeholder="Resouesta Clave"
            v-model="state.respuesta"
          />
        </UFormGroup>

        <UButton type="submit" color="yellow" class="justify-center mt-10 w-full"> Enviar </UButton>
      </UForm>
      <UiLiinks />
    </div>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast();
const route = useRoute();
const schema = object({
    pregunta: string().required('Pregunta invalidad'),
    respuesta: string().required('Respuesta invalidad'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  pregunta: undefined,
  respuesta: undefined,
})
const userStore = useUserStore();
const router = useRouter();
const User = useState("User", () => false);


async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });

    const respuesta = await userStore.preguntaClave({
      user: route.params.id,
      preguntaClave: event.data.pregunta,
      respuesta: event.data.respuesta,
    });
    toast.add({title:respuesta,color:'yellow' });

    state.pregunta = '';
    state.respuesta = '';
    User.value = true; // Otra lógica para manejar el cambio de estado de usuario

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>

<style scoped></style>
