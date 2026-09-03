<template>
    <div class="viewjob-modal">
        <h1 class="h1">Open Positions</h1>
        <div v-if="company_jobs.length > 0" class="profiles">
            <div class="profile" v-for="job in company_jobs" v-bind:key="job.id">
                <div class="details">
                    <img class="img" src="../../assets/benz.jpg" alt="">
                    <div class="name-and-others">
                        <div v-if="company_view" class="name">{{company_view.company_name}}</div>
                        <div class="location">
                            {{job.location}}
                            <div class="price">
                                <p class="salary">₦{{job.salary}}</p>
                                <p class="job-type">{{job.job_type}}</p>
                            </div>
                        </div>
                    </div>
                    <p class="status-p">
                        Verified
                    </p>
                </div>
                <div class="discipline-tag">
                    <strong>{{job.title}} </strong>
                </div>
                
                <div class="about">
                    {{ job.description?.length > 70 ? job.description.slice(0, 70) + '...' : job.description }}
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
                    <div v-if="profileDetails?.is_verified ==='Approved'" class="applied-container">
                        <button v-if="jobApplications.some(app => app.job?.id === job.id)" 
                            class="approve" disabled>
                            Applied
                        </button>
        
                        <button v-else @click="apply(job.id)" class="approve-cmp">
                            Apply
                        </button>
                    </div>
                    <div class="not-approved" v-else>
                        <p class="time-p">You cannot apply</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div v-else>
            <p class="no-jobs">No Jobs created</p>
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
    name: 'ViewJobs',
    props: ['company_jobs', 'company_view', 'profileDetails'],
    components: {
        AddApplication,
    },
    data(){
        return{
            jobApplications: [],
            currentJob: null,
        }
    },
    async mounted(){
        this.fetchJobApplications()
    },
    methods: {
        async fetchJobApplications(){
            try{
                const { data, error } = await supabase
                .from("JobApplication")
                .select("*, job(id)")
                .eq('professional', this.profileDetails.id)

                if (error) throw error

                this.jobApplications = data 
            }catch(err){
                console.error("Error fetching job application:", err.message)
            }
        },
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
                console.error("Error fetching jobs:", err.message)
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
    }
}
</script>

<style scoped>
    .viewjob-modal{
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        width: 100%;
        max-width: 55%;        /* Limits width on desktop monitors */
        box-shadow: 14px 10px 25px -5px rgba(122, 116, 116, 0.26), 0 8px 10px -6px rgba(49, 46, 46, 0.336);
        max-height: 75vh;
        display: flex;
        flex-direction: column;
        gap: 5px;
        box-sizing: border-box;
        overflow-y: auto; 
    }

    .h1{
        font-size: 18px;
    }

    .profiles{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .profile{
        display: flex;
        flex-direction: column;
        gap: 8px;
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

    .name-and-others{
        width: 75%;
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
        background:#5983c25e;
        font-size: 11px;
        font-weight: 600;
        padding: 3px;
        border-radius: 4px;
        color: #151d2a;
    }

    .location{
        color: #6b7280;
        font-size: 13px;
    }

    .status-p{
        font-size: 11.5px;
        background: #6fb9a038;
        padding: 5px 10px 5px 10px;
        border-radius: 10px;
        border: 1px solid #10b981;
        align-self: flex-start;
        font-weight: 600;
        color: #10b981;
    }

    .about{
        border-radius: 10px;
        font-size: 12.5px;
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

    .not-approved{
        border: 1px solid #b7becad7;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
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

    .no-jobs{
        font-size: 14px;
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