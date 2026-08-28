<template>
    <ProfessionalNav v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail" />
    <div class="admin">
        <div class="left-side">
            <ProfessionalSidebar />
        </div>
        <div class="right-side">
            <router-view v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail" @update-profile="updateProfile">

            </router-view>
        </div>
    </div>
    
</template>

<script>
import {supabase} from '../supabase-client.ts'
import ProfessionalSidebar from '../components/professional/ProfessionalSidebar'
import ProfessionalNav from '../components/professional/ProfessionalNav'

export default {
    name: 'ProfessionalAdmin',
    components: {
        ProfessionalNav,
        ProfessionalSidebar,
    },
    data(){
        return{
            userEmail: '',
            profileDetails: null,
        }
    },
    async mounted(){
        this.fetchProfessional()
    },
    methods:{
        async updateProfile(updateProfile){
            try{
                const { error } = await supabase
                .from("Professional")
                .update({
                    full_name: updateProfile.full_name,
                    title: updateProfile.title,
                    phone_no: updateProfile.phone_no,
                    years_of_experience: updateProfile.years_of_experience,
                    location: updateProfile.location,
                    type: updateProfile.type,
                    rate: updateProfile.rate,
                    portfolio_url: updateProfile.portfolio_url,
                    bio: updateProfile.bio,
                    education: updateProfile.education
                })
                .eq("id", this.profileDetails.id);

                if (error) throw error;
                
                alert("Saved Profile Details");
                this.fetchProfessional();

            }catch(err){
                console.error("Error matching user state:", err.message)
            }
        },
        async fetchProfessional(){
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError) throw authError;

                const userId = user.id;
                this.userEmail = user.email

                const { data: professionalCheck, error: dBError} = await supabase
                .from('Professional')
                .select('*')
                .eq('user', userId)
                .maybeSingle();
                
                if (dBError) throw dBError;

                this.profileDetails = professionalCheck;
                
            } catch (err) {
                console.error("Error matching user state:", err.message)
            }
        }
    }
}
</script>

<style scoped>
    .admin{
        display: flex;
    }

    .left-side{
        padding: 100px 30px 100px 30px;
        width: 20%;
        min-height: 100vh;
        display: flex;
        flex-direction: column; 
        overflow: hidden;
        box-sizing: border-box;
        border-right: 1px solid #8d95a563;
    }
    
    .right-side{
        padding: 100px 40px 100px 40px;
        background: #F8FAFC;
        width: 80%;
        min-height: 100vh;
        display: flex;
        flex-direction: column; 
        overflow: hidden;
        box-sizing: border-box;
    }
</style>