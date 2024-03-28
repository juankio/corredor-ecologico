<script setup>
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-64 h-full ">
      <UiMenuLeft />
    </div>
    <main class="ml-72 p-8">
      <slot></slot>
      <UNotifications />
    </main>
  </div>
</template>
