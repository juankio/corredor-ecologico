import { usuario } from '../server/models/usuario.model';
<template>
  <div>
    <h1 class="text-end text-xl text-white font-bold m-3 pb-20">
      Bienvenidos a nuestra red corredor ecologico {{ user.users.name }}
    </h1>
    <BlogCard/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
  // middleware: 'auth'
});
const user = useUserStore();
const router = useRouter();
const nombre = ref(user.users);
console.log("nombre", nombre);

onMounted(() => {
  if (!user.token) {
    navigateTo("/");
  }
});
</script>

<style lang="scss" scoped></style>
