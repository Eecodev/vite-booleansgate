<template>
    <div class="arena-background">
        <img :src="store.selectedArena.img" class="arenaImage" alt="Arena">
        <audio :src="store.selectedArena.audio" autoplay></audio>
        <div v-if="character1 && newItemsArray1.length > 0">
            <div class="health-bar">
                <div class="life-points"
                    :class="{ 'highhealth': (percentageLife1 > 50), 'midhealth': (percentageLife1 <= 50 && percentageLife1 > 15), 'lowhealth': (percentageLife1 <= 15), 'd-none': (percentageLife1 <= 0) }"
                    :style="{ width: percentageLife1 + '%' }" ref="life1"></div>
            </div>
            <h1>{{ character1.name }}</h1>
            <ul>
                <li v-for="item in newItemsArray1"> 
                    {{ item.name }}
                </li>
            </ul>

        </div>

        <div v-if="character2 && newItemsArray2.length > 0">
            <div class="health-bar">
                <div class="life-points" v-bind:style="{ width: percentageLife2 + '%' }"
                    :class="{ 'highhealth': (percentageLife2 > 50), 'midhealth': (percentageLife2 <= 50 && percentageLife2 > 15), 'lowhealth': (percentageLife2 <= 15), 'd-none': (percentageLife2 <= 0) }"
                    ref="life2"></div>
            </div>
            <h1>{{ character2.name }}</h1>
            <ul>
                <li v-for="item in newItemsArray2">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div v-if="winnerMessage">
            <h1>{{ winnerMessage }}</h1>
        </div>

        <button @click="generate(), generateItems()" :disabled="cannotGenerate === true"
            class="btn btn-info">Generate</button>
        <button :disabled="store.isFigthing === false" @click="startFigthing()" class="btn btn-danger">Fight</button>
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
            damageCalculation2: 0

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
            this.percentageLife1 = 100;
            this.percentageLife2 = 100
            this.damageCalculation1 = 0
            this.damageCalculation2 = 0
            this.finalDamage1 = 0
            this.finalDamage2 = 0
            this.winnerMessage = '';
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
            this.percentageLife1 = (((this.character1.life - this.damageCalculation2) / this.character1.life) * 100)
            this.damageCalculation1 += this.finalDamage1
            this.percentageLife2 = (((this.character2.life - this.damageCalculation1) / this.character2.life) * 100)
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
            if (this.percentageLife1 <= 0 && this.percentageLife2 <= 0) {
                this.winnerMessage = 'Pareggio'
            } else if (this.percentageLife1 > 0) {
                this.winnerMessage = this.character1.name + ' ha vinto'
            } else if (this.percentageLife2 > 0) {
                this.winnerMessage = this.character2.name + ' ha vinto'
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
    width: 100%;
    height: calc(100vh - 56px);
    position: relative;
    overflow: hidden;

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
    width: 300px;
    border-radius: 30px;
    height: 20px;
    box-shadow: 1px 1px 10px;

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
</style>