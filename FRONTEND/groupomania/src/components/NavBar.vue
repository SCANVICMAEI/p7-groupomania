<template>
  <div class="NavBar ">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <!-- LOGO -->
      <img
        class="navbar-brand"
        src="..\assets\icon-left-font-monochrome-white.png"
        width="150"
        height="150"
      />

      <!-- NAVIGATEUR  -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/Profil" tag="button" class="nav-link"
            >Mon Profil</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/" tag="button" class="nav-link" @click="logout"
            >Déconnexion</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

navbar {
  width: 100%;
}
</style>