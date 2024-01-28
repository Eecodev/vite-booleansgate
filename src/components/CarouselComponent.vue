<template>
    <div class="container" v-if="slides">
        <div tabindex="0">

            <div class="item">
                <img :src="slides[activeIndex].image" alt="">
                <audio :src="slides[activeIndex].mp3" autoplay></audio>
            </div>

            <div v-if="slides" class="arena-name">
                <h1 class="display-1">{{ slides[activeIndex].name }}</h1>
            </div>


            <div class="thumbs d-flex flex-column">
                <div class="thumb" v-for="(slide, index) in slides" :key="index"
                    :class="{ 'active': index === activeIndex }" @click="selectThumbnail(index)">
                    <img :src="slide.image" alt="">
                </div>
            </div>

            <div class="my-btn">
                <router-link :to="{ name: 'arena' }"><button class="btn btn-danger " @click="storeArena()">Select
                        Arena</button></router-link>
            </div>

        </div>
    </div>
</template>

<script>
import { store } from "../assets/data/store"
export default {
    name: 'CarouselComponent',
    data() {
        return {
            slides: [
                {
                    id: 1,
                    name: 'Ascension',
                    image: '/images/Ascension.gif',
                    mp3: '/src/assets/audio/Dragon Ball Z - Cell Fight Music Theme.mp3'
                },
                {
                    id: 2,
                    name: 'Cathedral Ruins',
                    image: '/images/CathedralRuins.gif',
                    mp3: '/src/assets/audio/GUILES THEME.mp3'
                },
                {
                    id: 3,
                    name: 'Hacker Room',
                    image: '/images/HackerRoom.gif',
                    mp3: '/src/assets/audio/Main Theme - Super Smash Bros Brawl.mp3'
                },
                {
                    id: 4,
                    name: 'Lava Arena',
                    image: '/images/LavaArena.gif',
                    mp3: '/src/assets/audio/Metal Gear Solid Main Theme.mp3'
                },
                {
                    id: 5,
                    name: 'Temple',
                    image: '/images/Temple.gif',
                    mp3: '/src/assets/audio/Mortal Kombat Theme Song.mp3'
                },
                {
                    id: 6,
                    name: 'Waterfall Sight',
                    image: '/images/WaterfallSight.gif',
                    mp3: '/src/assets/audio/Street Fighter II Ken Theme Original.mp3'
                },
            ],
            activeIndex: 0,
            store

        }
    },
    methods: {
        selectThumbnail(index) {
            this.activeIndex = index;
        },
        storeArena() {
            this.store.selectedArena.img = this.slides[this.activeIndex].image;
            this.store.selectedArena.audio = this.slides[this.activeIndex].mp3;
            console.log(this.store.selectedArena.img);
            console.log(this.store.selectedArena.audio);
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.container {
    font-family: "VT323", monospace;
    //height: 100vh;
    height: calc(100vh - 77px);
    display: flex;
    justify-content: center;
    align-items: center;

    .arena-name{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        text-shadow: 8px 8px 8px black;
    }


    .item {
        width: 100vw;
        height: calc(100vh - 77px);
        position: relative;

    }

    .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .thumbs {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px;
        flex-direction: row;
        cursor: pointer;
        border: 2px solid #ccc;
        position: absolute;
        bottom: 70px;
        left: 0;
    }

    .thumb {
        height: calc((500px) / 6);
        width: 100%;
        opacity: 0.5;
    }

    .thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .thumb.active {
        border: 2px solid #ccc;
        opacity: 1;
        scale: 1.1;
    }

    .my-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 20px;

    }

    .btn-danger {
        border: 2px solid #ccc;
        width: 200px;
        font-size: 30px;
        color: black;
        background-color: rgb(190, 190, 15) !important;
    }
}
</style>