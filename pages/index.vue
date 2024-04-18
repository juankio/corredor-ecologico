<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <div>
        <h2 class="text-white text-3xl font-semibold">Corredor Ecológico</h2>
        <p class="text-white text-sm mb-10">by Uniminuto</p>
        <p class="text-white text-sm font-semibold mb-4">Login</p>
      </div>
      <UForm :schema="schema" :state="state" class="text-start w-80" @submit="onSubmit">
        <UFormGroup class="" name="email">
          <UInput
            icon="i-heroicons-envelope-20-solid"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            placeholder="Correo"
            v-model="state.email"
          />
        </UFormGroup>

        <UFormGroup class="mt-10" name="password">
          <UInput
            icon="i-heroicons-eye-solid"
            size="lg"
            class="text-start"
            color="yellow"
            type="password"
            :trailing="false"
            placeholder="Contraseña "
            v-model="state.password"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="yellow"
          class="justify-center mt-10 w-full"
          label=" Iniciar Sesion"
        />
      </UForm>
      <UiLiinks />
    </div>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

useSeoMeta({
  title: 'Subir Media-Corredor Ecologico',
  ogTitle: 'Subir Media-Corredor Ecologico',
  description: 'Descubre un paraíso natural en el Corredor Ecológico, donde la biodiversidad y la conservación se unen en armonía.',
  ogDescription: 'Explora la belleza natural del Corredor Ecológico y enamórate de la naturaleza como nunca antes.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const toast = useToast();
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})
const userStore = useUserStore();

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });

    const responde = await userStore.login(event.data);
    console.log("desde aca",responde)
    toast.add({title:responde,color:'yellow' });

    state.email = '';
    state.password = '';

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>

<style scoped></style>
