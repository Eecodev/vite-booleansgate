<template>
  <div class="item-page">
    <div class="container text-center ">
      <div v-if="item">
        <div class="card text-white">
          <h1 class="py-3 card-title">{{ item.name }}</h1>
        <div class="card-img">
          <img class="d-block" :src="store.imgUrl + item.image" :alt="item.name">
        </div>
        <div class="card-body">
          <div class="row m-0 p-1">
            <div class="col-12">
              <h6  class="py-3 rounded-top-2">DESCRIPTION</h6>
              <div class="py-2 item-info">
                {{ item.description }}
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex">
                <div class="col-6">
                  <h6  class="py-3">CATEGORY</h6>
                  <div class="py-2 item-info">{{ item.category }}</div>
                </div>
                <div class="col-6">
                  <h6  class="py-3">TYPE</h6>
                  <div class="py-2 item-info">{{ item.type }}</div>
                </div>
              </div>
              <div class="d-flex">
              <div class="col-6">
                <h6 class="py-3">WEIGHT</h6>
                <div class="py-2 item-info">{{ item.weight }}</div>
              </div>
              <div class="col-6">
                <h6 class="py-3">COST</h6>
                <div class="py-2 item-info">{{ item.cost }}</div>
              </div>
            </div>
          </div>
        
        </div>
        </div>
        </div>
      </div>
    </div>
  </div>

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
      axios.get(this.store.apiUrl + 'items/' + this.$route.params.id).then((res) => {
        console.log(res.data);
        this.item = res.data.results;
      });
    }
  },
  created() {
    this.getItem();
  }
}
</script>

<style lang="scss" scoped>

.item-page {
  font-family: "VT323", monospace;
  background-image: url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 77px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .card{
    background-color: rgba(0, 0, 0, 0.579);
  box-shadow: 2px 2px 3px black;
  }
  .card-title{
    color: red;
  }
  .card-img{
    position: relative;
    height: 300px;
    background-color: transparent;
    border-radius: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  h6{
    width: 100%;
    background-color: rgb(202, 167, 90);
    color: #212529;
    margin: 0;
    font-weight: 600;
  }
  .row{
    padding: 0;

  }
.item-info{
  border: 2px solid rgb(202, 167, 90);
  border-top: none;
}
  
}

</style>