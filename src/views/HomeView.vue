<template>
  <div>
    <h1>Choose your fight</h1>
    <CarouselComponent/>
  </div>
</template>

<script>
import CarouselComponent from '../components/CarouselComponent.vue';

  export default {
    name: 'HomeView',
    components: {
      CarouselComponent
    },
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>