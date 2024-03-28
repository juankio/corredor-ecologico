<template>
  <div class="flex h-screen">
    <div class="md:w-1/3 min-h-full ">
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <UNotifications color="yellow" :id="2"  :timeout="600"/>
        <slot />
      </div>
    </div>
    <div class="h-64 md:h-auto bg-cover bg-center object-center md:w-2/3 bg-app"></div>
  </div>
 
</template>
