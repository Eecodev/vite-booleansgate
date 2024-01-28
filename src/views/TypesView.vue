<template>
  <div class="page">
    <div class="types-page">
      <div class="container">
        <h1>Lista Types</h1>
        <div class="row text-center overflow-auto" @scroll="checkOverflow">
          <div v-for="tipo in store.types" class="col-xl-3 col-lg-4 col-md-6 col-12 mt-5">
            <router-link :to="{ name: 'type', params: { id: tipo.id } }" class="btn "
               :type="tipo">
              <div class="card text-light" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title text-center">{{ tipo.name }}</h5>
                  <img
                  :src="`/images/types/${tipo.name}.gif`"
                  class="card-img img-types d-block w-100"
                  :alt="tipo.name"
                  />
                  <p class="card-text">{{ tipo.desc.substring(0, 80) + "..." }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="showArrow" class="fa-solid arrow-down"></div>
          <div v-if="showDots" class="dots">...</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../assets/data/store.js";

export default {
  name: "TypesView",
  data() {
    return {
      store,
      showArrow: false,
      showDots: false,
    };
  },
  methods: {
    getAllTypes() {
      axios
        .get(this.store.apiUrl + "types")
        .then((res) => {
          console.log("Response data:", res.data);

          // Rimuovi i segni ### dal testo della descrizione
          res.data.results.forEach((type) => {
            type.desc = type.desc.replace(/###/g, '');
          });

          this.store.types = res.data.results;
          console.log("Store types:", this.store.types);
        })
        .catch((err) => {
          console.error("Error fetching types:", err);
        });
    },
    checkOverflow() {
      const pageElement = this.$el;
      this.showArrow = pageElement.scrollHeight > pageElement.clientHeight;
      this.showDots = this.showArrow && pageElement.scrollTop + pageElement.clientHeight < pageElement.scrollHeight;
    },
  },
  created() {
    this.getAllTypes();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  color: red;
  font-weight:bolder;
}

.page {
  font-family: "VT323", monospace;
  background-image: url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 77px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
h5{
  color: rgb(202, 167, 90);
  font-weight: bold;
}
.row{
  height: 700px;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.card{
  background-color: rgba(0, 0, 0, 0.579);
  box-shadow: 2px 2px 3px black;
  height: 400px;
  .card-body{
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  }
}
</style>
