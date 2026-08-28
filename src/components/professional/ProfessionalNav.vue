<template>
  <header class="site-header" id="header">
    <div class="nav-container">
      <a href="#" class="brand-logo" id="brand-logo">
        <router-link to="/professional">
        <img id="hilora-logo" src="../../assets/hilora-logo.png" alt="Hilora">
        </router-link>
      </a>

      <div class="nav-menu" id="nav-menu">
        <img src="../../assets/search.svg" alt="">
        <input type="search" name="" placeholder="Search Professionals, Companies, Jobs & Skills..." 
        id="">
      </div>

      <div class="nav-actions">
        <router-link to="/professional/my-profile">
        <button v-if="profileDetails" class="btn-record">
          {{profileDetails.full_name}}
        </button>
        </router-link>
        <img src="../../assets/notifications.svg" alt="">
          <button @click="logOut" type="button" class="btn-primary" id="open-register-btn">
            Logout
          </button>
      </div>
    </div>
  </header>

</template>

<script>
import {supabase} from '../../supabase-client.ts'

export default {
    name: 'ProfessionalNav',
    props: ['profileDetails', 'userEmail'],
    methods: {
      async logOut(){
        try {
                // 1. Tell Supabase to end the session
              const { error } = await supabase.auth.signOut();
              
              if (error) throw error;

              // 3. Kick the user back to the sign-in page smoothly
              this.$router.push('/login');

          } catch (err) {
              console.error("Error signing out:", err.message);
          }
      }
    },
    
}
</script>

<style scoped>
#hilora-logo{
  width: 130px;
  height: 35px;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid #c1c7d3a8;
  box-shadow: 0px 0px 4px #c1c7d3a8;
  z-index: 1000;
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: 0.12em;
  color: #ffffff;
}

.logo-dot {
  width: 7px;
  height: 7px;
  background-color: var(--color-accent-orange);
  border-radius: 50%;
  display: inline-block;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #6b72809a;
  border-radius: 5px;
  padding: 5px;
  background: #F8FAFC;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--color-text-light-muted);
  transition: var(--transition);
}

.nav-link:hover {
  color: #ffffff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.btn-ghost {
  padding: 8px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.btn-ghost:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.btn-primary {
  padding: 10px 22px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #151d2a;
  color: #ffffff;
  border-radius: var(--radius-sm);
  letter-spacing: 0.02em;
  transition: var(--transition);
}

.btn-primary:hover {
  background-color: #ff5524;
  transform: translateY(-1px);
}

.btn-record{
  padding: 8px 20px;
  background: #e8eaec;
  border-radius: 5px;
  color: #494f5c;
  display: flex;
  gap: 5px;
  align-items: center;
  font-weight: 600;
}

.btn-record:hover{
  background: #cfd6e2d7;
  transform: translateY(-1px);
}

input[type=search]{
  border: none;
  width: 400px;
  font-size: 14px;
  background: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

input[type=search]:focus{
  border: none;
  outline: none;
}

.profile-name{
  font-size: 14px;
}
</style>