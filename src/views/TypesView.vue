<template>
  <div class="page">
    <div class="types-page">
      <div class="container">
        <h1>Lista Types</h1>
        <div class="row text-center">
          <div v-for="tipo in store.types" class="col-xl-3 col-lg-4 col-md-6 col-12 mt-5">
            <router-link :to="{ name: 'type', params: { id: tipo.id } }" class="btn "
               :type="tipo">
              <div class="card text-light" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title text-center">{{ tipo.name }}</h5>
                  <p class="card-text">{{ tipo.desc.substring(0, 80) + "..." }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../assets/data/store.js";
import axios from "axios";

export default {
  name: "TypesView",
  data() {
    return {
      store,
    };
  },
  methods: {
    getAllTypes() {
      axios
        .get(this.store.apiUrl + "types")
        .then((res) => {
          console.log("Response data:", res.data);
          this.store.types = res.data.results;
          console.log("Store types:", this.store.types);
        })
        .catch((err) => {
          console.error("Error fetching types:", err);
        });
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
  height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
h5{
  color: rgb(202, 167, 90);
  font-weight: bold;
}
.card{
  height: 150px;
  background-color: rgba(0, 0, 0, 0.579);
  box-shadow: 2px 2px 3px black;
}
</style>
