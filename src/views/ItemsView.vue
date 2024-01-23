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
  data() {
    return {
      store,
    }
  },
  methods: {
    getItems() {
      axios.get(store.apiUrl + 'items')
        .catch(error => { throw error; })
        .then(response => {
          this.store.items = response.data.results;
          console.log(items);
        });
    }
  },
  created() {
    this.getItems();
  }
}
</script>

<style lang="scss" scoped></style>