<template>
  <!-- <div class="container-fluide">
    <NavBar />

    <ProfilUser />
 
    <Message />
    </div> -->

<div class="container-fluide">
  
  <div class="container-fluide">
   <NavBar /> 
  </div>

  
    <!-- <div class="container-fluide">
    <img class="img bandeau" src="../assets/fond.jpg"  alt="bandeau" >
    </div> -->
 
  <div class="container-fluide row ">
    <div class="col-3 Profil">
      <ProfilUser />
    </div>

    <div class="col">
     <Message />
    </div>
  </div>

</div>

</template>

<script>
import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";
import Message from "../components/Message.vue";
import Comment from "../components/Comment.vue";

// const axios = require("axios");

export default {
  name: "TCHAT",
  components: {
    ProfilUser,
    NavBar,
    Message,
    Comment,
  },
  mounted() {},
};
</script>

<style scoped>
/* .main {
  background-image: url("../assets/fond.jpg");
  background-size: cover;
} */

/* .bandeau{
  width: 100%;
  height: 10rem;
  object-fit: cover;
} */

.Profil{
  padding-left:3rem ;
  padding-top: 4rem;
  background-image: url("../assets/fond.jpg");
  background-repeat: repeat;
} 

    /* background-image: url("../assets/fond.jpg"); */
  /* background-size: cover; */
  /* object-fit: cover;
  background-color: brown; */
 


</style>