<template>
    <div class="talent-component">
        <div class="top-badge-container">
            <div class="left">
                <p class="text-badge"> Hilora Talent Network</p>
                <h1 class="left-h1">Verified Talent Directory</h1>
                <p class="left-p">
                    Explore profiles and credential matrix of top-tier verified 
                    software engineers, architects, AI researchers, and designers.
                </p>
            </div>
        </div>
        <div class="search-container">
            <div class="search" id="nav-menu">
                <img src="../../assets/search.svg" alt="">
                <input type="search" name="" placeholder="Search Professionals & Skills..." 
                id="">
            </div>
            <div class="job-type-search">
                <select name="job-types" id="job-types">
                    <option value="all" selected>Professional Types</option>
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
            <div class="profile" v-for="professional in professionals" v-bind:key="professional.id">
                <div class="details">
                    <img class="img" src="../../assets/Christina.jpg" alt="">
                    <div class="name-and-others">
                        <div class="name">{{professional.full_name}}</div>
                        <div class="discipline-tag">
                            {{professional.title}} 
                            <span class="years">• {{professional.years_of_experience}} yrs exp</span>
                        </div>
                        <div class="location">
                            {{professional.location}}
                        </div>
                    </div>
                    <p class="status-p">
                        {{professional.type}}
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
                    ₦{{professional.rate}}/annum
                </div>
                <div class="profile-btns">
                    <button @click="displayProf(professional)" class="inspect">View Profile</button>
                </div>
            </div>
        </div>
        <div class="view-professional-container" @click.self="close">
            <ViewProfessional v-if="profProfile" v-bind:profProfile="profProfile" @close="close"/>
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'
import ViewProfessional from '../modal/ViewProfessional'

export default {
    name: 'TalentNetwork',
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
            .order("id", { ascending: false });

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
    .talent-component{
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
        background: #f59e0b;
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
        color:#151d2a;
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

    .pay{
        font-size: 12.5px;
        color:#151d2a;
        font-weight: 600;
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

    .name-and-others{
        width: 60%;
    }

    .name{
        color: #151d2a;
        font-size: 14.5px;
        font-weight: 800;
    }

    .discipline-tag{
        color: #2563eb;
        font-size: 13px;
        font-weight: 600;
    }

    .years{
        color:#151d2a;
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
        width: 20%;
        text-align: center;
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
        background: #f59f0bbb;
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
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        width: 100%;
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