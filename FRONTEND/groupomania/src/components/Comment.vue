<template>
  <!--BOUCLE SUR LES COMMENTAIRE -->
  <div>
    <ul class="list-group">
      <li class="list-group-item commentaires">
        {{ content }} <br />
        <button @click="deleteComment(id)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// IMPORT SWEET ALERT + AXIOS
import swal from "sweetalert";
const axios = require("axios");

export default {
  name: "Comment",
  emits:["reloadMessages"],
  props: {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    MessageId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    // SUPPRIMER COMMENTAIRE
    deleteComment(id) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      console.log(config),
        axios
          .delete(`http://localhost:3000/comment/${id}`, config)
          .then((resp) => {
            this.$emit("reloadMessages")
          })
          .catch(function (err) {
            swal("Vous n'avez pas l autorisation d'effacer ce commentaire !!");
            console.log(err + "ERREUR delete comment");
          });
    }, //FIN DELETECOMMENT
  }, //FIN METHODS
}; // FIN EXPORT DEFAULT
</script>

<style scoped>
button {
  background: none;
  box-shadow: none;
  border: none;
  padding: 0%;
}
.list-group-item {
  border-radius: 20px;
  margin: 1rem;
}
</style>
