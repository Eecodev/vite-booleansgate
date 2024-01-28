<template>
  <div class="page">
    <div class="container">
       <h1 class="text-center py-2 display-5">Our Team</h1> 
      <div class="row row-cols-1 row-cols-md-3 g-4 px-5">
        <div class="col d-flex justify-content-center" v-for="item in cardData" :key="item.id">
          <div class="card">
            <img :src="item.imageUrl" class="card-img-top" alt="Card Image" />
            <div class="card-body">
              <h5 class="card-title text-center my-0 py-0 ">{{ item.name }}</h5>
              <p class="card-text text-center">{{ item.description }}</p>
          </div>
        </div>
      </div>
      </div>
      <p class="text-center fs-4 text-white mt-4 ">You can find us on <a href="https://github.com/Eecodev/vite-booleansgate" class="text-white" ><i class="fa-brands fa-github"></i></a></p>
      <p class="text-center text-white">
        Booleansgate &copy; 2024 . All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      cardData: [
        {
          id: 1,
          name: "Giorgio Bolzoni",
          imageUrl: "/images/giorgio.png",
          description: "aka Aquapanz",
        },
        {
          id: 2,
          name: "Matteo Bonelli",
          imageUrl: "/images/matte.jpg",
          description: "aka Orazio's enjoyer",
        },
        {
          id: 3,
          name: "Giulia Mariano",
          imageUrl: "/images/giulia.jpg",
          description: "aka Goddess of Gifs",
        },
        {
          id: 4,
          name: "Leonardo Mastrangelo",
          imageUrl: "/images/leo.jpg",
          description: "aka Albano",
        },
        {
          id: 5,
          name: "Giovanni Megliola",
          imageUrl: "/images/giova.png",
          description: "aka a human born 15926535 s after 3/14"
        },
        {
          id: 6,
          name: "Mahdi Nasser",
          imageUrl: "images/mahdi.png",
          description: "aka MadNess ",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  font-family: "VT323", monospace;
  background-image: url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  width: 100%;
  height: calc(100vh - 77px);
  
  h1 {
    color: red;
    text-shadow: 8px 8px 8px black;
  }
  .fa-brands.fa-github {
    transition: all 0.3s ease-in-out;
  }
  .fa-brands.fa-github:hover {
    scale: 1.2;
  }

  .card{
    height: 265px;
    width:250px;
    background-color: rgba(0, 0, 0, 0.579);
    box-shadow: 2px 2px 3px black;
    border-radius: 25px;
  }

  .card-title{
    color: white;
    font-size: 1.5em;
  }

  .card-text{
    color:white;
    font-size: 1em;
  }

  .card-img{
    width: 100%;
    height: 50%;
  }

  img{
    max-height: 170px;
  }

  .card:hover{
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
}
</style>
