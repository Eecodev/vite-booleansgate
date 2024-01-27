import { reactive } from 'vue';

export const store = reactive({
    apiUrl: 'http://localhost:8000/api/',
    imgUrl: 'http://localhost:8000/storage/',
    characters: [],
    items: [],
    types: [],
    isFighting: false,
    selectedArena: {
        img: "",
        audio: ""
    }
})
