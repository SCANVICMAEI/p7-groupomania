<template>
  <div class="bloc tchat col-7 mt-5">
    <div v-for="message of message" :key="message" class="bloc Message">
      <ul class="list-group">
        <li class="list-group-item">
          Le : {{}} <br />
          {{}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Message",

  data() {
    return {
      message: {
        id: "",
        idUser: "",
        message: "",
        createdAt: "",
        updatedAt: "",
        Comment: [
          {
            content: "",
            createdAt: "",
            updatedAt: "",
          },
        ],
      },
    };
  },
  methods: {
    //AFFICHAGE MESSAGE
    TchatMessage() {
      axios
        .get("http://localhost:3000/message")
        .then((res) => {
          let Messages = res.data;
          this.message = Messages.message;
        })
        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },

    //AFFICHAGE COMMENT
    TchatComment() {
      axios
        .get("http://localhost:3000/comment")
        .then((res) => {
          let Comment = res.data;
          this.content = Comment.content;
        })
        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },
  },
};
</script>

<style scoped>
.tchat {
  margin: auto;
}
</style>