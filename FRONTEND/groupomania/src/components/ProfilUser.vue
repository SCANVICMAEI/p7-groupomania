
<template>
  <div class="row main">
    <div class="bloc profil col-3 ml-4 mt-4">
      <ul class="list-group text-center">
         <li class="list-group-item">Bonjour {{ username }}</li>
        <li class="list-group-item">{{ email }}</li>
        <li class="list-group-item">{{ job }}</li>
        <li class="list-group-item">{{ bio }}</li>
      </ul>
    </div>
  </div>
</template>

   <script>
const axios = require("axios");
export default {
  name: "ProfilUser",

  data() {
    return {
      UserProfile: [],
      userId: "",
      token: "",
      email: "",
      username: "",
      job: "",
      bio: "",
    };
  },

  methods: {
    //AFFICHAGE PROFIL
    Profil() {
      this.UserProfile = JSON.parse(localStorage.getItem("User"));
      this.userId = this.UserProfile.userId;
      this.token = this.UserProfile.token;
      

      axios
        .get("http://localhost:3000/user/" + this.userId)
        .then((res) => {
          let User = res.data;
          this.email = User.email;
          this.bio = User.bio;
          this.job = User.job;
          this.username = User.username;
        })
        .catch(function (err) {
          console.log(err + "ERREUR PROFIL");
        });
    },

  
  },
  mounted() {
    this.Profil();
  },

};
</script>
   <style scoped >
   .main {
  background-image: url("../assets/fond.jpg");
  background-size: cover;
}
</style>
      