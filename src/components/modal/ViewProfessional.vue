<template>
    <div v-if="profProfile" class="prof-profile-modal">
        <div class="details">
            <img class="img" :src="profProfile.profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
            <div class="name-and-others">
                <div class="name">{{profProfile.full_name}}</div>
                <div class="discipline-tag">
                    {{profProfile.title}} 
                    <span class="years">• {{profProfile.years_of_experience}} yrs exp</span>
                </div>
                <div class="location">
                    {{profProfile.location}} • <p class="status-p">{{profProfile.type}}</p>
                </div>
            </div>
            <div class="close-modal">
                <img @click="$emit('close')" class="close-img" src="../../assets/close.svg" alt="">
            </div>
        </div>
        <div class="about">
            <h4>PROFILE BIO</h4>
            {{profProfile.bio}}
        </div>
        <div class="skill-container">
            <h4>VERIFIED SKILLS</h4>
            <div class="skills">
                <p v-for="skill in profProfile.skills" :key="skill.id">
                {{skill}}</p>
            </div>
        </div>
        <div class="pay">
            <h4>EXPECTED SALARY</h4>
            ₦{{profProfile.rate}}/annum
        </div>
        <div class="education">
            <h4>EDUCATION</h4>
            {{profProfile.education}}
        </div>
        <p>{{profProfile.user.Email}}</p>
        
    </div>
</template>

<script>
export default {
    name: 'ViewProfessional',
    props: ['profProfile'],
    emits: ['close'],
}
</script>

<style scoped>
    .prof-profile-modal{
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        width: 100%;
        max-width: 45%;        /* Limits width on desktop monitors */
        box-shadow: 14px 10px 25px -5px rgba(122, 116, 116, 0.26), 0 8px 10px -6px rgba(49, 46, 46, 0.336);
        max-height: 75vh;
        display: flex;
        flex-direction: column;
        gap: 25px;
        box-sizing: border-box;
        overflow-y: auto; 
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
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .name{
        color: #151d2a;
        font-size: 16px;
        font-weight: 800;
    }

    .discipline-tag{
        color: #2563eb;
        font-size: 14px;
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
        margin-top: 4px;
        font-size: 11.5px;
        background: #b1b9c548;
        padding: 4px;
        border-radius: 10px;
        align-self: flex-start;
        font-weight: 600;
        text-align: center;
        width: fit-content;
    }

    .about{
        border-radius: 10px;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .skill-container{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        gap: 5px;
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

    .pay{
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 13px;
        color:#151d2a;
        font-weight: 600;
    }

    .education{
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 13px;
        color:#151d2a;
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

   .close-modal{
        top: 118px;
        right: 390px;
        padding: 0px 10px 10px 10px;
        cursor: pointer;
    }
</style>