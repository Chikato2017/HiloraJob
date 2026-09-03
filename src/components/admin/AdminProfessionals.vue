<template>
    <div class="professional-component">
        <div class="professional-header">
            <div class="text">
                <div class="text-heading">
                    <h1>Registered Professionals & Talent</h1>
                    <div v-if="professionals" class="total">{{professionals.length}} Total</div>
                </div>
                <p class="text-p">Approve candidate profiles to make their verified credentials visible to hiring companies.</p>
            </div>
            <div class="button-container">
                <button class="reg-prof">Register New Professional</button>
            </div>
        </div>
        <div class="verification-bar">
            <div class="verification-stages">
                <div class="all">All</div>
                <div v-if="notApprovedProfessionalCount >= 0" class="pending">
                    Pending Approval ({{notApprovedProfessionalCount}})</div>
                <div v-if="approvedProfessionalCount >= 0" class="approved">
                    Approved ({{approvedProfessionalCount}})</div>
                <div class="rejected">Rejected (0)</div>
            </div>
            <div class="line"></div>
            <div class="disciplines">
                <p class="discipline-p">DISCIPLINES: </p>
                <div class="all">All</div>
                <div class="discipline">Engineering</div>
                <div class="discipline">Manufacturing</div>
                <div class="discipline">Product Design</div>
                <div class="discipline">Dev Ops</div>
            </div>
        </div>
        <div class="profiles">
            <div v-for="professional in professionals" :key="professional.id" class="profile">
                <div class="details">
                    <img class="img" :src="professional.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
                    <div class="name-and-others">
                        <div class="name">{{professional.full_name}}</div>
                        <div class="discipline-tag">
                            {{professional.title}}
                        </div>
                        <div class="location">
                            {{professional.location}}
                        </div>
                    </div>
                    <p v-if="professional.is_verified.includes('Approved')" class="status-p">
                        {{professional.is_verified}}
                    </p>
                </div>
                <div class="about">
                    {{ professional.bio?.length > 70 ? professional.bio.slice(0, 70) + '...' : professional.bio }}
                </div>
                <div class="skills">
                    <p v-for="skill in professional.skills" :key="skill.id">
                        {{skill}}</p>
                </div>
                <div class="pay">

                </div>
                <div class="profile-btns">
                    <button @click="displayProf(professional)" class="inspect">Inspect Dosier</button>
                    <button class="approve approve-cmp">Match Openings</button>
                </div>
            </div>
            
        </div>
        <div class="view-professional-container" @click.self="close">
            <ViewProfessional v-if="profProfile" v-bind:profProfile="profProfile" @close="close"/>
        </div>
    </div>
</template>

<script>
import ViewProfessional from '../modal/ViewProfessional'

export default {
    name: 'AdminProfessionals',
    props: ['professionals'],
    components: {
        ViewProfessional
    },
    data(){
        return{
            profProfile: null,
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
        approve(approveProfile){
            this.$emit('approveProfile', approveProfile)
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
        approvedProfessionalCount() {
            return this.professionals.filter(p => p.is_verified === 'Approved').length;
        },
        notApprovedProfessionalCount(){
            return this.professionals.filter(p => p.is_verified != 'Approved').length;
        },
    }
}
</script>

<style scoped>
    .professional-component{
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
        background: #2563eb;
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