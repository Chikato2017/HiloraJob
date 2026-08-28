<template>
    <div class="form-container">
        <header>
            <div class="logo">
                <router-link to="/">
                <img id="hilora-logo" src="../assets/hilora-logo.png" alt="Hilora">
                </router-link>
            </div>
        </header>
        <form  @submit="onSubmit">
            <div class="form-header">
                <h2>Fill Your Company Profile</h2>
            </div>
            <div class="input">
                <label for="">Company Name</label>
                <input type="text" name="fullName" v-model="company_name" id="">
            </div>
            <div class="input">
                <label for="">About</label>
                <textarea v-model="about" name="bio" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="input">
                <label for="">Industry</label>
                <input type="text" name="industry" v-model="industry" id="">
            </div>
            <div class="group">
                <div class="input group-input">
                    <label for="">Company Size</label>
                    <input type="text" name="company-size" v-model="company_size" id="">
                </div>
                <div class="input group-input">
                    <label for="">Website</label>
                    <input type="text" name="website" v-model="website" id="">
                </div>
            </div>
            <div class="input">
                <label for="">Address</label>
                <input type="text" name="address" v-model="address" id="">
            </div>
            <div class="input">
                <input class="input-btn" type="submit" value="Save & Go to Dashboard">
            </div>
        </form>
    </div>
</template>

<script>
import {supabase} from '../supabase-client.ts'

export default {
     name: 'EmployerReg',
     data(){
        return{
            userId: null,
            user: '',
            company_name: '',
            about: '',
            industry: '',
            company_size: '',
            address: '',
            website: '',
        }
    },
     methods: {
        async onSubmit(e){
            e.preventDefault()

            try{
                const {data, error} = await supabase.from("Employer").insert({
                    user: this.userId,
                    company_name: this.company_name,
                    about: this.about,
                    industry: this.industry,
                    company_size: this.company_size,
                    address: this.address,
                    website: this.website
                });

                if (error) throw error;
                if (data){
                    console.log("successfully saved profile")
                }

                setTimeout(() => {
                    this.$router.push('/employer'); // Smoothly pushes them to your login view
                }, 2000);

            }catch(error){
                console.error("Error matching user state:", error.message)
            }
            
        }
     },
     async mounted(){
        try{
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            this.userId = user.id;
        }      
        catch (err) {
            console.error("Error matching user state:", err.message)
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

.form-container{
  background: var(--color-bg-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column; 
  overflow: hidden;
  box-sizing: border-box;
}

header{
  padding: 0 60px 0 60px;
  height: 60px;
  align-content: center;
  border-bottom: 1px solid #8790a163;
}

.form-header{
  text-align: center;
}

form{
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 80px 0px 80px 0px;
  box-sizing: border-box;
  gap: 15px;
  padding: 30px;
  border: 1px solid #8790a163;
  border-radius: 5px;
  align-self: center;
}

.input{
  display: flex;
  flex-direction: column;
}

label{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
}

input{
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #8790a163;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
}

textarea{
    border: 1px solid #8790a163;
    width: 100%;
    border-radius: 5px;
    padding: 10px 5px 10px 5px;
    box-sizing: border-box;
}

.group{
    display: flex;
    justify-content: space-between;
    gap: 25px;
}

.group-input{
    width: 100%;
}

.input-btn{
  width: 100%;
  background: #151d2a;
  color: white;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>