<template>
  <div class="container-fluide">
    <div class="NavBar">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <img
          class="navbar-brand"
          src="..\assets\icon-left-font-monochrome-white.png"
          width="150"
          height="150"
        />
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Mon Profil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Déconexion</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="row main">
      <div class="bloc profil col-3 ml-4 mt-4">
        <ul class="list-group">
          <img src="/public/icon.png" alt="" class="rounded img" />
          <li class="list-group-item">{{ email }}</li>
          <li class="list-group-item">{{ job }}</li>
          <li class="list-group-item">{{ bio }}</li>
           <li class="list-group-item">{{ username }}</li>
           
        </ul>
      </div>
      <div class="bloc tchat col-7 ml-4 mt-5">
        <div v-for="message of message" :key="message" class="bloc Message">
        <ul class="list-group">
          <li  class="list-group-item" > Le : {{message.createdAt}} <br> {{message.message}}</li>  
        </ul>     
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "TCHAT",
  data() {
    return {
      UserProfile: [],
      userId: "",
      token: "",
      email: "",
      username: "",
      job: "",
      bio: "",
      message:{
      id:"",
      idUser:"",
      message: "",
      createdAt: "",
      updatedAt: "",
      Comment:[]
      },
     
     
    };
  },

  methods: {
//AFFICHAGE PROFIL
    Profil() {
      this.UserProfile = JSON.parse(localStorage.getItem("User"));
      this.userId = this.UserProfile.userId;
      this.token = this.UserProfile.token;
      axios
        .get("http://localhost:3000/user/" + this.userId)
        .then((res) => {
        let User=res.data
        this.email=User.email;
        this.bio=User.bio;
        this.job=User.job;
        this.username=User.username;
        })
        .catch(function (err) {
          console.log(err + "ERREUR PROFIL");
        });
    },

//AFFICHAGE MESSAGE
TchatMessage() {
      axios
        .get("http://localhost:3000/message")
        .then((res) => {
          let Messages =res.data
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
          let Comment =res.data
           this.content=Comment.content;      
        })
        .catch(function (err) {
          console.log(err + "ERREUR MESSAGE");
        });
    },


  },
  created(){
   
  },
  mounted() {
    this.Profil();
    this.TchatMessage();
   
  },
};
</script>

<style scoped>
.main {
  background-image: url("../assets/fond.jpg");
  background-size: cover;
}
img {
  border-color: black;
}
.tchat {
  border-color: blue;
}
.profil {
  border-color: yellow;
}
.message {
  border-color: green;
}
</style>