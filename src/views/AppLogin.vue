<template>
  <div class="body">
    <header>
      <div class="logo">
        <router-link to="/">
          <img id="hilora-logo" src="../assets/hilora-logo.png" alt="Hilora">
        </router-link>
      </div>
    </header>
    <form @submit="onSubmit"> 
        <div class="form-header">
          <h2>Login to your Account</h2>
        </div>
        <div class="input">
            <label for="">Email</label>
            <input type="email" name="email" v-model="email" id="">
        </div>
        <div class="input"> 
            <label for="">Password</label>
            <input type="password" name="password" v-model="password" id="">
        </div>
        <div class="input">
            <input class="input-btn" type="submit" value="Login">
        </div>
        <div class="other-text">
          <p class="p-switch">Don't have an account? <span class="login-switch">
            <router-link to="/register">Register</router-link>
            </span></p>
        </div>
    </form>
  </div>

</template>

<script>
import {supabase} from '../supabase-client.ts'

export default {
  name: 'AppLogin',
  data() {
      return {
          email: '',
          password: '',
          isLoading: false,
          errorMessage: '',
          successMessage: ''
      }
    },
    methods: {
      async onSubmit(e){
        e.preventDefault()
        
        this.errorMessage = '';
        this.successMessage = '';
        this.isLoading = true;

         try{
              const { data, error } = await supabase.auth.signInWithPassword({
              email: this.email,
              password: this.password,
            });
          if (error) throw error;

          const userId = data.user.id

          const [professionalCheck, employerCheck] = await Promise.all([
            supabase.from('Professional').select('user').eq('user', userId).maybeSingle(),
            supabase.from('Employer').select('user').eq('user', userId).maybeSingle()
          ]);

          // Check for database transmission or policy errors
          if (professionalCheck.error) throw professionalCheck.error;
          if (employerCheck.error) throw employerCheck.error;

          this.email = '';
          this.password = '';

          if (professionalCheck.data) {
              this.successMessage = "Welcome back! Redirecting to Professional Dashboard...";
              setTimeout(() => {
                  this.$router.push('/professional'); // Replace with your route path
              }, 1500);
          } else if (employerCheck.data) {
              this.successMessage = "Welcome back! Redirecting to Employer Dashboard...";
              setTimeout(() => {
                  this.$router.push('/employer'); // Replace with your route path
              }, 1500);
          } else {
              // Fallback configuration if a user account exists in auth but lacks an assigned profile row
              this.successMessage = "Login successful! Setting up your profile routing...";
              setTimeout(() => {
                  this.$router.push('/register'); // Redirect to profile setup/selection page
              }, 1500);
          }
         }
          catch(error){
            console.error("Error matching user state:", error.message)
            alert("Invalid login details");
          }finally {
            this.isLoading = false;
          }
      },
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

.form-header{
  text-align: center;
}

.form-header h2{
  color: #151d2a;
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
