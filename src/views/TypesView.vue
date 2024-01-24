<template>
  <h1>lista Types</h1>
  <div class="d-flex flex-wrap">
    <div v-for="tipo in store.types">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">{{ tipo.name }}</h5>
          <p class="card-text">{{ tipo.desc.substring(0, 80) + "..." }}</p>
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
/* Stili CSS specifici per il componente */
</style>
