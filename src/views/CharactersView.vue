<template>
    <div>
        <ul>
            <li v-for="character in store.characters">
                <h2>{{ character.name }}</h2>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import { store } from '../assets/data/store';
export default {
    name: "CharactersViews",
    data() {
        return {
            store,
            currentPage: 1,
        }
    },
    methods: {
        getCharactersData() {
            axios.get(this.store.apiUrl + "characters").then((res) => {
                console.log(res.data);
                this.store.characters = res.data.results
            })
        }
    },
    mounted() {
        this.getCharactersData();
    }
}
</script>

<style lang="scss" scoped></style>