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
      <button @click="submitFile()">
        <i class="fas fa-share"></i>
      </button>

      <!--EVENEMENT APEL CREATMESSAGE AJOUTER IMAGE  -->
      <label>
      <i class="fas fa-paperclip"></i><input type="file" id="file" v-on:change="handleFileUpload()" />
    </label>
    </div>
    

    <!--BOUCLE SUR LES MESSAGES  -->
    <div v-for="message in messages" :key="message" class="bloc message">
      <ul class="list-group">
        <li class="list-group-item info text-left">
          Message de :{{ message.idUser }} 
           <br />
          Le : {{ message.createdAt }}<br />
       
           <!--EVENEMENT APEL DELETEMESSAGE  -->
      
         <button @click.prevent="deleteMessage(message.id)">
            <i class="fas fa-trash-alt "></i>
          </button> 

        </li>
        
        <li class="list-group-item message text-center">
          <img :src="message.attachment" /> <br />
          {{ message.message }}
        </li>
      </ul>

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
      file: "",
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
    }, //FIN DELETEMESSAGE


    //TESTE !!!!!!!!!!!!!! POST IMAGE
    submitFile() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId;

      // INITIALISE FORM DATA
      let formData = new FormData();

      //AJOUTE FORM DATA AVEC CONETNUE
      formData.append("attachment", this.file);
      formData.append("message", this.newmessage);
      console.log(formData);
      //REQUETE
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
    }, //FIN CREATCOMMENT
  }, //FIN METHODS
}; // FIN EXPORT DEFAULT
</script>

<style scoped>

button {
  background: none;
  box-shadow: none;
  border: 0px;
}

.tchat {
  background-color: #dcdcdc;
  margin: 1rem;
}
.message{
border-right-color: brown;
border-left-color: brown;
border-bottom-color: brown;
border-bottom-right-radius: 20px;
border-bottom-left-radius: 20px;
border: 2px solid brown;
/* flex-wrap: wrap;
display: flex; */

}

.info{
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

.trash{
  text-decoration: none;
}


</style>