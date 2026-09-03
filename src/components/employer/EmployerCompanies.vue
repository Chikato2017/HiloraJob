<template>
    <div class="employer-company-component">
        <div class="top-block">
            <div class="top-block-text">
                <div class="top-text">
                    <h1>Verified Companies</h1>
                    <p v-if="companies">{{companies.length}} Active</p>
                </div>
                <p class="top-p">Browse vetted and compliance-checked companies,
                     and their profiles.</p>
            </div>
        </div>
        <div class="verification-bar">
            <div class="verification-stages">
                <div class="all">All Industries</div>
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
            <div class="profile" v-for="company in companies" v-bind:key="company.id">
                <div class="details">
                    <img class="img" :src="company.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
                    <div class="name-and-others">
                        <div class="name">{{company.company_name}}</div>
                        <div class="discipline-tag">
                            {{company.industry}}
                        </div>
                        <div class="location">
                            {{company.address}}
                        </div>
                    </div>
                    
                </div>
                <div class="about">
                    {{company.about}}
                </div>
                
                <div class="pay">

                </div>
                <div class="profile-btns">
                    <button @click="displayProf(company)" class="inspect">View Profile</button>
                    <button @click="displayJobs(company)" class="approve approve-cmp">View Jobs</button>
                </div>
            </div>
            <div class="view-employer-container" @click.self="close">
                <ViewEmployer v-if="employerProfile" v-bind:employerProfile="employerProfile" @close="close"/>
            </div>
            <div class="view-job-container" @click.self="closeJob">
                <ViewJobs v-if="company_jobs" :company_jobs="company_jobs" :company_view="company_view"
                 @close="closeJob"/>
            </div>
        </div>
    </div>
</template>

<script>
//import {supabase} from '../../supabase-client.ts'
import ViewEmployer from '../modal/ViewEmployer'
import ViewJobs from '../modal/ViewJobs'

export default {
    name: 'EmployerCompanies',
    props: ['jobs', 'companies'],
    components: {
        ViewEmployer,
        ViewJobs,
    },
    data(){
        return{
            employerProfile: null,
            company_jobs: [],
            company_view: null,
        }
    },
    methods: {
        displayProf(company){
            this.employerProfile = company
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "flex"
        },
        displayJobs(company){
            if (!this.jobs || !Array.isArray(this.jobs)) {
                this.company_jobs = [];
            } 
            else {
                this.company_jobs = this.jobs.filter(job => {
                    return job.employer === company.id
                })
                
            }
            this.company_view = company
            const modalJobs = document.querySelector(".view-job-container")
            modalJobs.style.display = "flex"
        },
        close(){
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "none"
            this.employerProfile = null
        },
        closeJob(){
            const modalJobs = document.querySelector(".view-job-container")
            modalJobs.style.display = "none"
        }
    }
}
</script>

<style scoped>
.employer-company-component{
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
    }

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
        width: 80%;
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

    .view-employer-container, .view-job-container{
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