<template>
  <h1 v-if="item">
    {{ item.name }}
  </h1>
</template>

<script>
import { store } from '../assets/data/store.js';
import axios from 'axios';
export default {
  name: 'ItemView',
  data() {
    return {
      store,
      item: null,
    }
  },
  methods: {
    getItem() {
      axios.get(store.apiUrl + '/items/' + this.$route.params.id).then(response => {
        this.item = response.data.results;
      });
    }
  },
  created() {
    this.getItem();
  }
}
</script>

<style lang="scss" scoped></style>