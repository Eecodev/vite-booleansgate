<template>
    <main id="characters-show">
        <section class="container" id="characters_index">
            <div class="row py-5">
                <div class="col-4">
                    <h1 v-if="character" class="text-center display-3">{{ character.name }}</h1>
                    <img :src="store.imgUrl + character.image" class="w-100" :alt="character.name">
                </div>
                <div class="col d-flex flex-column justify-content-center">
                    <p class="text-light fs-3 mx-5">description: <br> {{ character.description }}</p>

                    <div class="d-flex fs-5 w-100 mx-5">
                        <span>Type: {{ character.type ? character.type.name : 'Unknown' }}</span>
                        <span>Attack: {{ character.attack }}</span>
                        <span>Defence: {{ character.defence }}</span>
                        <span>Speed: {{ character.speed }}</span>
                        <span>Life: {{ character.life }}</span>
                    </div>

                    <div class="d-flex mx-5 mt-3">
                        <div v-for="item in character.items" :key="item.id" class="badge rounded-pill items-color me-2">{{
                            item.name }}</div>
                    </div>

                    <!-- <div class="d-flex mx-5">
            <router-link :to="{ name: 'characters-edit', params: { id: character.id } }" class="btn btn-light fs-5 my-3">modifica</router-link>

            <button @click="deleteCharacter" class="cancel-button btn btn-danger fs-5 my-3 mx-2 py-2 px-3" :data-item-title="character.name">cancella</button>
          </div> -->
                </div>
            </div>
        </section>
    </main>
    <!-- <h1 v-if="character">{{ character.name }}</h1>
    <img :src="store.imgUrl + character.image" :alt="character.name"> -->
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

<style lang="scss" scoped>
#characters-show {
    font-family: 'VT323', monospace;
    background-image: url('https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: calc(100vh - 56px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    main {
        height: 100%;
    }

    div {
        span {
            padding: 10px;
            background-color: red;
            color: white;
            margin-right: 10px;
            border-radius: 20px;
            box-shadow: 0px 0px 120px 5px white;
        }
    }

    h1 {
        color: red;
        text-shadow: 3px 3px 10px black;
    }

    img {
        border: 2px solid white;
        box-shadow: 0px 0px 186px 2px rgba(175, 242, 193, 0.59);
        border-radius: 20%;
    }

    p {
        text-shadow: 3px 3px 10px black;
    }

    .badge.rounded-pill {
        font-size: 20px;
    }

    .items-color {
        background-color: rgb(14, 83, 14) !important;
    }
}
</style>