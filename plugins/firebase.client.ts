import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

export default defineNuxtPlugin((first) => {

    const firebaseConfig = {
        apiKey: "AIzaSyCcSICwBsingx55mDqfB8RGwtagV7bgvvQ",
        authDomain: "corredor-ecologico.firebaseapp.com",
        projectId: "corredor-ecologico",
        storageBucket: "corredor-ecologico.appspot.com",
        messagingSenderId: "906128277614",
        appId: "1:906128277614:web:4452297a0cb065ab75e67f"
    };

    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    return {
        provide: {
            storage
        }
    }
})