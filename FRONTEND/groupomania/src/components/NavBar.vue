<template>
  <div class="NavBar">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <img
        class="navbar-brand"
        src="..\assets\icon-left-font-monochrome-white.png"
        width="150"
        height="150"
      />
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/Profil" tag="button" class="nav-link"
            >Mon Profil</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/" tag="button" class="nav-link"
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
};
</script>

<style scoped>
.main {
  background-image: url("../assets/fond.jpg");
  background-size: cover;
}
.navbar {
  height: 5rem;
}
</style>