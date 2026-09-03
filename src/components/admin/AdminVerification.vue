<template>
    <div class="verification-component">
        <div class="top-badge-container">
            <div class="left">
                <p class="text-badge">Vet Agencies & Professionals</p>
                <h1 class="left-h1">Verification Queue</h1>
                <p class="left-p">
                    Audit registered talent credentials and corporate tax filings. Approved 
                    profiles become immediately visible to the matching algorithm and corporate partners.
                </p>
            </div>
            <div class="right">
                <p>PENDING REVIEWS</p>
                <h4 v-if="notApprovedCount >= 0">{{notApprovedCount}}</h4>
            </div>
        </div>
        <div class="all-profiles">
            <div class="professional-profiles">
                <div class="profile-heading">
                    <img src="../../assets/professional.svg" alt="">
                    <p v-if="notApprovedProfessionalCount >= 0">
                        Professionals Awaiting Identity & Skill Approval  ({{notApprovedProfessionalCount}})
                    </p>
                </div>
                <div v-for="professional in notApprovedProfessionals" :key="professional.id"
                 class="profiles">
                    <div class="details">
                        <div class="img">
                            <img class="profile-img" :src="professional.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
                        </div>
                        <div>
                            <h4 class="name">{{professional.full_name}}</h4>
                            <p class="title">
                                {{professional.title}}
                            </p>
                        </div>
                    </div>
                    <div class="about">
                        {{ professional.bio?.length > 100 ? professional.bio.slice(0, 100) + '...' : professional.bio }}
                    </div>
                    <div class="core-skills">
                            <p v-for="skill in professional.skills" :key="skill.id">
                                {{skill}}</p>
                        </div>
                    <div class="profile-btns">
                        <button @click="displayProf(professional)" class="inspect">Inspect Dosier</button>
                        <button @click="approve(professional)" class="approve">Verify Professional</button>
                    </div>
                </div>
            </div>
            <div class="company-profiles">
                <div class="profile-heading">
                    <img src="../../assets/company.svg" alt="">
                    <p v-if="notApprovedCompanyCount >= 0">
                        Companies Awaiting Identity & Skill Approval  ({{notApprovedCompanyCount}})
                    </p>
                </div>
                <div v-for="company in notApprovedCompanies" :key="company.id"
                class="profiles">
                    
                    <div class="details">
                        <div class="img">
                            <img class="profile-img" src="../../assets/Florida.jpg" alt="">
                        </div>
                        <div>
                            <h4 class="name">{{company.company_name}}</h4>
                            <p class="title">
                                {{company.industry}}
                            </p>
                            <div class="location">
                                {{company.address}}
                            </div>
                        </div>
                    </div>
                    <div class="about">
                        {{company.about}}
                    </div>
                    <div class="profile-btns">
                        <button @click="displayEmp(company)" class="inspect">Inspect Dosier</button>
                        <button @click="approveEmp(company)" class="approve approve-cmp">Verify Company</button>
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
    name: 'AdminVerification',
    components: {
        ViewEmployer,
        ViewProfessional
    },
    props: ['professionals', 'companies'],
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
    .verification-component{
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
    }

    .text-badge{
        background: #f59e0b;
        color: #151d2a;
        width: 25%;
        font-size: 12.5px;
        font-weight: 600;
        text-align: center;
        border-radius: 10px;
    }

    .left{
        width: 85%;
    }

    .right{
        width: 15%;
        align-content: center;
    }

    .left-h1{
        font-size: 25px;
    }

    .left-p{
        width: 60%;
        font-size: 13px;
    }

    .right h4{
        font-size: 40px;
    }

    .right p{
        font-size: 11.5px;
    }

    .all-profiles{
        display: flex;
        gap: 20px;
    }

    .professional-profiles, .company-profiles{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .profiles{
        background: white;
        border-radius: 10px;
        border: 1px solid #b7becad7;
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        justify-content: space-between;
    }

    .profile-heading{
        display: flex;
        gap: 15px;
    }

    .profile-heading p{
        font-size: 13px;
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

    .details{
        display: flex;
        gap: 10px;
    }

    .about{
        padding: 10px;
        border-radius: 10px;
        font-size: 11.5px;
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

    .location{
        color: #6b7280;
        font-size: 13px;
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

    .approve-cmp{
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