<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <div>
        <h2 class="text-white text-3xl font-semibold">Corredor Ecológico</h2>
        <p class="text-white text-sm mb-10">by Uniminuto</p>
        <p class="text-white text-sm font-semibold mb-4">Crear Cuenta</p>
      </div>
      <UForm :schema="schema" :state="state" class="text-start w-80" @submit="onSubmit">
        <UFormGroup class="" name="name">
          <UInput
            icon="i-heroicons-user-16-solid"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            :trailing="false"
            placeholder="Nombre"
            v-model="state.name"
          />
        </UFormGroup>

        <UFormGroup class="mt-10" name="email">
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
            :trailing="false"
            placeholder="Contraseña "
            v-model="state.password"
          />
        </UFormGroup>

        <UButton type="submit" color="yellow" class="justify-center mt-10 w-full">
          Crear cuenta
        </UButton>
      </UForm>
      <UiLiinks />
    </div>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
useSeoMeta({
  title: 'Crear cuenta-Corredor Ecologico',
  ogTitle: 'Crear cuenta-Corredor Ecologico',
  description: 'Descubre un paraíso natural en el Corredor Ecológico, donde la biodiversidad y la conservación se unen en armonía.',
  ogDescription: 'Explora la belleza natural del Corredor Ecológico y enamórate de la naturaleza como nunca antes.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
const toast = useToast();
const schema = object({
  email: string().email('Invalid email').required('Required'),
  name: string().required('Name is required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  name: undefined,
  password: undefined
})
const userStore = useUserStore();

const User = useState("User", () => false);
async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });

    const respuesta = await userStore.agregarUsuario(event.data);
    toast.add({title:respuesta,color:'yellow' });

    state.email = '';
    state.name = '';
    state.password = '';
    User.value = true; // Otra lógica para manejar el cambio de estado de usuario

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>

<style scoped></style>
