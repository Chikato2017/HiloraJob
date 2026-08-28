<template>
    <div class="my-profile-component"  v-if="profileDetails">
        <div class="left">
            <form @submit="onSubmit">
                <h1>Basic Information</h1>
                <div class="group">
                    <div class="input">
                        <label for="">Full Name</label>
                        <input type="text" name="full_name" v-model="full_name" id="">
                    </div>
                    <div class="input">
                        <label for="">Title</label>
                        <input type="text" name="title" v-model="title" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Email</label>
                        <input type="email" name="email" v-model="email" id="" disabled>
                    </div>
                    <div class="input">
                        <label for="">Phone No</label>
                        <input type="number" name="phone" v-model="phone_no" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Years of Experience</label>
                        <input type="text" name="years_of_experience" v-model="years_of_experience" id="">
                    </div>
                    <div class="input">
                        <label for="">Location</label>
                        <input type="text" name="location" v-model="location" id="">
                    </div>
                </div>
                <h1>Preferences</h1>
                <div class="group">
                    <div class="input">
                        <label for="">Location</label>
                        <select v-model="type" name="job-types" id="job-types">
                            <option value="" disabled>Professional Types</option>
                            <option value="full">Full Time</option>
                            <option value="part">Part-Time</option>
                            <option value="remote">Remote</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div class="input">
                        <label for="">Skills</label>
                        <input type="text" name="location" v-model="skills" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Salary</label>
                        <input type="number" name="location" v-model="rate" id="">
                    </div>
                    <div class="input">
                        <label for="">Website</label>
                        <input type="text" name="location" v-model="portfolio_url" id="">
                    </div>
                </div>
                <h1>Summary & Bio</h1>
                <textarea v-model="bio" name="bio" id="" cols="30" rows="10"></textarea>
                <div class="input">
                    <label for="">Education</label>
                    <input type="text" name="location" v-model="education" id="">
                </div>
                <div class="input">
                    <input class="input-btn" type="submit" value="Save Profile">
                </div>
            </form>
        </div>
        <div class="right">
            <img class="img" src="../../assets/Ayo.jpg" alt="">
        </div>
    </div>
</template>

<script>
//import {supabase} from '../../supabase-client.ts'

export default {
    name: 'MyProfile',
    props: ['profileDetails', 'userEmail'],
    data(){
        return{
            id: '',
            full_name: '',
            title: '',
            bio: '',
            years_of_experience: '',
            location: '',
            rate: '',
            education: '',
            portfolio_url: '',
            type: '',
            phone_no: '',
            skills: ''
        }
    },
    watch: {
        profileDetails: {
            handler(newVal) {
                if (newVal) {
                    this.mapProfileData(newVal);
                }
            },
            immediate: true // Runs immediately if data happens to be available at boot
        },
        userEmail: {
            handler(newEmail) {
                if (newEmail) {
                    this.email = newEmail;
                }
            },
            immediate: true
        }
    },
    mounted(){
        if (this.profileDetails) {
            this.mapProfileData(this.profileDetails);
        }
        if (this.userEmail) {
            this.email = this.userEmail;
        }
        
    },
    methods:{
        mapProfileData(data) {
            this.id = data.id
            this.full_name = data.full_name || '';
            this.title = data.title || '';
            this.phone_no = data.phone_no || ''; 
            this.years_of_experience = data.years_of_experience || '';
            this.location = data.location || '';
            this.type = data.type || '';
            this.rate = data.rate || '';
            this.portfolio_url = data.portfolio_url || '';
            this.bio = data.bio || '';
            this.education = data.education || '';
        },
        async onSubmit(e){
            e.preventDefault()

            const updateProfile = {
                id: this.id,
                full_name: this.full_name,
                title: this.title,
                phone_no: Number(this.phone_no),
                years_of_experience: this.years_of_experience,
                location: this.location,
                type: this.type,
                rate: Number(this.rate),
                portfolio_url: this.portfolio_url,
                bio: this.bio,
                education: this.education
            }

            this.$emit('update-profile', updateProfile)
        }
    }
    
    
}
</script>

<style scoped>
    .my-profile-component{
        display: flex;
        gap: 25px;
    }

    h1{
        font-size: 18px;
        padding-top: 10px;
        color: #151d2a;
    }

    .left{
        width: 65%;
        background: white;
        padding: 30px;
        border-radius: 10px;
        border: 1px solid #9ca3af67;
    }

    .right{
        width: 35%;
        background: white;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #9ca3af67;
        align-self: flex-start;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .input{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    textarea{
        border-radius: 4px;
        border: 1px solid #8790a163;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13.5px;
        color:#151d2a;
    }

    input{
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #8790a163;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13.5px;
        color:#151d2a;
    }

    select{
        width: 100%;
        padding: 9px;
        border: 1px solid #8790a163;
        border-radius: 4px;
        font-size: 13.5px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color:#151d2a;
    }

    label{
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        color:#151d2a;
    }

    .group{
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 15px;
    }

    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .input-btn{
        width: 100%;
        background: #151d2a;
        color: white;
        cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

</style>