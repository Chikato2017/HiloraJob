<template>
    <AdminNav />
    <div class="admin">
        <div class="left-side">
            <AdminSidebar />
        </div>
        <div class="right-side">
            <router-view v-bind:professionals="professionals" v-bind:companies="companies" :jobs="jobs"
            @approveProfile="approveProfile" @approveEmpProfile="approveEmpProfile"></router-view>
        </div>
    </div>
    
</template>

<script>
import {supabase} from '../supabase-client.ts'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNav from '../components/admin/AdminNav'

export default {
    name: 'AppAdmin',
    components: {
        AdminNav,
        AdminSidebar,
    },
    data(){
        return{
            professionals: [],
            companies: [],
            jobs: [],
        }
    },
    async mounted(){
        this.fetchProfessionals()
        this.fetchCompanies()
        this.fetchJobs()
        //this.approveProfile()
    },
    methods: {
        async fetchProfessionals(){
            const { data, error } = await supabase
            .from("Professional")
            .select("*")
            .order("id", { ascending: false })
            
            if (error) throw error

            this.professionals = data || []
        },
        async fetchCompanies(){
            const { data, error } = await supabase
            .from("Employer")
            .select("*")
            .order("id", { ascending: false })
            
            if (error) throw error

            this.companies = data || []
        },
        async fetchJobs(){
            const { data, error } = await supabase
            .from("Job")
            .select("*, employer(company_name)")
            .order("id", { ascending: false })
            
            if (error) throw error

            this.jobs = data || []
        },
        async approveProfile(profile){
            try{
                const { error } = await supabase
                .from("Professional")
                .update({
                    is_verified: 'Approved',
                })
                .eq("id", profile.id);

                if (error) throw error;
                
                this.fetchProfessionals();
                alert("profile Approved");
                
            }catch(err){
                console.error("Error matching user state:", err.message)
            }
        },
        async approveEmpProfile(profile){
            try{
                const { error } = await supabase
                .from("Employer")
                .update({
                    is_verified: 'Verified',
                })
                .eq("id", profile.id);

                if (error) throw error;
                
                this.fetchCompanies();
                alert("profile Approved");
                
            }catch(err){
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