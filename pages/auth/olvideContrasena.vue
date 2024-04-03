<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <div>
        <h2 class="text-white text-3xl font-semibold">Corredor Ecológico</h2>
        <p class="text-white text-sm mb-10">by Uniminuto</p>
        <p class="text-white text-sm font-semibold mb-4">Buscar Cuenta</p>
      </div>
      <UForm :schema="schema" :state="state" class="text-start w-80" @submit="onSubmit">
        <UFormGroup class="" name="email" required>
          <UInput
            icon="i-heroicons-envelope-20-solid"
            class="text-center justify-center items-center"
            size="lg"
            color="yellow"
            placeholder="Correo"
            v-model="state.email"
          />
        </UFormGroup>

        <UButton type="submit" color="yellow" class="justify-center mt-10 w-full">
          Buscar Cuenta
        </UButton>
      </UForm>
      <UiLiinks/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast();
const schema = object({
  email: string().email('Invalid email').required('Required'),
 
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined
})
const userStore = useUserStore();


async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    await schema.validate(event.data, { abortEarly: false });

    const respuesta = await userStore.buscarCuenta(event.data);
    toast.add({title:respuesta, color:'yellow'});

    state.email = '';

  } catch (error) {
    // Captura y maneja los errores de validación
    console.error("Error de validación:", error);
  }
}
</script>

<style scoped></style>
