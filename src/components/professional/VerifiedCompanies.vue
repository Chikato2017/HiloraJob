<template>
    <div class="verified-company-component">
        <div class="top-badge-container">
            <div class="left">
                <p class="text-badge">VERIFIED EMPLOYERS MATCHING</p>
                <h1 class="left-h1">Explore all Verified Companies</h1>
                <p class="left-p">
                    Every company and employer below is verified and posted by Hilora.
                    Match scores are calculated directly against your verified skill portfolio.
                </p>
            </div>
            <div class="right">
                <div class="no-of-matches">
                    <h4 class="five">5</h4>
                    <p>High Skill Matches (>70%)</p>
                </div>
                <div class="no-of-applications">
                    <h4 class="two">2</h4>
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
                    <option value="all" selected>Industries</option>
                    <option value="full">Full Time</option>
                    <option value="part">Part-Time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                </select>
            </div>
            <div class="sort-search">
                <select name="sort" id="sort">
                    <option value="all" selected>Job Openings</option>
                    <option value="full">Best Skill Match</option>
                    <option value="contract">Highest Salary</option>
                </select>
            </div>
        </div>
        <div class="profiles">
            <div class="profile" v-for="company in companies" v-bind:key="company.id">
                <div class="details">
                    <img class="img" src="../../assets/benz.jpg" alt="">
                    <div class="name-and-others">
                        <div class="name">{{company.company_name}}</div>
                        <div class="discipline-tag">
                            {{company.industry}}
                        </div>
                        <div class="location">
                            {{company.address}} 
                        </div>
                    </div>
                    <p class="status-p">
                        VISIBLE
                    </p>
                </div>
                <div class="about">
                    {{company.about}}
                </div>
                <div class="skills">
                    Job Openings
                </div>
                <div class="profile-btns">
                    <button @click="displayProf(company)" class="inspect">View Profile</button>
                    <button class="approve approve-cmp">View Jobs</button>
                </div>
            </div>
        </div>
        <div class="view-employer-container" @click.self="close">
            <ViewEmployer v-if="employerProfile" v-bind:employerProfile="employerProfile" @close="close"/>
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'
import ViewEmployer from '../modal/ViewEmployer'

export default {
    name: 'VerifiedCompanies',
    components: {
        ViewEmployer
    },
    data(){
        return{
            companies: [],
            employerProfile: null,
        }
    },
    async mounted(){
        try {
            const { data, error } = await supabase
            .from("Employer")
            .select("*")
            .order("id", { ascending: false })

            if (error) throw error

            this.companies = data || []
        } catch (err) {
            console.error("Error fetching tasks:", err.message)
        }
    },
    methods: {
        displayProf(professional){
            this.employerProfile = professional
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "flex"
        },
        close(){
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "none"
            this.employerProfile = null
        },
    }
}
</script>

<style scoped>
    .verified-company-component{
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

    .view-employer-container{
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