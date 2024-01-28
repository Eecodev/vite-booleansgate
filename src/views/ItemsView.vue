<template>
  <div class="page">
    <div class="items-page d-flex">
      <div class="container">
        <h1>Items List</h1>
        <div class="mb-2 filter-macro-section">
          <button @click="toggleFilterButtons" class="filter-toggle-btn mb-2 ">Filter >></button>
          <div  class="filter-section mb-1">
            <div v-if="showFilterButtons" class="filter-buttons d-flex align-items-center">
              <h6 class="me-2 fw-bold fs-5">Categories:</h6>
              <button @click="selectCategory('all')">No filters</button>
              <button v-for="category in uniqueCategories" :key="category" @click="selectCategory(category)">{{ category }}</button>
            </div>
          </div>
        </div>
        <div class="row scroll-rule text-center" @scroll="checkOverflow">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="scroll-rule-container col-xl-3 col-lg-4 col-md-6 col-12 mt-5"
          >
            <router-link :to="{ name: 'item', params: { id: item.id } }" class="btn">
              <div class="card text-light" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title text-center py-2">{{ item.name }}</h5>
                  <div class="content">
                    <div class="card-img">
                      <img class="d-block" :src="store.imgUrl + item.image" :alt="item.name">
                    </div>
                    <p class="card-text" id="item-type">{{ item.type }}</p>
                    <p class="card-text">{{ item.category }}</p>
                  </div>
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
import { store } from '../assets/data/store';
import axios from 'axios';

export default {
  name: 'ItemsView',
  data() {
    return {
      store,
      currentPage: 1,
      selectedCategory: 'all',
      showFilterButtons: false,
    };
  },
  methods: {
    async getItems() {
      try {
        const response = await axios.get(store.apiUrl + 'items');
        this.store.items = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    checkOverflow() {
      const scrollRuleElement = this.$refs.scrollRule;
    },
    toggleFilterButtons() {
      this.showFilterButtons = !this.showFilterButtons;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.showFilterButtons = false; 
    },
  },
  computed: {
    uniqueCategories() {
      const categories = new Set();
      this.store.items.forEach(item => {
        categories.add(item.category);
      });
      return Array.from(categories);
    },
    filteredItems() {
      if (this.selectedCategory === 'all') {
        return this.store.items;
      } else {
        return this.store.items.filter(item => item.category === this.selectedCategory);
      }
    },
  },
  created() {
    this.getItems();
  },
  watch: {
    'store.items': {
      handler() {
        this.$nextTick(this.checkOverflow);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>

.container{
  position: relative;
}
h1 {
  text-align: center;
  color: red;
}

h5 {
  color: rgb(202, 167, 90);
}

#item-type {
  color: rgb(208, 104, 48);
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
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center;
  }
}

.card{
  height: 450px;
  position: relative;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.579);
  box-shadow: 2px 2px 3px black;
  .card-body{
    position: relative;
    height: 100%;
  }
}

.content{
  height: 100%;
  .card-img{
    position: relative;
    width: 100%;
    height: 75%;
    background-color: transparent;
    border-radius: 0;
  }
}

.scroll-rule-container {
  position: relative;
}

.scroll-rule {
  width: 100%;
  max-height: calc(100vh - 250px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.filter-macro-section{
  padding-bottom: 50px;
}
.filter-section{
  position: relative;
}
.filter-toggle-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.filter-buttons {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  background-color: transparent;
  border: 1px dashed white;
  // border-style: ;
  border-radius: 5px;
  padding: 10px;
  z-index: 1;
  button {
    margin: 5px;
    background-color: rgba(0, 0, 0, 0.121);
    color: white;
    box-shadow: 2px 2px 3px black;
    border: 1px transparent;
    &:hover{
      background-color: transparent;
      box-shadow: 2px 2px 3px black;
      color: rgb(208, 104, 48);
    }
  }
}
</style>
