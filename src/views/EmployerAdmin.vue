<template>
    <EmployerNav v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail"/>
    <div class="admin">
        <div class="left-side">
            <EmployerSidebar />
        </div>
        <div class="right-side">
            <router-view v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail" 
            @update-profile="updateProfile" :jobs="jobs" :companies="companies" 
            :professionals="professionals" :jobApplications="jobApplications" @reload="reload">

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
            jobs: [],
            companies: [],
            professionals: [],
            jobApplications: [],
        }
    },
    async mounted(){
        this.fetchEmployer()
        this.fetchJobs()
        this.fetchEmployers()
        this.fetchProfessionals()
        this.fetchApplications()
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
                    tax_no: updateProfile.tax_no,
                    profile_img: updateProfile.profile_img,
                    reg_doc: updateProfile.reg_doc,
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
        },
        async fetchJobs(){
            try {
                const { data, error } = await supabase
                .from("Job")
                .select("*")
                .order("id", { ascending: false })

                if (error) throw error

                this.jobs = data || []
            } catch (err) {
                console.error("Error fetching tasks:", err.message)
            }
        },
        async fetchEmployers(){
            try {
                const { data, error } = await supabase
                .from("Employer")
                .select("*")
                .eq('is_verified', 'Verified')
                .order("id", { ascending: false })

                if (error) throw error

                this.companies = data || []
            } catch (err) {
                console.error("Error fetching tasks:", err.message)
            }
        },
        async fetchProfessionals(){
             try {
                const { data, error } = await supabase
                .from("Professional")
                .select("*")
                .eq('is_verified', 'Approved')
                .order("id", { ascending: false })

                if (error) throw error

                this.professionals = data || []
            } catch (err) {
                console.error("Error fetching tasks:", err.message)
            }
        },
        async fetchApplications(){
            try {
                const { data, error } = await supabase
                .from("JobApplication")
                .select("*, professional:Professional(*), job:Job(*)")
                //.eq('status', 'Verified')
                .order("id", { ascending: false })

                if (error) throw error

                this.jobApplications = data || []
            } catch (err) {
                console.error("Error fetching tasks:", err.message)
            }
        },
        async reload(){
            this.fetchEmployer()
            this.fetchJobs()
            this.fetchEmployers()
            this.fetchProfessionals()
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