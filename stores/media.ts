import { defineStore } from 'pinia';

export const useMediaStore = defineStore('media', () => {
    const archivo = ref({})
    return {
        archivo
    }
})