<template>
  <div class="bloc tchat ">

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

      <button @click="createMessage(); createMessageImage()">
        <i class="fas fa-share"></i>
      </button>

      <!-- <button @change="uploadImage()" type="file" accept=".jpg,.jpeg,.gif,.png">
        <i class="fas fa-share-alt-square"></i>
      </button> -->
      <label for="attachment"> <i class="fas fa-share-alt-square"></i></label>
      <input type="file"
       id="attachment" name="attachment"
       accept=".png, .jpeg">

    </div>

    <!--BOUCLE SUR LES MESSAGES  -->
    <div v-for="message in messages" :key="message" class="bloc message">
      <ul class="list-group">
        <li class="list-group-item">
          Message de :{{ message.idUser }}<br />
          {{ message.message }}<br />
          <img :src="message.attachment" class="image" alt="..">
          Le : {{ message.createdAt }}
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
        class=" Comment"
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
        ></textarea>

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
import Comment from "../components/Comment";

const axios = require("axios");
const FormData = require('form-data');
export default {
  name: "Message",
  components: {
    Comment,
  },

  data() {
    return {
      messages: "",
      token:"",
      isAdmin:"",
      userId:"",
      newmessage:"",
      newcomment:[],
      content:"",
      attachment:""
    };
  },

  mounted() {
    this.TchatMessage();
  },

  methods: {

    //AFFICHAGE MESSAGE

    TchatMessage() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId
     
     let config = { 
       headers: {
        authorization: "Bearer: " + this.token
       },
     };
      axios
        .get("http://localhost:3000/message",config)
        .then((res) => {
          console.log(this.message)
          this.messages = res.data;
        })

        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },

    //SUPPRIMER MESSAGE

    deleteMessage(messageId){
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId

    let config = { 
        headers: {
        authorization: "Bearer: " + this.token
        },
    };
    console.log(config),
    axios.delete(`http://localhost:3000/message/${messageId}`,config)
     .then((resp) => {
     this.TchatMessage()
     })

      .catch(function (err) {
          console.log(err + "ERREUR delete MESSAGE");
        });
     },

    // POSTER UN MESSAGE TEXTE

    createMessage() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId

      let config = { 
        headers: {
        authorization: "Bearer: " + this.token
        },
      };
     const message = this.newmessage
     const formData = new FormData()
     
      axios
        .post(`http://localhost:3000/message`,{message},config)
        .then((res) => {
         console.log(res.data)
         this.TchatMessage()
         this.newmessage=""
        })
        .catch(function (err) {
          console.log(err + "createMessage");
        });
    },
  


// createMessageImage() {
//       let localstorage = JSON.parse(localStorage.getItem("User"));
//       this.token = localstorage.token;
//       this.isAdmin = localstorage.isAdmin;
//       this.userId = localstorage.userId

//       let config = { 
//         headers: {
//         authorization: "Bearer: " + this.token
//         },
//     };
//      const attachment = this.newattachment
//       axios
//         .post(`http://localhost:3000/message`,{attachment},config)
//         .then((res) => {
//          console.log(res.data)
//         //  this.TchatMessage()
//         //  this.newmessage=""
//         })
//         .catch(function (err) {
//           console.log(err + "createMessageImage");
//         });
//     },
























  // POSTER UN COMMENTAIRE
    createComment(idmessage) {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId

      let config = { 
        headers: {
        authorization: "Bearer: " + this.token
        },
      }
     const content = this.newcomment[idmessage]
      axios
        .post(`http://localhost:3000/comment/${idmessage}`,{content},config)
        .then((res) => {
         
         this.TchatMessage()
         this.newcomment[idmessage]= ""
        })
        .catch(function (err) {
          console.log(err + "createComment");
        });
    },

  },
};

</script>

<style scoped>


button {
  background: none;
  box-shadow: none;
  border: none;
}
  

.tchat{
 background-color:#DCDCDC;
 margin: 1rem;

}

li{
  border-color: brown;
}
.list-group-item{
  border-radius: 20px;
}



</style>