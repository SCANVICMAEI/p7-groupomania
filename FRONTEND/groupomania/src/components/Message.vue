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

      <!--EVENEMENT submitFile  -->

      <button
        class="Envoyer"
        type="submit"
        id="submit-message"
        @click="submitFile()"
        value="Envoyer"
        :aria-label="'Poster un message '"
      >
        <i class="fas fa-share"></i></button
      ><br />

      
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
            <!--  ENTETE AFFICHAGE MESSAGE-->
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
        <label :for="'Champ-nouveau-Commentaire' + message.id">
          Nouveau commentaire</label
        >
        <textarea
          label="Nouveau commentaire "
          class="form-control z-depth-1"
          :id="'Champ-nouveau-Commentaire' + message.id"
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
          @click="createComment(message.id)"
          value="Envoyer"
          :aria-label="'Poster un commentaire pour le message ' + message.id"
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
    }, // FIN TCHATMESSAGE

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
          swal({
            title: "Aïe!",
            text: "Vous n'avez pas l'autorisation d'effacer ce message !",
            icon: "warning",
            button: "ok",
          });
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

      //AJOUTE FORM DATA AVEC CONTENU
      if (this.file !== null) {
        formData.append("attachment", this.file);
      }

      if (this.newmessage !== null) {
        formData.append("message", this.newmessage);
      }
     
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
            document.getElementById("file").value = null;
            this.newmessage = "";

            this.TchatMessage();
            console.log(res.data);
          })
          .catch(function (resultat) {
            console.log(resultat);
          });
      }
    },//FIN SUBMITFILE

    //GERE MODIF SUR LE CHARGELENT DU FICHIER

    handleFileUpload() {
      this.file = document.getElementById("file").files[0];
    }, //FIN CREATMESSAGE TEST

    // POSTE UN COMMENTAIRE

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

textarea {
  margin-top: 2rem;
}
</style>