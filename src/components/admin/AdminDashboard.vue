<template>
    <div class="overview-component">
        <div class="stats">
            <div class="professionals">
                <div class="header">
                    <h4>PROFESSIONALS</h4>
                    <img class="badge" src="../../assets/professional-two.svg" alt="">
                </div>
                <div v-if="professionals" class="info">
                    <h1>{{professionals.length}}</h1>
                    <p>Registered</p>
                </div>
                
                <div class="stat-breakdown">
                    <div class="left-stat">
                        <img class="dashboard-icon" src="../../assets/check.svg" alt="">
                        <p v-if="approvedProfessionalCount >= 0">
                            {{ approvedProfessionalCount }} approved
                        </p>
                    </div>
                    <div class="right-stat">
                        <img class="dashboard-icon" src="../../assets/clock.svg" alt="">
                        <p v-if="notApprovedProfessionalCount >= 0">
                            {{ notApprovedProfessionalCount }} pending
                        </p>
                    </div>
                </div>
            </div>
            <div class="companies">
                <div class="header">
                    <h4>COMPANIES</h4>
                    <img class="badge" src="../../assets/company-two.svg" alt="">
                </div>
                <div v-if="companies" class="info">
                    <h1>{{companies.length}}</h1>
                    <p>Registered</p>
                </div>
                <div class="stat-breakdown">
                    <div class="left-stat">
                        <img class="dashboard-icon" src="../../assets/check.svg" alt="">
                        <p v-if="approvedCompanyCount >= 0">
                           {{approvedCompanyCount}}  approved
                        </p>
                    </div>
                    <div class="right-stat">
                        <img class="dashboard-icon" src="../../assets/clock.svg" alt="">
                        <p v-if="notApprovedCompanyCount >= 0">
                            {{notApprovedCompanyCount}} pending
                        </p>
                    </div>
                </div>
            </div>
            <div class="openings">
                <div class="header">
                    <h4>OPEN POSITIONS</h4>
                    <img class="badge" src="../../assets/jobs-two.svg" alt="">
                </div>
                <div v-if="jobs" class="info">
                    <h1>{{jobs.length}}</h1>
                    <p>Registered</p>
                </div>
                <div class="stat-breakdown">
                    <div class="left-stat">
                        <img class="dashboard-icon" src="../../assets/check.svg" alt="">
                        <p>4 Filled</p>
                    </div>
                    <div class="right-stat">
                        <img class="dashboard-icon" src="../../assets/clock.svg" alt="">
                        <p>6 Accepting</p>
                    </div>
                </div>
            </div>
            <div class="percentage">
                <div class="header">
                    <h4>MATCH ACCURACY</h4>
                    <img class="badge" src="../../assets/bullseye.svg" alt="">
                </div>
                <div class="info">
                    <h1>94%</h1>
                </div>
                <div class="stat-breakdown">
                    <div class="left-stat">
                        <img class="dashboard-icon" src="../../assets/check.svg" alt="">
                        <p>5 approved</p>
                    </div>
                    <div class="right-stat">
                        <img class="dashboard-icon" src="../../assets/clock.svg" alt="">
                        <p>4 pending</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="top-profiles-for-approval">
            <div class="left-overview">
                <div class="left-profile">
                    <div class="header">
                        <div class="heading">
                            <div class="heading-top">
                                <img class="dashboard-icon" src="../../assets/verified.svg" alt="">
                                <h4>Pending Profiles Requiring Immediate Verification</h4>
                            </div>
                            <p>Approve to make talent and corporate openings publicly visible.</p>
                        </div>
                        <p v-if="notApprovedCount >= 0" class="view-all">View All({{notApprovedCount}})</p>
                    </div>
                    <div v-for="professional in notApprovedProfessionals" :key="professional.id" class="profiles">
                        <div class="img">
                            <img class="profile-img" :src="professional.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
                        </div>
                        <div class="details">
                            <div class="top">
                                <h4 class="name">{{professional.full_name}}</h4>
                                <p class="title">
                                    {{professional.title}}
                                </p>
                            </div>
                            <div class="about">
                                {{ professional.bio?.length > 100 ? professional.bio.slice(0, 100) + '...' : professional.bio }}
                            </div>
                            <div class="core-skills">
                                <p v-for="skill in professional.skills" :key="skill.id">
                                    {{skill}}</p>
                            </div>
                        </div>
                        <div class="profile-btns">
                            <button @click="displayProf(professional)" class="inspect">Inspect Dosier</button>
                            <button @click="approve(professional)" class="approve">Approve</button>
                        </div>
                    </div>
                    <div v-for="company in notApprovedCompanies" :key="company.id" class="profiles">
                        <div class="img">
                            <img class="profile-img" :src="company.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
                        </div>
                        <div class="details">
                            <div class="top">
                                <h4 class="name">{{company.company_name}}</h4>
                                <p class="title">
                                    {{company.industry}}
                                </p>
                            </div>
                            <div class="about">
                                {{ company.about?.length > 100 ? company.about.slice(0, 100) + '...' : company.about }}
                            </div>
                        </div>
                        <div class="profile-btns">
                            <button @click="displayEmp(company)" class="inspect">Inspect Dosier</button>
                            <button @click="approveEmp(company)" class="approve approveEmp">Verify Company</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-overview">
                <div class="skills-header">
                    <h4>TOP SKILLS IN DEMAND</h4>
                    <p>Required by verified company job specs.</p>
                </div>
                <div class="skills">
                    <div class="skill-name">
                        <p>Telecoms Maintenance Engineer</p>
                    </div>
                    <div class="skill-job-opening">
                        <p>5 Jobs</p>
                    </div>
                </div>
                <div class="skills">
                    <div class="skill-name">
                        <p>Shutdown Preparation Lead</p>
                    </div>
                    <div class="skill-job-opening">
                        <p>5 Jobs</p>
                    </div>
                </div>
                <div class="skills">
                    <div class="skill-name">
                        <p>Mechanical Engineer</p>
                    </div>
                    <div class="skill-job-opening">
                        <p>5 Jobs</p>
                    </div>
                </div>
                <div class="skills">
                    <div class="skill-name">
                        <p>Instrumentation Engineer</p>
                    </div>
                    <div class="skill-job-opening">
                        <p>5 Jobs</p>
                    </div>
                </div>
                <div class="skills">
                    <div class="skill-name">
                        <p>AI Engineer</p>
                    </div>
                    <div class="skill-job-opening">
                        <p>5 Jobs</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-professional-container" @click.self="close">
            <ViewProfessional v-if="profProfile" v-bind:profProfile="profProfile" @close="close"/>
        </div>
        <div class="view-employer-container" @click.self="closeEmp">
            <ViewEmployer v-if="employerProfile" v-bind:employerProfile="employerProfile" @close="closeEmp"/>
        </div>
    </div>
    
</template>

<script>
import ViewEmployer from '../modal/ViewEmployer'
import ViewProfessional from '../modal/ViewProfessional'

export default {
    name: 'AdminDashboard',
    props: ['professionals', 'companies', 'jobs'],
    components: {
        ViewEmployer,
        ViewProfessional
    },
    data(){
        return{
            profProfile: null,
            employerProfile: null,
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
        ///
        displayEmp(employer){
            this.employerProfile = employer
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "flex"
        },
        closeEmp(){
            const modalEmployer = document.querySelector(".view-employer-container")
            modalEmployer.style.display = "none"
            this.employerProfilee = null
        },
        approve(approveProfile){
            this.$emit('approveProfile', approveProfile)
        },
        approveEmp(approveEmpProfile){
            this.$emit('approveEmpProfile', approveEmpProfile)
        },

    },
    computed: {
        // This dynamically filters the array and returns the true length count
        approvedProfessionals(){
            return this.professionals.filter(p => p.is_verified === 'Approved')
        },
        notApprovedProfessionals(){
            return this.professionals.filter(p => p.is_verified != 'Approved')
        },
        approvedCompanies(){
            return this.companies.filter(p => p.is_verified === 'Verified')
        },
        notApprovedCompanies(){
            return this.companies.filter(p => p.is_verified != 'Verified')
        },
        ///
        approvedProfessionalCount() {
            return this.professionals.filter(p => p.is_verified === 'Approved').length;
        },
        notApprovedProfessionalCount(){
            return this.professionals.filter(p => p.is_verified != 'Approved').length;
        },
        approvedCompanyCount() {
            return this.companies.filter(p => p.is_verified === 'Verified').length;
        },
        notApprovedCompanyCount(){
            return this.companies.filter(p => p.is_verified != 'Verified').length;
        },
        notApprovedCount(){
            const prof = this.professionals.filter(p => p.is_verified != 'Approved').length;
            const comp = this.companies.filter(p => p.is_verified != 'Verified').length;
            return prof + comp
        }
    }

}
</script>

<style scoped>
    .overview-component{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .stats{
        display: flex;
        gap: 15px;
        justify-content: space-between;
    }

    .professionals, .companies, .openings, .percentage{
        display: flex;
        flex-direction: column;
        gap: 15px;
        background: white;
        padding: 15px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #b7becad7;
    }

    .header, .stat-breakdown{
        display: flex;
        justify-content: space-between;
    }

    .badge{
        width: 18px;
        height: 18px;
    }

    .header h4{
        color: #6b7280;
        font-size: 13px;
    }

    .info{
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .info h1{
        font-size: 25px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #151d2a;
    }

    .info p{
        font-size: 13px;
        color: #6b7280;
    }

    .dashboard-icon{
        width: 14px;
        height: 14px;
    }

    .left-stat, .right-stat{
        display: flex;
        gap: 4px;
        align-items: center;
    }

    .left-stat p, .right-stat p{
        font-size: 13px;
    }

    .left-stat p{
        color: #10b981;
    }

    .right-stat p{
        color: #f59e0b;
    }

    .top-profiles-for-approval{
        display: flex;
        gap: 15px;
    }

    .left-overview{
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .left-profile{
        background: white;
        border: 1px solid #b7becad7;
        border-radius: 10px;
        padding: 30px 15px 30px 15px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .right-overview{
        background: white;
        border: 1px solid #b7becad7;
        border-radius: 10px;
        padding: 30px 15px 30px 15px;
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-self: flex-start;
    }

    .heading-top{
        display: flex;
    }

    .heading-top h4{
        font-size: 16px;
        color: #151d2a;
    }

    .heading p{
        font-size: 13px;
    }

    .view-all{
        font-size: 14px;
        color: #2563eb;
        font-weight: 600;
    }

    .about{
        border-radius: 10px;
        font-size: 11.5px;
    }

    .details{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;
    }

    .skills-header h4{
        font-size: 15px;
    }

    .skills-header p{
        font-size: 13px;
    }

    .skills{
        display: flex;
        justify-content: space-between;
    }

    .skill-name p{
        font-size: 13px;
        font-weight: 600;
        color: #151d2a;
    }

    .skill-job-opening p{
        font-size: 13px;
        font-weight: 600;
        color: #2563eb;
    }

    .profiles{
        background: #F8FAFC;
        border-radius: 10px;
        border: 1px solid #b7becad7;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        gap: 10px;
    }

    .img{
        align-content: center;
        width:10%;
    }

    .profile-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .name{
        font-size: 14.5px;
    }

    .title{
        font-size: 13px;
        color:#6b7280;
    }

    .core-skills{
        display: flex;
        gap: 5px;
        color: #f59e0b;
        font-size: 11.5px;
    }

    .core-skills p{
        background: #f8d9a36b;
        padding: 3px;
        border-radius: 3px;
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
        font-size: 11.5px;
        font-weight: 600;
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        font-size: 11.5px;
        font-weight: 600;
    }

    .approveEmp{
        background: #151d2a;
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