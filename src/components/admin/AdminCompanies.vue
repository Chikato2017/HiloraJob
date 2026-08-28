<template>
    <div class="company-component">
        <div class="professional-header">
            <div class="text">
                <div class="text-heading">
                    <h1>Registered Companies & Hiring Employers</h1>
                    <div class="total">9 Total</div>
                </div>
                <p class="text-p">Verify corporate incorporation & tax credentials to activate their job listings on the Hilora network..</p>
            </div>
            <div class="button-container">
                <button class="reg-prof">Register New Company</button>
            </div>
        </div>
        <div class="verification-bar">
            <div class="verification-stages">
                <div class="all">All Companies</div>
                <div v-if="notApprovedCompanyCount >= 0" class="pending">
                    Pending Approval ({{notApprovedCompanyCount}})</div>
                <div v-if="approvedCompanyCount >= 0" class="approved">
                    Approved ({{approvedCompanyCount}})</div>
                <div class="rejected">Rejected (0)</div>
            </div>
        </div>
        <div class="profiles">
            <div v-for="company in companies" :key="company.id" class="profile">
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
                    <p v-if="company.is_verified.includes('Verified')" class="status-p">
                        {{company.is_verified}}
                    </p>
                </div>
                <div class="about">
                    {{ company.about?.length > 70 ? company.about.slice(0, 70) + '...' : company.about }}
                </div>
                <div class="skills">
                    <p>Company Size: {{company.company_size}}</p>
                </div>
                <div class="profile-btns">
                    <button @click="displayEmp(company)" class="inspect">Inspect Dosier</button>
                    <router-link class="approve approve-cmp" to="/admin/job-openings">
                        View jobs
                    </router-link>
                </div>
            </div>
        </div>
        <div class="view-employer-container" @click.self="closeEmp">
            <ViewEmployer v-if="employerProfile" v-bind:employerProfile="employerProfile" @close="closeEmp"/>
        </div>
    </div>
</template>

<script>
import ViewEmployer from '../modal/ViewEmployer'

export default {
    name: 'AdminCompanies',
    props: ['companies'],
    components: {
        ViewEmployer,
    },
    data(){
        return{
            employerProfile: null,
        }
    },
    methods: {
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
        approveEmp(approveEmpProfile){
            this.$emit('approveEmpProfile', approveEmpProfile)
        },
    },
    computed: {
        // This dynamically filters the array and returns the true length count
        approvedCompanies(){
            return this.companies.filter(p => p.is_verified === 'Verified')
        },
        notApprovedCompanies(){
            return this.companies.filter(p => p.is_verified != 'Verified')
        },
        approvedCompanyCount() {
            return this.companies.filter(p => p.is_verified === 'Verified').length;
        },
        notApprovedCompanyCount(){
            return this.companies.filter(p => p.is_verified != 'Verified').length;
        },
    }
}
</script>

<style scoped>
    .company-component{
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
        background: #2563eb;
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
        background:#151d2a;
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
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
        width: 100%;
        text-align: center;
        font-size: 13px;
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