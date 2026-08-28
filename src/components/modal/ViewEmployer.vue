<template>
    <div class="employer-profile-modal">
        <div class="details">
            <img class="img" src="../../assets/benz.jpg" alt="">
            <div class="name-and-others">
                <div class="name">{{employerProfile.company_name}}</div>
                <div class="discipline-tag">
                    {{employerProfile.industry}}
                </div>
                <div class="location">
                    {{employerProfile.address}} 
                </div>
            </div>
            <p class="status-p">
                VISIBLE
            </p>
            <div class="close-modal">
                <img @click="$emit('close')" class="close-img" src="../../assets/close.svg" alt="">
            </div>
        </div>
        <div class="about">
            <h4>ABOUT COMPANY</h4>
            {{employerProfile.about}}
        </div>
        <div class="size">
            <h4>COMPANY SIZE</h4>
            {{employerProfile.company_size}}
        </div>
        <div class="skills">
            <h4>COMPANY WEBSITE</h4>
            <a :href="employerProfile.website">{{employerProfile.website}}</a>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'ViewEmployer',
    props: ['employerProfile'],
}
</script>

<style scoped>
    .employer-profile-modal{
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
        gap: 15px;
        justify-content: space-between;
    }

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .name-and-others{
        width: 80%;
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

    .location{
        color: #6b7280;
        font-size: 13px;
    }

    .status-p{
        font-size: 11.5px;
        background: #848c9c96;
        padding: 5px 10px 5px 10px;
        border-radius: 10px;
        align-self: center;
        font-weight: 600;
    }

    .about{
        padding: 10px;
        border-radius: 10px;
        background: #9ca3af75;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .skills{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 600;
        gap: 5px;
    }

    .size{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        gap: 5px;
    }

    .close-modal{
        position: absolute;
        top: 150px;
        right: 390px;
        padding: 0px 10px 10px 10px;
        cursor: pointer;
    }

</style>