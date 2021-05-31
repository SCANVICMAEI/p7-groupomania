<template>
<div>
   <!--BOUCLE SUR LES COMMENTAIRE -->
       <ul class="list-group">
        <li class="list-group-item commentaires">
          {{content}} <br /> 
          <button @click="deleteComment(id)">
        <i class="fas fa-trash-alt"></i>
        </button>
        </li>
      </ul>
</div>
</template>
<script>
const axios = require("axios");
export default {
  name: "Comment",
  props: {
    id:{
      type:Number,
      required:true
    },
    UserId:{
      type:Number,
      required:true
    },
    content: {
      type: String,
      required:true,
    },
    MessageId: {
      type: Number,
      required:true,
    },

  },
  data() {
    return{  
    
  }
  },
   mounted() {

     },
  methods:{

 // SUPPRIMER COMMENTAIRE
  deleteComment(id){
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
    axios.delete(`http://localhost:3000/comment/${id}`,config)
      .then((resp) => {
    window.location.reload()
      })
      .catch(function (err) {
          console.log(err + "ERREUR delete comment");
        });
      },
  }
};
</script>
<style scoped>
button{
  background:none;
  box-shadow: none;
  border: none;
  padding: 0%;
}
.list-group-item{
  border-radius: 20px;
  margin: 1rem;
}

</style>
