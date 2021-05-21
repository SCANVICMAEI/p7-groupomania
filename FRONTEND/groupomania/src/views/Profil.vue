<template>
  <div class="container-fluide">
    <NavBar />

    <ProfilUser />
  </div>
</template>

<script>
import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "Profil",
  components: { 
    NavBar,
    ProfilUser
  },

  mounted() {},
};
</script>

<style scoped>

</style>