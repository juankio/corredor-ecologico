<template>
  <div class="flex flex-col-reverse md:flex-row h-screen">
    <!-- Contenido en la parte inferior para dispositivos móviles y a la izquierda para escritorio -->
    <div class="w-full md:w-1/3">
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <!-- Aquí colocas tus notificaciones o cualquier otro contenido -->
        <UNotifications color="yellow" :id="2" :timeout="600" />
        <slot />
      </div>
    </div>
    <!-- Imagen en la parte superior para dispositivos móviles y a la derecha para escritorio -->
    <div class="w-full h-80 md:h-full bg-cover bg-app md:w-2/3"></div>
  </div>
</template>
