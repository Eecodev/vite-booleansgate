<template>
  <main id="team">
    <div class="container">
      <h1 class="text-center py-4 display-2">Our Team</h1>
      <div class="row g-4">
        <div class="col-md-4" v-for="item in cardData" :key="item.id">
          <div class="card">
            <img :src="item.imageUrl" class="card-img-top" alt="Card Image" />
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      cardData: [
        {
          id: 1,
          name: "Card 1",
          imageUrl: "url-to-image-1.jpg",
          description: "Lorem ipsum dolor sit amet,.",
        },
        {
          id: 2,
          name: "Card 2",
          imageUrl: "url-to-image-2.jpg",
          description: "Sed do eiusmod tempor incididunt",
        },
        {
          id: 3,
          name: "Card 3",
          imageUrl: "url-to-image-3.jpg",
          description: "Ut enim ad minim veniam, quis nostru",
        },
        {
          id: 4,
          name: "Card 4",
          imageUrl: "url-to-image-4.jpg",
          description: "Duis aute irure dolor in ",
        },
        {
          id: 5,
          name: "Card 5",
          imageUrl: "url-to-image-5.jpg",
          description: "Excepteur sint occaecat .",
        },
        {
          id: 6,
          name: "Card 6",
          imageUrl: "url-to-image-6.jpg",
          description: "Nemo enim ipsam voluptatem nesciunt.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#team {
  h1 {
    color: red;
  }
  font-family: "VT323", monospace;
  background-image: url("https://img.itch.zone/aW1hZ2UvMTIxNjU4LzU2MDM4MS5wbmc=/315x250%23c/yrkGs9.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vh - 77px);
  width: 100%;
}
</style>
