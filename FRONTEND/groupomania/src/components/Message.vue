<template>
  <div class="bloc tchat">
    <!--ECRIRE UN MESSAGE  -->
    <div class="form-group shadow-textarea">
      <label for="Champ-nouveau-Message"> Nouveau message</label>
      <textarea
        class="form-control z-depth-1"
        id="Champ-nouveau-Message"
        label="Nouveau Message"
        rows="4"
        minlength="2"
        placeholder="Ecrire Message"
        v-model="newmessage"
        spellcheck="true"
        required
      ></textarea>

      <!--EVENEMENT APEL CREATMESSAGE  -->

      <button
        class="Envoyer"
        type="submit"
        id="submit message"
        @click="submitFile()"
        value="Envoyer"
      >
        <i class="fas fa-share"></i></button
      ><br />

      <!--EVENEMENT APEL CREATMESSAGE AJOUTER IMAGE  -->
      <label for="file">Joindre</label>
      <i class="fas fa-paperclip"></i>
      <input type="file" id="file" v-on:change="handleFileUpload()" />
    </div>

    <!--BOUCLE SUR LES MESSAGES  -->
    <div v-for="message in messages" :key="message" class="bloc">
      <div class="list-group">
        <div class="list-group-item info messageTop">
          <!--EVENEMENT APEL DELETEMESSAGE  -->

          <button
            class="delete"
            type="reset"
            id="delete"
            @click="deleteMessage(message.id)"
            value="Supprimer"
          >
            <i class="fas fa-trash-alt"></i></button
          ><br />

          Message de {{ message.User.username }}
          <br />
        </div>

        <!-- AFFICHAGE MESSAGE-->
        <div class="list-group-item message text-center">
          <img
            :src="message.attachment"
            v-if="message.attachment !== null"
            alt="Image partager"
          />
          <br />
          <p class="post">
            {{ message.message }}
          </p>
        </div>
      </div>

      <!--BOUCLE SUR LES COMMENTAIRES (voir components)  -->
      <comment
        v-for="comment in message.Comments"
        :key="comment"
        v-bind="comment"
        class="Comment"
        v-on:reload-messages="TchatMessage"
      />

      <!--ECRIRE UN COMMENTAIRE  -->
      <div class="form-group shadow-textarea">
        <label for="Champ-nouveau-Commentaire"> Nouveau commentaire</label>
        <textarea
          label="Nouveau commentaire "
          class="form-control z-depth-1"
          id="Champ-nouveau-Commentaire"
          rows="2"
          minlength="2"
          placeholder="Ecrire commentaire"
          v-model="newcomment[message.id]"
          spellcheck="true"
        ></textarea>

        <!--EVENEMENT APEL CREATCOMMENT -->

        <button
          class="Envoyer"
          type="submit"
          id="submit commente"
          @click="createComment(message.id)"
          value="Envoyer"
        >
          <i class="fas fa-share"></i></button
        ><br />
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
      newmessage: null,
      newcomment: [],
      content: "",
      file: null,
      UserId: "",
      username: "",
      User: [],
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
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .get("http://localhost:3000/message", config)
        .then((res) => {
          this.messages = res.data;
        })

        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    }, //TCHATMESSAGE

    //SUPPRIMER MESSAGE
    deleteMessage(messageId) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      axios
        .delete(`http://localhost:3000/message/${messageId}`, config)
        .then((resp) => {
          this.TchatMessage();
        })

        .catch(function (err) {
          swal("Vous n'avez pas l autorisation d'effacer ce message !!");
        });
    }, //FIN DELETEMESSAGE

    //POSTER UN MESSAGE
    submitFile() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      // INITIALISE FORM DATA
      let formData = new FormData();

      //AJOUTE FORM DATA AVEC CONETNUE
      if (this.file !== null) {
        formData.append("attachment", this.file);
      }

      if (this.newmessage !== null) {
        formData.append("message", this.newmessage);
      }
      //REQUETE
      if (this.newmessage !== null || this.file !== null) {
        axios
          .post(`http://localhost:3000/message`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: "Bearer: " + this.token,
            },
          })
          .then((res) => {
            this.file = "";
            this.newmessage = "";
            this.TchatMessage();
            console.log(res.data);
          })
          .catch(function (resultat) {
            console.log(resultat);
          });
      }
    },

    //GERE MODIF SUR LE CHARGELENT DU FICHIER
    handleFileUpload() {
      this.file = document.getElementById("file").files[0];
    }, //FIN CREATMESSAGE TEST

    // POSTER UN COMMENTAIRE
    createComment(idmessage) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.UserId = localstorage.UserId;

      let config = {
        headers: {
          authorization: "Bearer: " + this.token,
        },
      };
      const content = this.newcomment[idmessage];

      if (content.length > 0) {
        axios
          .post(
            `http://localhost:3000/comment/${idmessage}`,
            { content },
            config
          )
          .then((res) => {
            this.TchatMessage();
            this.newcomment[idmessage] = "";
          })
          .catch(function (err) {
            console.log(err + "createComment");
          });
      }
    }, //FIN CREATCOMMENT
  }, //FIN METHODS
}; // FIN EXPORT DEFAULT
</script>

<style scoped>
body {
  min-height: 100vh;
}

button {
  background: none;
  box-shadow: none;
  border: 0px;
}
button:active {
  background-color: brown;
}

.tchat {
  background-color: #dcdcdc;
  margin: 1rem;
}

.message {
  border-right-color: brown;
  border-left-color: brown;
  border-bottom-color: brown;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 2px solid brown;
  width: 100%;
  height: auto;
}

.message .post {
  overflow: scroll;
}

.messageTop {
  display: flex;
  flex-direction: auto;
}

.info {
  border-color: brown;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border: 2px solid brown;
}

img {
  width: 8rem;
  height: 8rem;
  border-radius: 20px;
}

.trash {
  text-decoration: none;
}

label {
  display: none;
}
</style>