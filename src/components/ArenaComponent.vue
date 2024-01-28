<template>
    <div class="arena-background">
        <img :src="store.selectedArena.img" class="arenaImage" alt="Arena">
        <audio ref="audio" :src="store.selectedArena.audio" autoplay></audio>
        <div class="d-flex justify-content-between ">
            <div v-if="character1 && newItemsArray1.length > 0">
                <div class="d-flex align-items-center">
                    <div class="health-bar me-4">
                        <div class="life-points"
                            :class="{ 'highhealth': (percentageLife1 > 50), 'midhealth': (percentageLife1 <= 50 && percentageLife1 > 15), 'lowhealth': (percentageLife1 <= 15), 'd-none': (percentageLife1 <= 0) }"
                            :style="{ width: percentageLife1 + '%' }" ref="life1"></div>
                    </div>
                    <div class="life-percentage">
                        {{ percentageLife1 + '%' }}
                    </div>
                </div>

                <div class="characters-info">
                    <h1 class="name-container">{{ character1.name }}</h1>
                    <ul class="d-flex justify-content-start ">
                        <li v-for="item in newItemsArray1">
                            <img class="item-image" :src="store.imgUrl + item.image" :alt="item.name">
                        </li>
                    </ul>
                    <div class="img-container img-container1"
                        :class="{ 'img-container1-transition': cannotGenerate === true }">
                        <img :class="{ 'bounceInLeft': generating === true, 'flipped-image': character1.name === 'Lamberto Lasagna' }"
                            :src="store.imgUrl + character1.image" :alt="character1.name">
                    </div>

                </div>

                <button @click="toggleAudio()" class="audio-btn btn" >
                <i v-if="audioPlay" class="fa-solid fa-volume-high"></i>
                <i v-else class="fa-solid fa-volume-xmark"></i>
                </button>


            </div>

            <div v-if="character2 && newItemsArray2.length > 0">
                <div class="d-flex align-items-center">
                    <div class="life-percentage me-4">
                        {{ percentageLife2 + '%' }}
                    </div>
                    <div class="health-bar">
                        <div class="life-points" v-bind:style="{ width: percentageLife2 + '%' }"
                            :class="{ 'highhealth': (percentageLife2 > 50), 'midhealth': (percentageLife2 <= 50 && percentageLife2 > 15), 'lowhealth': (percentageLife2 <= 15), 'd-none': (percentageLife2 <= 0) }"
                            ref="life2"></div>
                    </div>
                </div>
                <div class="questionMark" v-if="questionMark === true">
                    <img src="/images/questionMark.gif" alt="question mark">
                </div>
                <div class="characters-info text-end " v-if="questionMark === false">

                    <h1 class="name-container">{{ character2.name }}</h1>


                    <ul class="d-flex justify-content-end ">
                        <li v-for="item in newItemsArray2" class="d-flex">
                            <img class="item-image" :src="store.imgUrl + item.image" :alt="item.name">
                        </li>
                    </ul>
                    <div class="img-container img-container2"
                        :class="{ 'img-container2-transition': cannotGenerate === true }">
                        <img class="bounceInRight" :class="{ 'flipped-image': character2.name !== 'Lamberto Lasagna' }"
                            :src="store.imgUrl + character2.image" :alt="character2.name">
                    </div>

                </div>

            </div>
        </div>

        <div v-if="winnerMessage" class="d-flex justify-content-center ">
            <h1 class=" display-1 text-center win-container"
                :class="{ 'win': (percentageLife2 <= 0), 'draw': (percentageLife2 <= 0 && percentageLife1 <= 0), 'lose': (percentageLife1 <= 0) }">
                {{ winnerMessage }}</h1>
        </div>

        <div class="buttons d-flex justify-content-center align-items-center"
            :class="{ 'd-none': buttonsViewed === false }">
            <button @click="generate(), generateItems()" :disabled="cannotGenerate === true"
                class="btn btn-danger me-3">Generate</button>
            <button :disabled="store.isFigthing === false" :class="{ 'btn-opacity': (store.isFigthing === false) }"
                @click="startFigthing()" class="btn btn-danger fight">Fight</button>
        </div>




    </div>
</template>

<script>
import axios from 'axios'
import { store } from '@/assets/data/store'
export default {
    name: "ArenaComponent",
    data() {
        return {
            store,
            character1: null,
            character2: null,
            newItemsArray1: [],
            newItemsArray2: [],
            finalDamage1: 0,
            finalDamage2: 0,
            simple_melee_weapons: {
                attack: 3,
                defence: 3
            },
            simple_ranged_weapons: {
                speed: 3
            },
            martial_melee_weapons: {
                attack: 7,
                defence: 7
            },
            martial_ranged_weapons: {
                speed: 7
            },
            net: {
                attack: 10,
                defence: 10,
                speed: 10
            },
            timer: '',
            winnerMessage: '',
            cannotGenerate: false,
            percentageLife1: 100,
            percentageLife2: 100,
            damageCalculation1: 0,
            damageCalculation2: 0,
            questionMark: true,
            generating: false,
            buttonsViewed: true,
            audioPlay: true

        }
    },
    methods: {
        getAllCharacters() {
            axios.get(this.store.apiUrl + 'characters').then((res) => {
                //console.log(res.data.results)
                this.store.characters = res.data.results
            })
        },
        getAllItems() {
            axios.get(this.store.apiUrl + 'items').then((res) => {
                // console.log(res.data)
                this.store.items = res.data.results
            })
        },
        generate() {
            this.generating = true
            this.questionMark = true
            this.percentageLife1 = 100;
            this.percentageLife2 = 100
            this.damageCalculation1 = 0
            this.damageCalculation2 = 0
            this.finalDamage1 = 0
            this.finalDamage2 = 0
            this.winnerMessage = '';
            setTimeout(() => {
                this.generating = false;
            }, 1000)
            let charactersCopyArray = JSON.parse(JSON.stringify(this.store.characters));
            console.log(charactersCopyArray)
            let newCharactersArray = [];
            newCharactersArray.push(charactersCopyArray[Math.floor(Math.random() * charactersCopyArray.length)])
            //console.log(newCharactersArray);
            let newCharacter = null;
            while (newCharactersArray.length < 2) {
                newCharacter = charactersCopyArray[Math.floor(Math.random() * charactersCopyArray.length)]
                if (!newCharactersArray.includes(newCharacter)) {
                    newCharactersArray.push(newCharacter);
                }
            }
            console.log(newCharactersArray)
            this.character1 = newCharactersArray[0];
            this.character2 = newCharactersArray[1];
        },
        generateItems() {
            this.newItemsArray1 = [];
            this.newItemsArray2 = [];
            for (let i = 0; i < 3; i++) {
                this.newItemsArray1.push(this.store.items[Math.floor(Math.random() * this.store.items.length)])
            }
            for (let i = 0; i < 3; i++) {
                this.newItemsArray2.push(this.store.items[Math.floor(Math.random() * this.store.items.length)])
            }
            console.log(this.newItemsArray1);
            console.log(this.newItemsArray2);
            this.store.isFigthing = true;
        },
        startFigthing() {
            this.buttonsViewed = false
            this.questionMark = false;
            this.cannotGenerate = true;
            this.store.isFigthing = false;
            let damageItem1 = 0
            let speedItem1 = 0
            let damageItem2 = 0
            let speedItem2 = 0
            for (let i = 0; i < this.newItemsArray1.length; i++) {
                if (this.newItemsArray1[i].name === "Net") {
                    damageItem1 = damageItem1 + this.net.attack + this.net.defence
                    speedItem1 = speedItem1 + this.net.speed
                } else if (this.newItemsArray1[i].category === "Simple Ranged Weapons") {
                    speedItem1 = speedItem1 + this.simple_ranged_weapons.speed
                } else if (this.newItemsArray1[i].category === "Martial Melee Weapons") {
                    damageItem1 = damageItem1 + this.martial_melee_weapons.attack + this.martial_melee_weapons.defence;
                } else if (this.newItemsArray1[i].category === "Martial Ranged Weapons") {
                    speedItem1 = speedItem1 + this.martial_ranged_weapons.speed
                }
                else if (this.newItemsArray1[i].category === "Simple Melee Weapons") {
                    damageItem1 = damageItem1 + this.simple_melee_weapons.attack + this.simple_melee_weapons.defence;
                }
            }
            // console.log(damageItem1);
            // console.log(speedItem1);
            for (let i = 0; i < this.newItemsArray2.length; i++) {
                if (this.newItemsArray2[i].name === "Net") {
                    damageItem2 = damageItem2 + this.net.attack + this.net.defence
                    speedItem2 = speedItem2 + this.net.speed
                } else if (this.newItemsArray2[i].category === "Simple Ranged Weapons") {
                    speedItem2 = speedItem2 + this.simple_ranged_weapons.speed
                } else if (this.newItemsArray2[i].category === "Martial Melee Weapons") {
                    damageItem2 = damageItem2 + this.martial_melee_weapons.attack + this.martial_melee_weapons.defence;
                } else if (this.newItemsArray2[i].category === "Martial Ranged Weapons") {
                    speedItem2 = speedItem2 + this.martial_ranged_weapons.speed
                }
                else if (this.newItemsArray2[i].category === "Simple Melee Weapons") {
                    damageItem2 = damageItem2 + this.simple_melee_weapons.attack + this.simple_melee_weapons.defence;
                }
            }
            // console.log(damageItem2);
            // console.log(speedItem2);
            this.finalDamage1 = (((this.character1.attack + this.character1.defence + damageItem1) / 2) * this.character1.speed + speedItem1) / 100
            this.finalDamage2 = (((this.character2.attack + this.character2.defence + damageItem2) / 2) * this.character2.speed + speedItem2) / 100
            console.log(this.finalDamage1);
            console.log(this.finalDamage2);
            // const maxLife1 = this.character1.life
            // const maxLife2 = this.character2.life
            this.timer = setInterval(this.figthTimer, 1000);

        },
        figthTimer() {
            this.damageCalculation2 += this.finalDamage2
            this.percentageLife1 = Math.trunc(((this.character1.life - this.damageCalculation2) / this.character1.life) * 100)
            this.damageCalculation1 += this.finalDamage1
            this.percentageLife2 = Math.trunc(((this.character2.life - this.damageCalculation1) / this.character2.life) * 100)
            // console.log(this.character1.life)
            // console.log(this.character2.life);
            console.log(this.percentageLife1)
            console.log(this.percentageLife2)
            if (this.percentageLife1 <= 0 || this.percentageLife2 <= 0) {
                this.stop();
                this.gamerWinner();
                this.cannotGenerate = false;
            }
        },
        stop() {
            clearInterval(this.timer)
        },
        gamerWinner() {
            this.buttonsViewed = true;
            if (this.percentageLife1 <= 0 && this.percentageLife2 <= 0) {
                this.winnerMessage = 'Draw'
                this.percentageLife1 = 0
                this.percentageLife2 = 0
            } else if (this.percentageLife1 > 0) {
                this.winnerMessage = this.character1.name + ' wins'
                this.percentageLife2 = 0
            } else if (this.percentageLife2 > 0) {
                this.winnerMessage = this.character2.name + ' wins'
                this.percentageLife1 = 0
            }
        },
        toggleAudio() {
            this.audioPlay = !this.audioPlay;
            const audioElement = this.$refs.audio;
            if (audioElement) {
                if (this.audioPlay) {
                    audioElement.play();
                } else {
                    audioElement.pause();
                }
            }
        }
    },
    created() {
        this.getAllCharacters();
        this.getAllItems();
        this.store.isFigthing = false;
    }
}
</script>

<style lang="scss" scoped>
.arena-background {
    font-family: "VT323", monospace;
    width: 100%;
    height: calc(100vh - 77px);
    position: relative;
    overflow: hidden;
    padding: 30px;

    .arenaImage {
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
}

.health-bar {
    width: 400px;
    border-radius: 30px;
    height: 20px;
    box-shadow: 1px 1px 10px;
    background-color: rgba(255, 255, 255, 0.363);
    margin-bottom: 15px;

    .life-points {
        height: 100%;
        border-radius: 30px;

    }

}

.highhealth {
    background-color: green;
}

.midhealth {
    background-color: yellow;
}

.lowhealth {
    background-color: red;
}

.buttons {
    position: absolute;
    bottom: 0;
    margin-bottom: 40px;
    width: 100%;

    .btn-danger {
        border: 2px solid #ccc;
        width: 200px;
        font-size: 30px;
        color: black;
        background-color: rgb(190, 190, 15) !important;
    }

    .btn-danger.fight {
        background-color: red !important;
    }

    .btn-opacity {
        opacity: 0.3;
    }
}

.characters-info {
    color: white;

    .img-container1 {
        position: absolute;
        bottom: -80px;
        left: 0;
        transition: all 1s ease-in-out;
        filter:drop-shadow(0px 0px 20px black);
    }

    .img-container1-transition {
        left: 300px;
    }

    .img-container2 {
        position: absolute;
        bottom: -80px;
        right: 30px;
        transition: all 1s ease-in-out;
        filter:drop-shadow(0px 0px 20px black);

    }

    .img-container2-transition {
        right: 350px;
    }



    img {
        width: 600px;
    }

    .name-container {
        background-color: rgba(0, 0, 0, 0.733);
        padding: 20px;
        display: inline-block;
        border-radius: 20px;
        margin-bottom: 25px;
    }

    ul {
        list-style: none;
        padding: 0 !important;
    }

    .item-image {
        width: 60px !important;
        height: 60px !important;
        border: 2px solid black;
        margin: 0 6px;
        background-color: white;
    }
}

.win {
    color: green;
}

.draw {
    color: yellow;
}

.lose {
    color: red;
}

.win-container {

    background-color: rgba(0, 0, 0, 0.733);
    padding: 20px;
    display: inline-block;
    border-radius: 20px;
    z-index: 2000;

}

.life-percentage {
    font-size: 40px;
    color: white;
    background-color: rgba(0, 0, 0, 0.733);
    padding: 5px;
    display: inline-block;
    border-radius: 50%;
    height:70px;
    width: 70px;
    text-align: center;
}

.right-character {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
}

.questionMark {
    height: 600px;
    filter:drop-shadow(0px 0px 20px black);

    img {
        height: 100%;
        width: 100%;
       
    }
}
.audio-btn {
        position: absolute;
        font-size: 2em;
        bottom: 50px;
        right:30px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.121);
        color: white;
        border-radius: 50%;
        z-index:1000;
        
        &:hover{
            color: red;
        }
        
    }

@keyframes bounceInLeft {

    from,
    60%,
    75%,
    90%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: translate3d(-3000px, 0, 0) scaleX(3);
    }

    60% {
        opacity: 1;
        transform: translate3d(25px, 0, 0) scaleX(1);
    }

    75% {
        transform: translate3d(-10px, 0, 0) scaleX(0.98);
    }

    90% {
        transform: translate3d(5px, 0, 0) scaleX(0.995);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

.bounceInLeft {
    animation-name: bounceInLeft;
    animation-duration: 1s;
}

@keyframes bounceInRight {

    from,
    60%,
    75%,
    90%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
        opacity: 0;
        transform: translate3d(3000px, 0, 0) scaleX(3);
    }

    60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0) scaleX(1);
    }

    75% {
        transform: translate3d(10px, 0, 0) scaleX(0.98);
    }

    90% {
        transform: translate3d(-5px, 0, 0) scaleX(0.995);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

.bounceInRight {
    animation-name: bounceInRight;
    animation-duration: 2s;
}

.flipped-image {
    transform: scaleX(-1);
}
</style>