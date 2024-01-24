<template>
    <h1 v-if="character">{{ character.name }}</h1>
</template>

<script>
import axios from 'axios'
import { store } from '../assets/data/store'
export default {
    name: "CharacterView",
    data() {
        return {
            store,
            character: null

        }
    },
    methods: {
        getCharacter() {
            axios.get(this.store.apiUrl + 'characters/' + this.$route.params.id).then((res) => {
                console.log(res.data);
                this.character = res.data.results
            })
        }
    },
    created() {
        this.getCharacter();
    }
}
</script>

<style lang="scss" scoped></style>