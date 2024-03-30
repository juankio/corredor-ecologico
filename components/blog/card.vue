<template>
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Sección 1 -->
  <div class="flex flex-col space-y-4 p-4 bg-yellow-400 rounded-lg shadow-lg">
    <!-- Nombre de usuario -->
    <p class="text-lg font-semibold text-black">Usuario 1</p>

    <!-- Imagen -->
    <div class="h-32 w-full flex justify-center items-center">
      <img
        src="/images/uniminuto.webp"
        alt="Logo de Uniminuto"
        class="max-w-full max-h-full rounded-lg"
      />
    </div>

    <!-- Icono de comentario -->
    <div class="flex items-center justify-center w-12 h-12 rounded-full">
      <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="text-lg bg-black font-bold" />
    </div>
  </div>

  <!-- Sección 2 -->
  <div class="flex flex-col space-y-4 p-4 bg-yellow-400 rounded-lg shadow-lg">
    <!-- Nombre de usuario -->
    <p class="text-lg font-semibold text-black">Usuario 2</p>

    <!-- Imagen -->
    <div class="h-32 w-full flex justify-center items-center">
      <img
        src="/images/uniminuto.webp"
        alt="Imagen 2"
        class="max-w-full max-h-full rounded-lg"
      />
    </div>

    <!-- Icono de comentario -->
    <div class="flex items-center justify-center w-12 h-12 rounded-full">
      <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="text-lg bg-black font-bold" />
    </div>
  </div>

  <!-- Agrega más secciones según sea necesario -->
</div>




</template>
