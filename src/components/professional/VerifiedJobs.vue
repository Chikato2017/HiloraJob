<template>
    <div class="verified-jobs-component">
        <div class="top-badge-container">
            <div class="left">
                <p class="text-badge">VERIFIED TALENT MATCHING</p>
                <h1 class="left-h1">Explore Roles at Verified Companies</h1>
                <p class="left-p">
                    Every job opening below is verified and posted by audited corporate 
                    partners. Match scores are calculated directly against your verified skill portfolio.
                </p>
            </div>
            <div class="right">
                <div class="no-of-matches">
                    <h4 class="five">2</h4>
                    <p>High Skill Matches (>70%)</p>
                </div>
                <div class="no-of-applications">
                    <h4 class="two">0</h4>
                    <p>Applications Submitted</p>
                </div>
            </div>
        </div>
        <div class="search-container">
            <div class="search" id="nav-menu">
                <img src="../../assets/search.svg" alt="">
                <input type="search" name="" placeholder="Search Professionals, Companies, Jobs & Skills..." 
                id="">
            </div>
            <div class="job-type-search">
                <select name="job-types" id="job-types">
                    <option value="all" selected>All Job Types</option>
                    <option value="full">Full Time</option>
                    <option value="part">Part-Time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                </select>
            </div>
            <div class="sort-search">
                <select name="sort" id="sort">
                    <option value="all" selected>Most Recent</option>
                    <option value="full">Best Skill Match</option>
                    <option value="contract">Highest Salary</option>
                </select>
            </div>
        </div>
        <div class="profiles">
            <div class="profile" v-for="job in jobs" v-bind:key="job.id">
                <div class="details">
                    <img class="img" src="../../assets/benz.jpg" alt="">
                    <div class="name-and-others">
                        <div class="name">{{job.employer.company_name}}</div>
                        <div class="location">
                            {{job.location}}
                        </div>
                    </div>
                    <p class="status-p">
                        VISIBLE
                    </p>
                </div>
                <div class="discipline-tag">
                    <strong>{{job.title}}</strong>
                </div>
                <div class="price">
                    <p class="salary">₦{{job.salary}}</p>
                    <p class="job-type">{{job.job_type}}</p>
                </div>
                <div class="about">
                    {{job.description}}
                </div>
                <div class="skills">
                    <p v-for="skill in job.requirements" :key="skill.id">
                        {{skill}}</p>
                </div>
                <div class="pay">

                </div>
                <div class="profile-btns">
                    <p class="time-p">Posted: <strong>
                        {{ new Date(job.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) }}
                        </strong>
                        </p>
                    <div class="applied-container">
                        <button v-if="jobApplications.some(app => app.job?.id === job.id)" 
                            class="approve" disabled>
                            Applied
                        </button>
        
                        <button v-else @click="apply(job.id)" class="approve-cmp">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="apply-container" @click.self="close">
            <AddApplication v-if="currentJob" v-bind:profileDetails="profileDetails" 
            v-bind:currentJob="currentJob" @close="close"/>
        </div>
        
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'
import AddApplication from '../modal/AddApplication'

export default {
    name: 'VerifiedJobs',
    components: {
        AddApplication,
    },
    data(){
        return{
            jobs: [],
            currentJob: null,
            profileDetails: null,
            jobApplications: []
        }
    },
    async mounted(){
        try {
            const { data, error } = await supabase
            .from("Job")
            .select("*, employer(company_name)")
            .order("id", { ascending: false });

            if (error) throw error

            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            const userId = user.id;

            const { data: professionalCheck, error: dBError} = await supabase
            .from('Professional')
            .select('*')
            .eq('user', userId)
            .maybeSingle();
            
            if (dBError) throw dBError;

            this.profileDetails = professionalCheck;

            this.jobs = data || []
            this.fetchJobApplications()

        } catch (err) {
            console.error("Error fetching tasks:", err.message)
        }
        const modalApply = document.querySelector(".apply-container")
        modalApply.style.display = "none"
    },
    methods: {
        async apply(id){
            try{
                const {data, error} = await supabase
                .from("Job")
                .select("*, employer(company_name)")
                .eq("id", id)
                .maybeSingle();

                if (error) throw error;

                this.currentJob = data
                console.log(data)
            }catch(err){
                console.error("Error fetching tasks:", err.message)
            }
            const modalApply = document.querySelector(".apply-container")
            modalApply.style.display = "flex"
        },
        close(){
            const modalApply = document.querySelector(".apply-container")
            modalApply.style.display = "none"
            this.currentJob = null
            this.fetchJobApplications()
        },
        async fetchJobApplications(){
            try{
                const { data, error } = await supabase
                .from("JobApplication")
                .select("*, job(id)")
                .eq('professional', this.profileDetails.id)

                if (error) throw error

                this.jobApplications = data 
            }catch(err){
                console.error("Error fetching tasks:", err.message)
            }
        }
    }
}
</script>

<style scoped>
    .verified-jobs-component{
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .top-badge-container{
        background: #151d2a;
        padding: 25px;
        color: white;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        gap: 15px;
    }

    .text-badge{
        background: #2563eb;
        color: #ffffff;
        width: 35%;
        font-size: 12.5px;
        font-weight: 600;
        text-align: center;
        border-radius: 10px;
    }

    .left{
        width: 70%;
        align-content: center;
    }

    .right{
        width: 30%;
        display: flex;
        gap: 10px;
        background: #4b658b5e;
        border-radius: 10px;
        border: 1px solid #80a3d85e;
        padding: 15px;
    }

    .left-h1{
        font-size: 25px;
    }

    .left-p{
        width: 80%;
        font-size: 13px;
    }

    .right h4{
        font-size: 30px;
    }

    .five{
        color: #f59e0b;
    }
    
    .two{
        color: #10b981;
    }

    .right p{
        font-size: 11.5px;
    }

    .no-of-matches, .no-of-applications{
        text-align: center;
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
    
    .profiles{
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
        grid-template-rows: auto;              
        gap: 20px;
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

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .name{
        color: #151d2a;
        font-size: 13.5px;
        font-weight: 800;
    }

    .discipline-tag{
        color: #151d2a;
        font-size: 17px;
        letter-spacing: -1px;
    }

    .price{
        display: flex;
        gap: 15px;
    }

    .salary, .job-type{
        background:#80a3d85e;
        font-size: 11px;
        font-weight: 600;
        padding: 3px;
        border-radius: 4px;
    }

    .location{
        color: #6b7280;
        font-size: 13px;
    }

    .status-p{
        font-size: 11.5px;
        background: #848c9c96;
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
        background: #3068e04f;
        padding: 1px 5px 1px 5px;
        border-radius: 5px;
    }

    .profile-btns{
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .time-p{
        font-size: 11.5px;
        width: 100%;
    }

    .approve-cmp{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        width: 100%;
    }

    .approve{
        background: #7ae7c34f;
        padding: 10px;
        border: 1px solid #b7cac5d7;
        color: #10b981;
        font-weight: 600;
        border-radius: 10px;
        width: 100%;
    }

    .applied-container{
        width: 100%;
    }
    
    .apply-container{
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