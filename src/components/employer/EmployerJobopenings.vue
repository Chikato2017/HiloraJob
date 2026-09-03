<template>
    <div class="employer-job-component">
        <div class="top-block">
            <div class="top-block-text">
                <div class="top-text">
                    <h1>My Job Opening</h1>
                    <p v-if="my_jobs">{{my_jobs.length}} Active</p>
                </div>
                <p class="top-p">Manage your posted positions, track incoming verified applicants, 
                    and initiate skill matches.</p>
            </div>
            <div v-if="profileDetails" class="top-block-btn">
                <button  v-if="profileDetails.is_verified?.includes('Verified')"
                @click="addJob" class="post-btn">Post New Job</button>
            </div>
        </div>
        <div class="stats">
            <div class="professionals">
                <div class="header">
                    <h4>ACTIVE OPENINGS</h4>
                    <h1>{{my_jobs.length}}</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/jobs-two.svg" alt="">
                </div>
            </div>
            <div class="companies">
                <div class="header">
                    <h4>TOTAL APPLICANTS</h4>
                    <h1>0</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/professional-three.svg" alt="">
                </div>
            </div>
            <div class="openings">
                <div class="header">
                    <h4>SHORTLISTED CANDIDATES</h4>
                    <h1>0</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/professional-two.svg" alt="">
                </div>
            </div>
            <div class="openings">
                <div class="header">
                    <h4>VERIFIED TALENT POOL</h4>
                    <h1>{{professionals.length}}</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/professional.svg" alt="">
                </div>
            </div>
        </div>
        <div class="search-container">
            <div class="search" id="nav-menu">
                <img src="../../assets/search.svg" alt="">
                <input type="search" name="" placeholder="Search Jobs & Skills..." 
                id="">
            </div>
            <div class="job-type-search">
                <select name="job-types" id="job-types" v-model="selectedType">
                    <option value="all" selected>All Job Types</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                </select>
            </div>
            <div class="sort-search">
                <select name="sort" id="sort">
                    <option value="all" selected>All Statuses</option>
                    <option value="full">Best Skill Match</option>
                    <option value="contract">Highest Salary</option>
                </select>
            </div>
        </div>
        <div class="profiles-container">
            <div class="profile" v-for="job in filteredMyJobs" :key="job.id">
                <div class="details">
                    <div class="name-and-others">
                        <div class="name">{{job.title}} • <span class="job_type">
                            ({{job.job_type}})</span></div>
                        <div class="discipline-tag">
                           {{job.location}}
                        </div>
                    </div>
                    <p class="status-p">
                        ₦{{job.salary}}
                    </p>
                </div>
                <div class="about">
                    {{job.description}}
                </div>
                <div class="skills">
                    <p v-for="skill in job.requirements" :key="skill.id">
                        {{skill}}</p>
                </div>
                <div class="profile-bottom">
                    <div class="job-info">
                        <div class="info">
                            <p>1</p>
                            <p>Applicant</p>
                        </div>
                    </div>
                    <div class="profile-btns">
                        <button @click="editJob(job)" class="inspect">Edit Job</button>
                        <button class="approve approve-cmp">Candidate Pipeline</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="addjobs-container" @click.self="close">
            <AddJobs v-bind:profileDetails="profileDetails" v-bind:userEmail="userEmail"  
            @close="close"/>
        </div>
        <div class="editjobs-container" @click.self="closeEdit">
            <EditJobs v-bind:profileDetails="profileDetails" 
            v-bind:job="job" @close="closeEdit"/>
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'
import AddJobs from '../modal/AddJobs'
import EditJobs from '../modal/EditJobs'

export default {
    name: 'EmployerJobopenings',
    props: ['profileDetails', 'userEmail'],
    emits: ['reload'],
    components: {
        AddJobs,
        EditJobs
    },
    data(){
        return{
            my_jobs: [],
            professionals: [],
            employerId: null,
            selectedType: 'all',
            job: null,
        }
    },
    computed: {
        // 5. This computed property dynamically filters the visibility stream
        filteredMyJobs() {
            if (this.selectedType === 'all') {
                return this.my_jobs;
            }
            // Case-insensitive match comparing choice parameters directly
            return this.my_jobs.filter(my_job => {
                return my_job.job_type?.toLowerCase() === this.selectedType.toLowerCase();
            });
        }
    },
    async mounted(){
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            const authUuid = user.id;

            const { data: employerProfile, error: profileError } = await supabase
            .from('Employer')
            .select('id') // We only need the primary key ID
            .eq('user', authUuid)
            .maybeSingle();

            if (profileError) throw profileError;
            
            this.employerId = employerProfile.id;

            this.fetchJobs()

            const { data: profProfile, error: profError } = await supabase
            .from("Professional")
            .select("*")
            .eq('is_verified', 'Approved')
            .order("id", { ascending: false })
            if (profError) throw profError

            
            this.professionals = profProfile || []

        } catch (err) {
            console.error("Error fetching tasks:", err.message)
        }
    },
    methods:{
        addJob(){
            const modalAddJob = document.querySelector(".addjobs-container")
            modalAddJob.style.display = "flex"
        },
        close(){
            this.fetchJobs() 
            const modalAddJob = document.querySelector(".addjobs-container")
            modalAddJob.style.display = "none"
            this.$emit('reload')
        },
        editJob(job){
            this.job = job
            const modalEditJob = document.querySelector(".editjobs-container")
            modalEditJob.style.display = "flex"
        },
        closeEdit(){
            this.fetchJobs() 
            const modalEditJob = document.querySelector(".editjobs-container")
            modalEditJob.style.display = "none"
            this.$emit('reload')
        },
        async fetchJobs(){
            const { data, error } = await supabase
            .from("Job")
            .select("*")
            .eq("employer", this.employerId)
            .order("id", { ascending: false })
            if (error) throw error

            this.my_jobs = data || []
        }
    }
}
</script>

<style scoped>
     .employer-job-component{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .post-btn{
        background: #151d2a;
        padding: 12px 10px 12px 10px;
        border-radius: 10px;
        color: white;
        font-size: 12.5px;
    }

    .top-block{
        background: white;
        display: flex;
        gap: 50px;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #9ea5b188;
        justify-content: space-between;
    }
    
    .top-text{
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .top-text h1{
        font-size: 25px;
    }

    .top-text p{
        font-size: 12.5px;
        background: #9ea5b188;
        padding: 5px;
        border-radius: 5px;
    }

    .top-p{
        font-size: 13px;
    }

    .top-block-btn{
        align-content: center;
    }

    .stats{
        display: flex;
        gap: 15px;
        justify-content: space-between;
    }

    .professionals, .companies, .openings, .percentage{
        display: flex;
        gap: 25px;
        background: white;
        padding: 20px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #b7becad7;
        justify-content: space-between;
    }

    .header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 80%;
    }

    .header h4{
        font-size: 12px;
    }

    .badge{
        width: 22px;
        height: 22px;
    }

    .info{
        align-content: center;
        width: 20%;
    }

    .search-container{
        background: white;
        padding: 20px;
        border: 1px solid #8992a363;
        border-radius: 10px;
        display: flex;
        width: 100%;
        gap: 15px;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .search {
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid #8992a363;
        border-radius: 5px;
        padding: 5px;
        background: #F8FAFC;
        width: 60%;
    }

    input[type=search]{
        border: none;
        width:100%;
        font-size: 15px;
        background: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
    }

    input[type=search]:focus{
        border: none;
        outline: none;
    }

    select{
        border: 1px solid #8992a363;
        padding: 8px;
        border-radius: 5px;
        background: #F8FAFC;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #4f545f;
        font-size: 13px;
        width: 200px;
    }

    select:focus{
        border: 1px solid #8992a363;
        outline: #8992a3;
    }

    .profiles-container{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .profile{
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: white;
        border-radius: 10px;
        border: 1px solid #b7becad7;
        padding: 15px;
    }

    .details{
        display: flex;
        gap: 5px;
        justify-content: space-between;
    }

    .job_type{
        font-weight: 400;
        font-size: 13px;
    }

    .name{
        color: #151d2a;
        font-size: 15px;
        font-weight: 800;
    }

    .discipline-tag{
        color: #151d2a;
        font-size: 12.5px;
    }

    .location{
        color: #6b7280;
        font-size: 13px;
    }

    .status-p{
        font-size: 13.5px;
        padding: 5px 10px 5px 10px;
        border-radius: 10px;
        align-self: flex-start;
        font-weight: 600;
    }

    .about{
        padding: 10px;
        border-radius: 10px;
        background: #9ca3af75;
        font-size: 11.5px;
    }

    .skills{
        display: flex;
        font-size: 11.5px;
        font-weight: 600;
        gap: 10px;
    }

    .skills p{
        background: #f59f0ba2;
        padding: 1px 5px 1px 5px;
        border-radius: 5px;
    }

    .profile-btns{
        display: flex;
        gap: 10px;
        align-items: center;
        width: 40%;
    }

    .inspect{
        background: white;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: #6b7280;
        border-radius: 10px;
        width: 100%;
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        width: 100%;
    }
    
    .profile-bottom{
        display: flex;
        justify-content: space-between;
    }

    .job-info{
        display: flex;
        width: 60%;
    }

    .job-info p{
        font-size: 13px;
    }

    .addjobs-container{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        justify-content: center; 
        align-items: center; 
        background: #adb1b96c;
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
    }

    .editjobs-container{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        justify-content: center; 
        align-items: center; 
        background: #adb1b96c;
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
    }
</style>