<template>
    <div class="employer-talent-component">
        <div class="top-block">
            <div class="top-block-text">
                <div class="top-text">
                    <h1>Verified Talent Pool</h1>
                    <p v-if="professionals">{{professionals.length}} Active</p>
                </div>
                <p class="top-p">Browse vetted and compliance-checked engineers,
                     designers, and specialists ready for immediate hire.</p>
            </div>
            <div class="top-block-btn">
                <div class="job-type-search">
                    <select name="job-types" id="job-types">
                        <option value="all" selected>Job Type</option>
                        <option value="full">Full Time</option>
                        <option value="part">Part-Time</option>
                        <option value="remote">Remote</option>
                        <option value="contract">Contract</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="verification-bar">
            <div class="verification-stages">
                <div class="all">All Disciplines</div>
                <div class="pending">Engineering (2)</div>
                <div class="approved">Data Science (4)</div>
                <div class="rejected">AI (3)</div>
            </div>
        </div>
        <div class="search-container">
            <div class="search" id="nav-menu">
                <img src="../../assets/search.svg" alt="">
                <input type="search" name="" placeholder="Search Jobs & Skills..." 
                id="">
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
            <div class="profile" v-for="professional in professionals" v-bind:key="professional.id">
                <div class="details">
                    <div class="img-div">
                        <img class="img" src="../../assets/benz.jpg" alt="">
                    </div>
                    <div class="name-and-others">
                        <div class="name">{{professional.full_name}}</div>
                        <div class="discipline-tag">
                            {{professional.title}}
                        </div>
                        <div class="location">
                            {{professional.location}}
                        </div>
                    </div>
                    <p class="status-p">
                        VISIBLE
                    </p>
                </div>
                <div class="about">
                    {{professional.bio}}
                </div>
                <div class="skills">
                    <p v-for="skill in professional.skills" :key="skill.id">
                        {{skill}}</p>
                </div>
                <div class="pay">

                </div>
                <div class="profile-btns">
                    <button  @click="displayProf(professional)" class="inspect">View Profile</button>
                    <button class="approve approve-cmp">Invite</button>
                </div>
            </div>
            <div class="view-professional-container" @click.self="close">
                <ViewProfessional v-if="profProfile" v-bind:profProfile="profProfile" @close="close"/>
            </div>
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'
import ViewProfessional from '../modal/ViewProfessional'

export default {
    name: 'EmployerTalents',
    components: {
        ViewProfessional
    },
    data(){
        return{
            professionals: [],
            profProfile: null,
        }
    },
    async mounted(){
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
    methods: {
        displayProf(professional){
            this.profProfile = professional
            const modalProfessional = document.querySelector(".view-professional-container")
            modalProfessional.style.display = "flex"
        },
        close(){
            const modalProfessional = document.querySelector(".view-professional-container")
            modalProfessional.style.display = "none"
            this.profProfile = null
        },
    }
}
</script>

<style scoped>
    .employer-talent-component{
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

    .pending{
        background: #f59f0b8c;
        border: 1px solid #f59e0b;
    }

    .approved{
        background: #10b98183;
        border: 1px solid #10b981;
    }

    .rejected{
        background: rgba(255, 0, 0, 0.521);
        border: 1px solid red;
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
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
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
        width: 100%;
    }

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .img-div{
        width: 20%;
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

    .name-and-others{
        width: 65%;
    }

    .status-p{
        font-size: 13.5px;
        padding: 5px 10px 5px 10px;
        border-radius: 10px;
        font-weight: 600;
        width: 25%;
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
        width: 100%;
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

    .view-professional-container{
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