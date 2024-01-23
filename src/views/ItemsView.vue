<template>
  <ul>
    <li v-for="item in store.items">
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import { store } from '../assets/data/store';
import axios from 'axios';
export default {
  name: "ItemsView",
  data() {
    return {
      store,
    }
  },
  methods: {
    getItems() {
      axios.get(store.apiUrl + 'items')
        .then((response) => {
          this.store.items = response.data.results;
          console.log(this.store.items);
        }).catch(error => { throw error; });
    }
  },
  created() {
    this.getItems();
  }
}
</script>

<style lang="scss" scoped></style>