<template>
  <div class="container-fluide">
    <NavBar />

    <ProfilUser />

    <Message />
  </div>
</template>

<script>
import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";
import Message from "../components/Message.vue";


// const axios = require("axios");

export default {
  name: "TCHAT",
  components: {
    ProfilUser,
    NavBar,
    Message,
   
  },

  mounted() {},
};
</script>

<style scoped>
.main {
  background-image: url("../assets/fond.jpg");
  background-size: cover;
}
</style>