<template>
    <div>
        <div class="container" v-if="slides">
            <div class="slider-wrapper" tabindex="0">

                <div class="item">
                    <img :src="slides[activeIndex].image" alt="">
                    <audio :src="slides[activeIndex].mp3"></audio>
                </div>

                <div class="thumbs">
                    <div class="thumb active" v-for="(slide, index) in slides" :key="index" @click="selectThumbnail(index)">
                        <img :src="slide.image" alt="">
                    </div>
                </div>
                
                <button class="btn btn-danger my-btn" @click="storeArena()"><router-link :to="{name: 'arena'}">Select Arena</router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
import {store} from "../assets/data/store"
    export default {
        name: 'CarouselComponent',
        data(){
            return{
                slides: [
                    {
                        id: 1,
                        image: '/public/images/Ascension.gif',
                        mp3: '/src/assets/audio/Dragon Ball Z - Cell Fight Music Theme.mp3'
                    },
                    {
                        id: 2,
                        image: '/public/images/Cathedral Ruins.gif',
                        mp3: '/src/assets/audio/GUILES THEME.mp3'
                    },
                    {
                        id: 3,
                        image: '/public/images/Hacker Room.gif',
                        mp3: '/src/assets/audio/Main Theme - Super Smash Bros Brawl.mp3'
                    },
                    {
                        id: 4,
                        image: '/public/images/Lava Arena.gif',
                        mp3: '/src/assets/audio/Metal Gear Solid Main Theme.mp3'
                    },
                    {
                        id: 5,
                        image: '/public/images/Temple.gif',
                        mp3: '/src/assets/audio/Mortal Kombat Theme Song.mp3'
                    },
                    {
                        id: 6,
                        image: '/public/images/Waterfall Sight.gif',
                        mp3: '/src/assets/audio/Street Fighter II Ken Theme Original.mp3'
                    },

                ],
                activeIndex: 0,
                store
          
            }
        },
        methods: {
            selectThumbnail(index){
                this.activeIndex = index;
            },
            storeArena(){
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