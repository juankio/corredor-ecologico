<template>
    <div>
        <div  v-if="$route.name === 'comentarios-comentario'">
            <h1 class="text-white">comentarios</h1>
            <UAccordion
    color="yellow"
    variant="outline"
    size="sm"
    :items="[{ label: '1. What is Nuxt UI?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '2. Getting Started', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '3. Theming', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '4. Components', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]"
  />
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