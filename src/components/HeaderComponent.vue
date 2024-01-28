<template>
  <nav class="navbar navbar-expand-lg my-nav">
    <div class="container-fluid">
      <div>
        <a class="navbar-brand" href="#" id="logo">BooleansGate</a>
      </div>

      <div class="">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item" v-for="item in menu" :key="item.name">
            <router-link
              class="nav-link text-white mx-3"
              active-class="active"
              :to="{ name: item.name }"
              >{{ item.label }}</router-link
            >
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      menu: [
        {
          label: "Arena",
          name: "home",
        },
        {
          label: "Characters",
          name: "characters",
        },
        {
          label: "Types",
          name: "types",
        },
        {
          label: "Items",
          name: "items",
        },
        {
          label: "About Us",
          name: "about",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.my-nav {
  background-image: linear-gradient(#0d1122, #142c26);
  font-family: "VT323", monospace;
  font-size: 30px;
}

#logo {
  text-shadow: 2px 5px 6px rgba(0, 0, 0, 0.5);
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  color: red;
  padding: 0 30px;
}
</style>
