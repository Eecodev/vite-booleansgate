<template>
    <div>
        <div class="container" v-if="slides">
            <div class="slider-wrapper" tabindex="0">

                <div class="item">
                    <img :src="slides[activeIndex].image" alt="">
                    <audio :src="slides[activeIndex].mp3" autoplay></audio>
                </div>

                <div class="thumbs">
                    <div class="thumb active" v-for="(slide, index) in slides" :key="index" @click="selectThumbnail(index)">
                        <img :src="slide.image" alt="">
                    </div>
                </div>

                <router-link :to="{ name: 'arena' }"><button class="btn btn-danger"
                        @click="storeArena()">Select</button></router-link>
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
                    image: '/images/Ascension.gif',
                    mp3: '/src/assets/audio/Dragon Ball Z - Cell Fight Music Theme.mp3'
                },
                {
                    id: 2,
                    image: '/images/CathedralRuins.gif',
                    mp3: '/src/assets/audio/GUILES THEME.mp3'
                },
                {
                    id: 3,
                    image: '/images/HackerRoom.gif',
                    mp3: '/src/assets/audio/Main Theme - Super Smash Bros Brawl.mp3'
                },
                {
                    id: 4,
                    image: '/images/LavaArena.gif',
                    mp3: '/src/assets/audio/Metal Gear Solid Main Theme.mp3'
                },
                {
                    id: 5,
                    image: '/images/Temple.gif',
                    mp3: '/src/assets/audio/Mortal Kombat Theme Song.mp3'
                },
                {
                    id: 6,
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
        float: left;
        width: 700px;
        height: 300px;
        position: relative;
    }

    .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item .text {
        position: absolute;
        right: 20px;
        bottom: 20px;
        text-align: right;
        color: white;
    }

    .thumbs {
        float: left;
        height: 300px;
        background: #000;
        position: relative;
    }

    .thumb {
        height: calc((300px) / 6);
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
    }

    .prev,
    .next {
        width: 20px;
        height: 20px;
        margin: 10px 0;
        border-radius: 50%;
        background: #ccc;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        cursor: pointer;
        z-index: 999;
    }

    .next {
        bottom: 0;
    }

    /*
        EXTRA: in questo esempio gli accordion vengono creati
        usando 2 bordi di un quadratino ruotato di 45 gradi
        In una versione base si possono usare delle icone
        oppure i caratteri ∧ (&and;) e ∨ (&or;)
        */
    .prev::after {
        content: '';
        width: 10px;
        height: 10px;
        border-top: 1px solid black;
        border-right: 1px solid black;
        display: block;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%) rotate(-45deg);
    }

    .next::before {
        content: '';
        width: 10px;
        height: 10px;
        border-top: 1px solid black;
        border-right: 1px solid black;
        display: block;
        position: absolute;
        bottom: 35%;
        left: 50%;
        transform: translate(-50%) rotate(135deg);
    }
}
</style>