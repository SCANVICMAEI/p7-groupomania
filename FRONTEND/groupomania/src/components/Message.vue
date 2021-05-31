<template>
  <div class="bloc tchat">
    <!--ECRIRE UN MESSAGE  -->
    <div class="form-group shadow-textarea">
      <label for="exampleFormControlTextarea6"> </label>
      <textarea
        class="form-control z-depth-1"
        id="exampleFormControlTextarea6"
        label="Nouveau Message"
        rows="1"
        placeholder="Ecrire Message"
        v-model="newmessage"
      ></textarea>

      <!--EVENEMENT APEL CREATMESSAGE  -->
      <button @click="createMessage()">
        <i class="fas fa-share"></i>
      </button>
    </div>

    <!--BOUCLE SUR LES MESSAGES  -->
    <div v-for="message in messages" :key="message" class="bloc message">
      <ul class="list-group">
        <li class="list-group-item">
          Message de :{{ message.idUser }}<br />
          {{ message.message }}<br />
          Le : {{ message.createdAt }}

          <!--EVENEMENT APEL DELETEMESSAGE  -->
          <button @click.prevent="deleteMessage(message.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>
      </ul>

      <!--BOUCLE SUR LES COMMENTAIRES (voir components)  -->
      <comment
        v-for="comment in message.Comments"
        :key="comment"
        v-bind="comment"
        class="Comment"
      />

      <!--ECRIRE UN COMMENTAIRE  -->
      <div class="form-group shadow-textarea">
        <label for="exampleFormControlTextarea6"> </label>
        <textarea
          class="form-control z-depth-1"
          id="exampleFormControlTextarea6"
          rows="1"
          placeholder="Ecrire commentaire"
          v-model="newcomment[message.id]"
        />

        <!--EVENEMENT APEL CREATCOMMENT -->
        <button @click="createComment(message.id)">
          <i class="fas fa-share"></i>
        </button>
        <button>
          <i class="fas fa-share-alt-square"></i>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>

// IMPORT COMPONENTS
import Comment from "../components/Comment";

// IMPORT SWEET ALERT + AXIOS
import swal from "sweetalert";
const axios = require("axios");

export default {
  name: "Message",
  components: {
    Comment,
  },

  data() {
    return {
      messages: "",
      token: "",
      isAdmin: "",
      userId: "",
      newmessage: "",
      newcomment: [],
      content: "",
      attachment: "",
      file:"", //TEST
    };
  },

  mounted() {
    //LANCER AU CHARGEMENT DE PAGE
    this.TchatMessage();
  },

  methods: {

    //AFFICHAGE MESSAGE
    TchatMessage() {
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
        .get("http://localhost:3000/message", config)
        .then((res) => {
          console.log(this.message);
          this.messages = res.data;
        })

        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },//TCHATMESSAGE

    //SUPPRIMER MESSAGE
    deleteMessage(messageId) {
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
          .delete(`http://localhost:3000/message/${messageId}`, config)
          .then((resp) => {
            this.TchatMessage();
          })

          .catch(function (err) {
            swal("Vous n'avez pas l autorisation d'effacer ce message !!");
            console.log(err + "ERREUR delete MESSAGE");
          });
    },//FIN DELETEMESSAGE

    // POSTER UN MESSAGE TEXTE
    createMessage() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };

      const message = this.newmessage;
      axios
        .post(`http://localhost:3000/message`, { message }, config)
        .then((res) => {
          console.log(res.data);
          this.TchatMessage();
          this.newmessage = "";
        })
        .catch(function (err) {
          console.log(err + "createMessage");
        });
    },//FIN CREATMESSAGE

    // POSTER UN MESSAGE TEXTE AVEC IMAGE TEST
    // handleFileUpload(){
    //   this.file = this.$refs.file.files[0];
    // }





    createMessage() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };

      const message = this.newmessage;
      axios
        .post(`http://localhost:3000/message`, { message }, config)
        .then((res) => {
          console.log(res.data);
          this.TchatMessage();
          this.newmessage = "";
        })
        .catch(function (err) {
          console.log(err + "createMessage");
        });
    },//FIN CREATMESSAGE TEST

    // POSTER UN COMMENTAIRE
    createComment(idmessage) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,

        },
      };
      const content = this.newcomment[idmessage];
      axios
        .post(`http://localhost:3000/comment/${idmessage}`, { content }, config)
        .then((res) => {
          this.TchatMessage();
          this.newcomment[idmessage] = "";
        })
        .catch(function (err) {
          console.log(err + "createComment");
        });
    },//FIN CREATCOMMENT

  },//FIN METHODS

};// FIN EXPORT DEFAULT

</script>

<style scoped>
button {
  background: none;
  box-shadow: none;
  border: none;
}

.tchat {
  background-color: #dcdcdc;
  margin: 1rem;
}

li {
  border-color: brown;
}
.list-group-item {
  border-radius: 20px;
}
</style>