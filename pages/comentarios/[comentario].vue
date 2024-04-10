<template>
    <div>
        <div  v-if="$route.name === 'comentarios-comentario'">
            <h1 class="text-white">comentarios</h1>
        </div>
        <div v-else>
        <NuxtPage/>
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: "custom",
});
const route = useRoute();
 
</script>

<style lang="scss" scoped>

</style>