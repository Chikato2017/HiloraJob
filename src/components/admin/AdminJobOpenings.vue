<template>
    <div class="job-opening-component">
        <div class="professional-header">
            <div class="text">
                <div class="text-heading">
                    <h1>Company Job Listings & Open Positions</h1>
                    <div v-if="jobs" class="total">{{jobs.length}} Total</div>
                </div>
                <p class="text-p">Select any job opening to run the Hilora algorithm and match verified professionals by required skill sets.</p>
            </div>
            
        </div>
        <div class="verification-bar">
            <div class="verification-stages">
                <div class="all">All Jobs</div>
                <div class="pending">Engineering (2)</div>
                <div class="approved">Design (4)</div>
                <div class="rejected">Finance (2)</div>
            </div>
        </div>
        <div class="profiles">
            <div v-for="job in jobs" :key="job.id" class="profile">
                <div class="details">
                    <img class="img" src="../../assets/benz.jpg" alt="">
                    <div class="name-and-others">
                        <div class="name">{{job.employer.company_name}}</div>
                        <div class="discipline-tag">
                            {{job.title}}
                        </div>
                        <div class="location">
                            {{job.location}}
                        </div>
                    </div>
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
                    <button v-if="professionals" class="inspect">
                        {{professionals.length}} Qualified Talents</button>
                    <button @click="displayProf" class="approve approve-cmp">Match Candidates</button>
                </div>
            </div>
            <div class="view-professionals-container" @click.self="close">
                <ViewProfessionals v-if="professionals" :professionals="professionals" @close="close"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import ViewProfessionals from '../modal/ViewProfessionals'

export default {
    name: 'AdminJobOpenings',
    props: ['jobs', 'professionals'],
    components: {
        ViewProfessionals
    },
    methods: {
        displayProf(){
            const modalProfessional = document.querySelector(".view-professionals-container")
            modalProfessional.style.display = "flex"
        },
        close(){
            const modalProfessional = document.querySelector(".view-professionals-container")
            modalProfessional.style.display = "none"
        },
    },
}
</script>

<style scoped>
    .job-opening-component{
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .professional-header{
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }

    .text{
        display: flex;
        flex-direction: column;
    }

    .text-heading{
        display: flex;
        gap: 10px;
    }

    .text-heading h1{
        font-size: 20px;
        color: #151d2a;
    }

    .total{
        background: #ff5524;
        padding: 1px 4px 1px 4px;
        border-radius: 10px;
        color: white;
        align-content: center;
        font-size: 11.5px;
        font-weight: 600;
    }

    .text-p{
        color: #151d2a;
        font-size: 12.5px;
    }

    .button-container{
        align-content: center;
    }

    .reg-prof{
        background:#ff5524;
        padding: 10px;
        color: white;
        border-radius: 10px;
    }

    .verification-bar{
        background: white;
        padding: 15px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid #b7becad7;
    }

    .verification-stages, .disciplines{
        display: flex;
        gap: 15px;
    }

    .line{
        background: #9caf9f7e;
        height: 1px;
    }

    .pending, .approved, .rejected, .all{
        font-size: 13.5px;
        padding: 1px 15px 1px 15px;
        border-radius: 5px;
        font-weight: 600;
    }

    .all{
        background: #151d2a;
        color: white;
    }

    .pending, .approved, .rejected{
        background: #cfd7e6;
        border: 1px solid #9ca3af;
    }

    .discipline{
        background: #cdd1d6;
        font-size: 13px;
        padding: 0px 15px 0px 15px;
        border-radius: 5px;
    }

    .discipline-p{
        font-size: 13px;
        font-weight: 600;
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
        font-size: 13px;
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

    .inspect{
        background: white;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: #6b7280;
        border-radius: 10px;
        width: 100%;
        font-weight: 600;
        font-size: 12px;
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        width: 100%;
        font-size: 12px;
    }

    .view-professionals-container{
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