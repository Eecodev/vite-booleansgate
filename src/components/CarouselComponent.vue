<template>
    <div>
        <div class="container">
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
                <button class="btn btn-danger">Select</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CarouselComponent',
        data(){
            return{
                slides: [
                    {
                        image: '/public/images/Ascension.gif',
                        mp3: '/src/assets/audio/Dragon Ball Z - Cell Fight Music Theme.mp3'
                    },
                    {
                        image: '/public/images/Cathedral Ruins.gif',
                        mp3: '/src/assets/audio/GUILES THEME.mp3'
                    },
                    {
                        image: '/public/images/Hacker Room.gif',
                        mp3: '/src/assets/audio/Main Theme - Super Smash Bros Brawl.mp3'
                    },
                    {
                        image: '/public/images/Lava Arena.gif',
                        mp3: '/src/assets/audio/Metal Gear Solid Main Theme.mp3'
                    },
                    {
                        image: '/public/images/Temple.gif',
                        mp3: '/src/assets/audio/Mortal Kombat Theme Song.mp3'
                    },
                    {
                        image: '/public/images/Waterfall Sight.gif',
                        mp3: '/src/assets/audio/Street Fighter II Ken Theme Original.mp3'
                    },

                ],
                activeIndex: 0
            }
        },
        methods: {
            next(){
                if (this.activeIndex < this.slides.lenght -1){
                    this.activeIndex ++
                } else {
                    this.activeIndex = 0
                }
            },
            prev(){
                if (this.activeIndex === 0){
                    this.activeIndex = this.slides.lenght
                } else {
                    this.activeindex--
                }
            },
            selectThumbnail(index){
                this.activeIndex = index;
            }
        },
        mounted() {
            this.next();
            this.prev();
        }
    }
</script>

<style lang="scss" scoped>

    .container{
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

        .prev, .next {
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