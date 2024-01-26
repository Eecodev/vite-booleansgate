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

                
                <button class="btn btn-danger my-btn" @click="storeArena()"><router-link :to="{name: 'arena'}">Select Arena</router-link></button>


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


    .container{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .item {
            width: 100vw;
            height: calc(100vh - 80px);
           
        }

        .item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .item .text {
            right: 20px;
            bottom: 20px;
            text-align: right;
            color: white;
        }

        .thumbs {
            float: left;
            height: 300px;
            background: #000;
            top: 80px;
            left: 50px;
            position: absolute;
        }
        .my-btn{
            position: absolute;
            bottom: 37%;
            left: 5.5%;
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
}
</style>