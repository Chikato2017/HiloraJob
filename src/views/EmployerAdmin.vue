<template>
    <EmployerNav v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail"/>
    <div class="admin">
        <div class="left-side">
            <EmployerSidebar />
        </div>
        <div class="right-side">
            <router-view v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail" @update-profile="updateProfile">

            </router-view>
        </div>
    </div>
    
</template>

<script>
import {supabase} from '../supabase-client.ts'
import EmployerSidebar from '../components/employer/EmployerSidebar'
import EmployerNav from '../components/employer/EmployerNav'

export default {
    name: 'EmployerAdmin',
    components: {
        EmployerNav,
        EmployerSidebar,
    },
    data(){
        return{
            userEmail: '',
            profileDetails: null,
        }
    },
    async mounted(){
        this.fetchEmployer()
    },
    methods:{
        async updateProfile(updateProfile){
            try{
                const { error } = await supabase
                .from("Employer")
                .update({
                    company_name: updateProfile.company_name,
                    industry: updateProfile.industry,
                    phone_no: updateProfile.phone_no,
                    website: updateProfile.website,
                    address: updateProfile.address,
                    company_size: updateProfile.company_size,
                    about: updateProfile.about,
                })
                .eq("id", this.profileDetails.id);

                if (error) throw error;
                
                alert("Saved Profile Details");
                this.fetchEmployer();

            }catch(err){
                console.error("Error matching user state:", err.message)
            }
        },
        async fetchEmployer(){
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError) throw authError;

                const userId = user.id;
                this.userEmail = user.email

                const { data: employerCheck, error: dBError} = await supabase
                .from('Employer')
                .select('*')
                .eq('user', userId)
                .maybeSingle();
                
                if (dBError) throw dBError;

                this.profileDetails = employerCheck;
                
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