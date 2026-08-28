<template>
  <div class="body">
    <header>
      <div class="logo">
        <router-link to="/">
          <img id="hilora-logo" src="../assets/hilora-logo.png" alt="Hilora">
        </router-link>
      </div>
    </header>
    <form @submit="onSubmit($event, 'professional')" class="reg-professional">
        <div class="form-header">
          <h2>Create an Account</h2>
          <p>Register as a Professional</p>
        </div>
        <div class="select-user">
          <button @click="addProfessional" class="prof">Professional</button>
          <button @click="addEmployer" class="emp">Employer</button>
        </div>
        <div class="input">
            <label for="">Email</label>
            <input v-model="email" type="email" name="" id="">
        </div>
        <div class="input"> 
            <label for="">Password</label>
            <input v-model="password" type="password" name="" id="">
        </div>
        <div class="input">
            <input class="input-btn" type="submit" value="Register">
        </div>
        <div class="other-text">
          <p class="p-switch">Already have an account?  <span class="login-switch">
            <router-link to="/login">Signin</router-link>
            </span></p>
        </div>
    </form>
    <form @submit="onSubmit($event, 'employer')" class="reg-employer">
        <div class="form-header">
          <h2>Create an Account</h2>
          <p>Register as an Employer</p>
        </div>
        <div class="select-user">
          <button @click="addProfessional" class="emp">Professional</button>
          <button @click="addEmployer" class="prof">Employer</button>
        </div>
        <div class="input">
            <label for="">Email</label>
            <input v-model="email" type="email" name="" id="">
        </div>
        <div class="input"> 
            <label for="">Password</label>
            <input v-model="password" type="password" name="" id="">
        </div>
        <div class="input">
            <input class="input-btn" type="submit" value="Register">
        </div>
        <div class="other-text">
          <p class="p-switch">Already have an account?  <span class="login-switch">
            <router-link to="/login">Signin</router-link>
            </span></p>
        </div>
    </form>
  </div>

</template>

<script>
import {supabase} from '../supabase-client.ts'

export default {
  name: 'AppRegister',
   data(){
      return{
          email: '',
          password: '',
          isLoading: false,
          errorMessage: '',
          successMessage: ''
      }
    },
  methods: {
    addProfessional(e){
      e.preventDefault()

      const reg_professionals = document.querySelector('.reg-professional');
      const reg_employers = document.querySelector('.reg-employer');
      reg_professionals.style.display = 'flex';
      reg_employers.style.display = 'none';
    },
    addEmployer(e){
      e.preventDefault()

      const reg_professionals = document.querySelector('.reg-professional');
      const reg_employers = document.querySelector('.reg-employer');
      reg_employers.style.display = 'flex';
      reg_professionals.style.display = 'none';
      
    },
    async onSubmit(e, profile) {
      e.preventDefault();
      this.errorMessage = '';
      this.successMessage = '';
      this.isLoading = true;

      try {
          // 1. Create the user in Supabase
          const { data, error } = await supabase.auth.signUp({
              email: this.email,
              password: this.password,
          });
          
          if (error) throw error;
          // 2. FORCE SIGNOUT IMMEDIATELY (Prevents instant automatic login)
          //await supabase.auth.signOut();

          if (data.user && data.session === null) {
              this.successMessage = "Signup successful! Please check your email inbox to verify your account.";
          } else {
              this.successMessage = "Signup successful! You are now logged in.";
          }
          // 3. Clear your form input fields safely
          this.email = '';
          this.password = '';

          if(profile === 'professional'){
            setTimeout(() => {
                this.$router.push('/professional-reg'); // Smoothly pushes them to your login view
            }, 2000);
          }else if(profile === 'employer'){
            setTimeout(() => {
                this.$router.push('/employer-reg'); // Smoothly pushes them to your login view
            }, 2000);
          }else{
            setTimeout(() => {
                this.$router.push('/login'); // Smoothly pushes them to your login view
            }, 2000);
          }

      } catch (err) {
          this.errorMessage = err.message || "An unexpected error occurred during signup.";
      } finally {
          this.isLoading = false;
      }
    }

  }
}
</script>

<style scoped>
.logo{
  width: 10%;
}

#hilora-logo{
  width: 140px;
  height: 40px;
}

.body{
  background: var(--color-bg-light);
  height: 100vh;
}

header{
  padding: 0 60px 0 60px;
  height: 60px;
  align-content: center;
  border-bottom: 1px solid #8790a163;
}

form{
  display: flex;
  flex-direction: column;
  width: 35%;
  justify-self: center;
  margin-top: 80px;
  box-sizing: border-box;
  gap: 15px;
  padding: 30px;
  border: 1px solid #8790a163;
  border-radius: 5px;
}

.reg-employer{
  display: none;
}

.form-header{
  text-align: center;
}

.form-header h2{
  color: #151d2a;
}

.select-user{
  display: flex;
  width: 100%;
  gap: 10px
}

.prof{
  background: #ff5524;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: none;
}

.emp{
  color: #151d2a;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #151d2a;
}

.input{
  display: flex;
  flex-direction: column;
}

input{
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #8790a163;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
}

label{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
}

.input-btn{
  width: 100%;
  background: #151d2a;
  color: white;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.p-switch, label{
  font-size: 15px;
  color: #151d2a;
}

.login-switch{
  color: #ff5524;
  font-weight: 600;
}

</style>
