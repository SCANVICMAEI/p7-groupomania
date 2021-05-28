<template>
  <div class="bloc tchat col-7 mt-5">

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

      <button @click="createMessage()">
        <i class="fas fa-share"></i>
      </button>

      <button>
        <i class="fas fa-share-alt-square"></i>
      </button>
    </div>

    <!--BOUCLE SUR LES MESSAGES  -->
    <div v-for="message in messages" :key="message" class="bloc Message">
      <ul class="list-group">
        <li class="list-group-item">
          Message de :{{ message.idUser }}<br />
          {{ message.message }}<br />
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
        class="bloc Comment"
      />

      <!--ECRIRE UN COMMENTAIRE  -->
      <div class="form-group shadow-textarea">
        <label for="exampleFormControlTextarea6"> </label>
        <textarea
          class="form-control z-depth-1"
          id="exampleFormControlTextarea6"
          rows="1"
          placeholder="Ecrire commentaire"
          v-model="newcomment"
        ></textarea>

        <button @click="createComment()">
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
      newcomment:"",
      message:"",
      comment:""
    
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

    // POSTER UN MESSAGE

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
      axios
        .post(`http://localhost:3000/message`,{message},config)
        .then((res) => {
         console.log(res.data)
        //  this.$router.push("/tchat")
         this.TchatMessage()
        })
        .catch(function (err) {
          console.log(err + "createMessage");
        });
    },
  

  // POSTER UN COMMENTAIRE
    createComment() {
      let localstorage = JSON.parse(localStorage.getItem("User"));
      this.token = localstorage.token;
      this.isAdmin = localstorage.isAdmin;
      this.userId = localstorage.userId

      let config = { 
        headers: {
        authorization: "Bearer: " + this.token
        },
    };

     let id = this.message.id
     const comment = this.newcomment
     console.log(id)
     console.log(comment)
      axios
        .post(`http://localhost:3000/comment/${id}`,{comment},config)
        .then((res) => {
         console.log(res.data)
         
        })
        .catch(function (err) {
          console.log(err + "createComment");
        });
    },
  },
};

</script>

<style scoped>
.tchat {
  margin: auto;
  background-color: white;
  border: none;
  box-shadow: none;
}

button {
  background: none;
  box-shadow: none;
  border: none;
}
</style>