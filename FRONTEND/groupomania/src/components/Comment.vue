<template>
<div>
   <!--BOUCLE SUR LES COMMENTAIRE -->
       <ul class="list-group">
        <li class="list-group-item">
          {{content}} <br /> 

           <button @click="deleteComment">
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
//    mounted() {
//      this.deleteComment();
//      },
  // SUPPRIMER COMMENTAIRE
//  methods: {
//     //SUPPRIMER COMMENT
//      deleteComment(event){
//    axios.delete("http://localhost:3000/comment/"+ UserId)
//      .then(resp => resp.data)
//     },
//   },
 
};
</script>
<style scoped>
button{
  background:none;
  box-shadow: none;
  border: none;
  padding: 0%;
}

</style>
