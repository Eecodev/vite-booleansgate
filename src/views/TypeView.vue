<template>
  <div class="type-page" :style="{ backgroundImage: `url(/images/backgrounds/${type.name}.png), url(/images/backgrounds/${type.name}.jpg), url(/images/backgrounds/${type.name}.jpeg)` }">

  <div class="type-page">
    <div class="container text-center py-5">
      <div v-if="type">
        <h1 class="py-3">{{ type.name }}</h1>
        <div class="desc-container">
          <p class="p-3 desc" ref="desc" @scroll="checkOverflow" v-html="formattedDescription"></p>
          <div v-if="showArrow" class="fa-solid arrow-down"></div>
          <div v-if="showDots" class="dots">...</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';

export default {
  name: 'TypeView',
  data() {
    return {
      store,
      type: null,
      showArrow: false,
      showDots: false,
    };
  },
  computed: {
    formattedDescription() {
      const md = new MarkdownIt();
      const html = md.render(this.type.desc);
      return html;
    },
  },
  methods: {
    getType() {
      axios.get(this.store.apiUrl + 'types/' + this.$route.params.id).then((res) => {
        console.log(res.data);
        this.type = res.data.results;
        this.checkOverflow();
      });
    },
    checkOverflow() {
      const descElement = this.$refs.desc;
      this.showArrow = descElement.scrollHeight > descElement.clientHeight;
      this.showDots = this.showArrow && descElement.scrollTop + descElement.clientHeight < descElement.scrollHeight;
    },
  },
  created() {
    this.getType();
  },
  watch: {
    type() {
      this.$nextTick(this.checkOverflow);
    },
  },
};
</script>

<style lang="scss" scoped>
.type-page {
  font-family: "VT323", monospace;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: -50px;
  height: calc(100vh - 77px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(202, 167, 90);
}
h1{
  font-weight: bolder;
  color: red;
}

.desc-container {
  position: relative;
}

.desc {
  width: 100%;
  max-height: calc(100vh - 300px);
  overflow: auto;
  text-align: justify;
  background-color: rgba(0, 0, 0, 0.579);
  box-shadow: 2px 2px 3px black;
  &::-webkit-scrollbar {
    width: 0;
  }

  h3 {
    font-size: 2rem;
    color: purple;
    font-weight: bold;
  }

  h4 {
    font-size: 1rem;
    color: red;
    margin-left: 1rem; // Aggiungi un margine sinistro di 1rem per la formattazione richiesta
  }
}

.arrow-down {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
  pointer-events: none;
  border-top-color: rgb(202, 167, 90);
  border-width: 8px;
}

.dots {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(202, 167, 90);
  font-size: 1.5em;
  pointer-events: none;
}


</style>
