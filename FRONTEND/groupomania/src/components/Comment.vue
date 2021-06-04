<template>
  <!--BOUCLE SUR LES COMMENTAIRE -->
  <div>
    <div class="list-group">
      <div class="list-group-item commentaires">
        <button
          class="delete"
          type="reset"
          id="delete"
          @click="deleteComment(id)"
          value="Supprimer"
          :aria-label="'Supprimer un commentaire ' + id"
        >
          <i class="fas fa-trash-alt"></i>
        </button>

        Commentaire de {{ User.username }}<br />
        <p class="comment">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// IMPORT SWEET ALERT + AXIOS
import swal from "sweetalert";
const axios = require("axios");

export default {
  name: "Comment",
  emits: ["reloadMessages"],
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
    User: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      isAdmin: "",
    };
  },

  mounted() {},

  methods: {
    // SUPPRIMER COMMENTAIRE
    deleteComment(id) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      console.log(config),
        axios
          .delete(`http://localhost:3000/comment/${id}`, config)
          .then((resp) => {
            this.$emit("reloadMessages");
          })
          .catch(function (err) {
            swal({
              title: "Aïe!",
              text: "Vous n'avez pas l'autorisation d'effacer ce commentaire !",
              icon: "warning",
              button: "ok",
            });
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
  text-align: right;
}

button:active {
  background-color: brown;
}

.commentaires.comment {
  overflow: scroll;
}

.list-group-item {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-left-radius: 25px;
  margin: 1rem;
}

label {
  display: none;
}

</style>
