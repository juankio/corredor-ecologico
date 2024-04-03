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
        <UFormGroup class="mt-4">
          <UInput
            icon="i-heroicons-question-mark-circle"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            :placeholder="'Pregunta clave: '+ preguntaClave"
            disabled
          />
        </UFormGroup>
        <UFormGroup class="mt-4" name="name" required>
          <UInput
            icon="i-heroicons-question-mark-circle"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            :trailing="false"
            placeholder="Respuesta Clave"
            v-model="state.respuesta"
          />
        </UFormGroup>
        <UFormGroup class="mt-4" name="password" required>
          <UInput
            icon="i-heroicons-eye-solid"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            :trailing="false"
            placeholder="Nueva Contraseña"
            v-model="state.password"
          />
        </UFormGroup>

        <UButton type="submit" color="yellow" class="justify-center mt-10 w-full"> Enviar </UButton>
      </UForm>
      <UiLiinks/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast();
const route = useRoute();
const useStore=useUserStore()
const schema = object({
  respuesta: string().required('Respuesta invalidad'),
  password: string()
  .min(8, 'Must be at least 8 characters')
  .required('Password is required')
})

type Schema = InferType<typeof schema>
  
  const state = reactive({
    respuesta: undefined,
    password: undefined,
  })
  const userStore = useUserStore();
  const router = useRouter();
  
  setTimeout(() => {
  }, 1000);
  
  const pregunta = ref<string | null>(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('preguntaClave')) : null);
  const id = ref<string | null>(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('id')) : null);
console.log('>:)',id._rawValue)

  
console.log('local',pregunta._rawValue.preguntaClave)

const preguntaClave=pregunta._rawValue.preguntaClave
const idUsuario=id._rawValue

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });

    const respuesta = await userStore.actualizarContrasena({
      _id: idUsuario,
      preguntaClave:preguntaClave ,
      respuesta: event.data.respuesta,
      password: event.data.password,

    });
    console.log(respuesta)
    

    toast.add({title:respuesta,color:'yellow' });

    state.pregunta = '';
    state.respuesta = '';

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>

<style scoped></style>
