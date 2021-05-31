<template>
  <div class="container-fluide">
    <div class="container-fluide">
      <NavBar />
    </div>

    <div class="container-fluide row">
      <div class="col-7 Profil">
        <ProfilUser />
      </div>

<!-- CHANGEMENT PROFIL -->
      <div class="col bloc profil">
        <form class="NewProfil">
          <!-- CHANGEMENT PSEUDO -->
          <div>
            <label for="inputtexte">Nouveau Pseudo</label>
            <input
              v-model="nexUsername"
              type="texte"
              id="inputtexte"
              class="form-control"
              placeholder="Pseudo"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              required
              autofocus
            />
          </div>

          <!-- CHANGEMENT EMAIL -->
          <div>
            <label for="inputtexte">Nouvelle Email</label>
            <input
              v-model="newEmail"
              type="texte"
              id="inputtexte"
              class="form-control"
              placeholder="bio"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              required
              autofocus
            />
          </div>

          <!-- CHANGEMENT BIO -->
          <div>
            <label for="inputtexte">Nouvelle bio</label>
            <input
              v-model="newBio"
              type="texte"
              id="inputtexte"
              class="form-control"
              placeholder="bio"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              required
              autofocus
            />
          </div>

          <!-- CHANGEMENT JOB -->
          <div>
            <label for="inputtexte">Nouveau job</label>
            <input
              v-model="newJob"
              type="texte"
              id="inputtexte"
              class="form-control"
              placeholder="bio"
              minlength="3"
              maxlength="10"
              pattern="[A-z-_ çàâéèeîïù]{2,30}"
              required
              autofocus
            />
          </div>
          <input
        type="submit"
        value="Valider les modifications de mon compte"
        @click="NewProfil()"
      /><br>
      ou <br>
<input
          type="submit"
          value="Supprimer mon compt"
          @click="deleteProfil()"
        />
        </form>
      </div>
      
    </div>
  </div>
</template>

<script>
import ProfilUser from "../components/ProfilUser.vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "Profil",
  components: {
    NavBar,
    ProfilUser,
  },

  data() {
    return {
      UserProfile: [],
    };
  },

  mounted() {},
  
  methods: {
    //CHANGEMENT PROFIL
    NewProfil() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };

      axios
        .put(`http://localhost:3000/user/${this.userId}`, config)
        .then((resp) => {
          window.location.reload();
        })
        .catch(function (err) {
          console.log(err + "ERREUR delete comment");
        });
    },

    //SUPPRESSION COMPTE USER
    deleteProfil() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .delete(`http://localhost:3000/user/${this.userId}`, config)
        .then((resp) => {
          swal("compte supprimer");
          // this.$router.push("/login");
        })
        .catch(function (err) {
          console.log(err + "ERREUR delete profil");
        });
    },
  },
};
</script>

<style scoped>
</style>