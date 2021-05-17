<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
      <div class="col-md-8 col-lg-6 blocp">
        <img src="../assets/logo2.png" class="logo">
        <h2 class="login-heading mb-4">Discutons, Partageons, Avançons...</h2>
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-lg-8 mx-auto bloc">

                <h2 class="login-heading mb-4" v-if="mode=='login'">S'identifier</h2>

                <h2 class="login-heading mb-4" v-else>S'inscrire</h2>

                <p v-if="mode=='login'">Pas encore inscrit ? <button class="switche" @click="switcheToCreateAccount()">Je minscrit</button></p>

                <p v-else>Deja inscrit ? <button class="switche" @click="switcheToLogin()">Je m identifie</button></p>

                <form class="SignupLogin">

                  <div class="form-label-group">
                    <input v-model="username" type="texte" id="inputtexte" class="form-control" v-if="mode == 'create'" placeholder="Pseudo"
                      required autofocus>
                    <label for="inputtexte">Pseudo</label>
                  </div>

                  <div class="form-label-group">
                    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required
                      autofocus>
                    <label for="inputEmail">Email</label>
                  </div>

                  <div class="form-label-group">
                    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <label for="inputPassword">Password</label>
                  </div>

                   <div class="form-label-group" v-if="mode == 'create'">
                    <input v-model="bio" type="textb" id="inputbio" class="form-control"  placeholder="bio"
                      required autofocus>
                    <label for="inputbio">bio</label>
                  </div>

                   <div class="form-label-group" v-if="mode == 'create'">
                    <input v-model="job" type="textj" id="inputjob" class="form-control"  placeholder="job"
                      required autofocus>
                    <label for="inputjob">job</label>
                  </div>

                  <button v-if="mode =='login'" @click.prevent="loginAccount()" class="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2 button--disabled"
                    type="submit">Connexion</button>
                  
                  <button v-else @click.prevent="createAccount()" class="btn btn-lg  btn-block btn-login text-uppercase font-weight-bold mb-2 " :class="{'button--disabled' : !validateFields}"
                  type="submit">Créer un compte</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require ('axios');
  export default {
    name: 'Home',
    data () {
      return {
        mode: 'login',
        email:'',
        username:'',
       password:'',
       job:'',
       bio:'',
      }
    },
    computed:{
    validateFields:function(){
   if (this.mode =='create'){
     if (this.email !="" && this.username !="" && this.password !=""&& this.job !=""&& this.bio!=""){
       return true;
     }else{
       return false;
     }
   }else{
     if(this.email !=""&&this.password !=""){
       return true;
     }else{
       return false;
     }
   }
 }
    },
    methods: {
// SWITCHE ENTRE LOGIN ET SIGNUP

     switcheToCreateAccount () {
        this.mode = 'create';
      },
      switcheToLogin () {
        this.mode = 'login';
      },

// SIGNUP
      createAccount (){
     let newUser={
     email : this.email,
     username : this.username,
     password : this.password,
     bio: this.bio,
     job: this.job,
     };   
      axios.post('http://localhost:3000/user/signup',newUser)
     .then((res) => {
            console.log(res.data);
            if (res === 201) {
              this.$router.push('/')
              switcheToLogin
            }
      })
      .catch(function (err) {
        console.log(err);
      })
    },

//LOGIN

   loginAccount (){
    let User={
     email :this.email,
     password :this.password,
     }

// ENVOIE TOKEN+ID DANS LOCALSTORAGE  

     axios.post('http://localhost:3000/user/login',User)
      .then((res) =>{
        if (res.status === 200) {
           localStorage.setItem("User", JSON.stringify (res.data));
          this.$router.push('/Tchat');
        }
         console.log(res.data) 
      })              
      .catch(function (err) {
        console.log(err+"login hs");
      }); 
   }
  }
}

</script>
<style>
  .bloc {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #c6c6c4;
    border: 1px solid #3b3b3b;
    box-shadow: 2px 2px 2px#ababa9;
    opacity: 0.8;
    border-radius: 20px;
  }

  .blocp {
    background-color: #b0b0af;
  }

  button {
    background-color: #b0b0af;
  }

  :root {
    --input-padding-x: 1.5rem;
    --input-padding-y: 0.75rem;
  }
button{
  border-radius: 18px;
  padding-left: 1rem;
   padding-right: 1rem;
}
  .bg-image {
    background-image: url('../assets/photo.jpg');
    background-size: cover;
    background-position: center;
  }

  .logo {
    /* background-image: url('/assets/logo2.png');
  background-size: cover;
  background-position: center; */
    height: 15rem;
    text-align: center;
    margin: auto;
    display: flex;
  }

  .login-heading {
    font-weight: 300;
    text-align: center;
  }

  .btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
    border-radius: 2rem;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group>input,
  .form-label-group>label {
    padding: var(--input-padding-y) var(--input-padding-x);
    height: auto;
    border-radius: 2rem;
    text-align: center;
    border: 1px solid #3b3b3b;
  }

  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    cursor: text;
    /* Match the input under the label */
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  } */

 .form-label-group input::-moz-placeholder {
    color: transparent;
  }

 .form-label-group input::placeholder {
    color: transparent;
  } 

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }

  /* Fallback for Edge
-------------------------------------------------- */

  @supports (-ms-ime-align: auto) {
    .form-label-group>label {
      display: none;
    }

    .form-label-group input::-ms-input-placeholder {
      color: #777;
    }
  }

  /* Fallback for IE
-------------------------------------------------- */

  @media all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
    .form-label-group>label {
      display: none;
    }

    .form-label-group input:-ms-input-placeholder {
      color: #777;
    }
  }
</style>