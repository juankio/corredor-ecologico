<template>
  <div>hola</div>
</template>

<script setup>
    definePageMeta({
    layout: 'custom',
})
const user = useUserStore();
const router = useRouter();
onMounted(() => {
  user.checkJWT()
  console.log(user.isLoggedIn)
  if (!user.isLoggedIn) {
    navigateTo('/');
  }
});

</script>

<style lang="scss" scoped></style>
