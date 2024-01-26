<template>
    <main id="characters">
      <section class="container py-4 text-end">
        <!-- <router-link to="/admin/characters/create" class="btn btn-danger fs-5 my-3">Create new Character</router-link> -->

        <!-- <div v-if="message" class="d-flex justify-content-end">
          <div class="alert-delete">
            <div class="alert alert-success">{{ message }}</div>
          </div>
        </div> -->

        <h1 class="text-center display-3">Characters</h1>

        <div
          id="carouselExampleCaptions"
          class="carousel slide"

        >
          <div class="carousel-indicators">
            <button
              v-for="(character, index) in store.characters"
              :key="index"
              type="button"
              :data-bs-target="'#carouselExampleCaptions'"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
              :aria-current="index === 0 ? 'true' : 'false'"
              :aria-label="'Slide ' + (index + 1)"
            ></button>
          </div>

          <div class="carousel-inner">
            <div
              v-for="(character, index) in store.characters"
              :key="index"
              :class="{ 'carousel-item': true, active: index === 0 }"
            >
            <img :src="store.imgUrl + character.image"  class=" d-block  w-100"   :alt="character.name">

              <div
                class="carousel-caption d-none d-md-flex flex-column justify-content-between h-100"
              >
                <div>
                  <p class="my-3 fs-4 py-3 description-text">
                    {{ character.description }}
                  </p>
                </div>
                <div>
                  <h3 class="description-text">{{ character.name }}</h3>
                  <div class="d-flex justify-content-center">
                    <router-link
                      :to="{ name: 'character', params: { id: character.id } }"
                      class="btn btn-success mx-2"
                      >See details</router-link
                    >
                    <!-- <button @click="deleteCharacter(character.id, character.name)" class="cancel-button btn btn-danger mx-2">
                      <i class="fa-solid fa-trash"></i>
                    </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            :data-bs-target="'#carouselExampleCaptions'"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            :data-bs-target="'#carouselExampleCaptions'"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </main>
  </template>

  <script>
  import axios from "axios";
  import { store } from "../assets/data/store";

  export default {
    name: "CharactersViews",
    data() {
      return {
        store,
        currentPage: 1,
        message: null,
      };
    },
    methods: {
      getCharactersData() {
        axios.get(this.store.apiUrl + "characters").then((res) => {
          console.log(res.data);
          this.store.characters = res.data.results;

        });
      },
    //   changeNameImage(name) {
    //     let nomeFormat = name.replace(/\s+/g, "%20"); // Sostituisci spazi con trattini bassi
    //     let url = `http://[::1]:5173/storage/images/${nomeFormat}.gif`;
    //     return url;
    //   },
    
    },
    mounted() {
      this.getCharactersData();



      // Inizializza il carousel di Bootstrap
      // Assicurati di aver già incluso Bootstrap JS e jQuery nel tuo progetto
      $(document).ready(function () {
        // Inizializza il carousel quando il documento è pronto
        $("#carouselExampleCaptions").carousel();

        // Gestisci il clic sul pulsante precedente
        $(".carousel-control-prev").click(function () {
          $("#carouselExampleCaptions").carousel("prev");
        });

        // Gestisci il clic sul pulsante successivo
        $(".carousel-control-next").click(function () {
          $("#carouselExampleCaptions").carousel("next");
        });
      });
    },
  };
  </script>

  <style lang="scss" scoped>
  #characters {
    font-family: "VT323", monospace;
    background-image: url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: calc(100vh - 56px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .carousel-inner {
    height: 500px; 
    overflow: hidden;
      margin: 0;
    background-color: #374559;
    .carousel-item {
     
      height: 100%;
    }

    img {
      width: auto;
      height: 100%;
      object-fit: cover;
    }
  }
    .slide {
      width: 35%;
      margin: 0;
      margin: auto;
      border: 2px solid white;
      box-shadow: 0px 0px 186px 27px rgba(175, 242, 193, 0.59);
      border-radius: 20%;
      overflow: hidden;
    }

    .description-text {
      text-shadow: 3px 3px 10px black;
    }


    h1 {
      color: red;
    }

    .alert-delete {
      width: 20%;
      text-align: start;
    }
  }
  </style>