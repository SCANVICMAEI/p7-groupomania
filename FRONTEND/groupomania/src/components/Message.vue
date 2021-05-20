<template>

  <div class="bloc tchat col-7 mt-5">
    <div v-for="message in messages" :key="message" class="bloc Message">
      <ul class="list-group">
        <li class="list-group-item">
          Le : {{ message.createdAt }} <br />
          {{ message.message }}<br />
        </li>
      </ul>
       <div v-for="comment in message.Comments" :key="comment" class="bloc Comment">
      <ul class="list-group">
        <li class="list-group-item"> 
        {{comment.content}} 
         </li> 
      </ul>
    </div> 
    </div>
 
     

   
  </div>
  
</template>

<script>
// import Comment from "../components/Comment";

const axios = require("axios");
export default {
  name: "Message",
  // components: {
  //   Comment,
  // },

  data() {
    return {
      messages: "",
    };
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
  },

  mounted() {
    this.TchatMessage();
  },
};
</script>

<style scoped>
.tchat {
  margin: auto;
}
</style>