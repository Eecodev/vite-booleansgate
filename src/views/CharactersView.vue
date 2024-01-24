<template>
    <div>
        <ul>
            <li v-for="character in  store.characters ">
                <router-link :to="{ name: 'character', params: { id: character.id } }" class="btn btn-primary"
                    :character="character">
                    <h2>{{ character.name }}</h2>
                </router-link>
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