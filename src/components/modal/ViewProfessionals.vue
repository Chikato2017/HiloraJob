<template>
    <div class="prof-profile-modal">
        <h4>Match Professional with Job</h4>
        <div v-for="professional in professionals" :key="professional.id"  class="profile">
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
                <h4>Expected Salary: </h4> <span class="rate">₦{{professional.rate}}/annum</span>
            </div>
            <div class="education">
                <h4>EDUCATION</h4>
                <p>{{professional.education}}</p>
            </div>
            <div class="profile-btns">
                <button v-if="professional.is_verified==='Approved'" class="approve approve-cmp">
                    Apply</button>
                <button v-else>Cannot Match</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ViewProfessionals',
    props: ['professionals']
}
</script>

<style scoped>
    .prof-profile-modal{
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        width: 100%;
        max-width: 55%;        /* Limits width on desktop monitors */
        box-shadow: 14px 10px 25px -5px rgba(122, 116, 116, 0.26), 0 8px 10px -6px rgba(49, 46, 46, 0.336);
        max-height: 75vh;
        display: flex;
        flex-direction: column;
        gap: 25px;
        box-sizing: border-box;
        overflow-y: auto; 
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
        gap: 15px;
    }

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .name-and-others{
        width: 75%;
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

    .pay{
        display: flex;
        font-size: 13px;
        color: #151d2a;
    }

    .rate{
        color: #ff5524;
        font-weight: 600;
    }

    .education{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        color: #151d2a;
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
</style>