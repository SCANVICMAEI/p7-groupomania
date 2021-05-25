<template>
  <div class="bloc tchat col-7 mt-5">

    <!--ECRIRE UN MESSAGE  -->
    <div class="form-group shadow-textarea">
      <label for="exampleFormControlTextarea6"> </label>
      <textarea
        class="form-control z-depth-1"
        id="exampleFormControlTextarea6"
        rows="1"
        placeholder="Ecrire Message"
      ></textarea>

      <button @click="createMessage">
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

     <!--BOUCLE SUR LES COMMENTAIRE (voir components)  -->

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
        ></textarea>

        <button>
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
    };
  },

  mounted() {
    this.TchatMessage();
    this.deleteMessage;
  },

  methods: {
    //AFFICHAGE MESSAGE
    TchatMessage() {
      axios
        .get("http://localhost:3000/message")
        .then((res) => {
          this.messages = res.data;
        })

        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },

    //SUPPRIMER MESSAGE

    // deleteMessage(){

    //   let token = localStorage.getItem("token");
    // axios.delete('http://localhost:3000/message',{params:{message.id}
    // },{headers:{ authorization: token}},

    // )
    //  .then(resp => resp.data)
    //  },

    // POSTER UN MESSAGE
    createMessage() {
      axios
        .post("http://localhost:3000/message")
        .then((res) => {
          this.message = res.data;
        })
        .catch(function (err) {
          console.log(err + "post message");
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