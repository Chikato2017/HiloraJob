<template>
    <div class="my-profile-component"  v-if="profileDetails">
        <div class="left">
            <form @submit="onSubmit">
                <h1>Basic Information</h1>
                <div class="group">
                    <div class="input">
                        <label for="">Company Name</label>
                        <input type="text" name="full_name" v-model="company_name" id="">
                    </div>
                    <div class="input">
                        <label for="">Industry</label>
                        <input type="text" name="title" v-model="industry" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Email</label>
                        <input type="email" v-model="email" name="email" id="" disabled>
                    </div>
                    <div class="input">
                        <label for="">Phone No</label>
                        <input type="number" name="phone" v-model="phone_no" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Website</label>
                        <input type="text" name="website" v-model="website" id="">
                    </div>
                    <div class="input">
                        <label for="">Address</label>
                        <input type="text" name="address" v-model="address" id="">
                    </div>
                </div>
                <h1>Summary & Bio</h1>
                <textarea v-model="about" name="bio" id="" cols="30" rows="10"></textarea>
                <div class="input">
                    <label for="">Company Size</label>
                    <input type="number" name="location" v-model="company_size" id="">
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
export default {
    name: 'EmployerProfile',
    props: ['profileDetails', 'userEmail'],
    data(){
        return{
            id: '',
            company_name: '',
            industry: '',
            website: '',
            address: '',
            company_size: '',
            about: '',
            phone_no: '',
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
            this.company_name = data.company_name || '';
            this.industry = data.industry || '';
            this.phone_no = data.phone_no || ''; 
            this.website = data.website || '';
            this.address = data.address || '';
            this.company_size = data.company_size || '';
            this.about = data.about || '';
        },
        async onSubmit(e){
            e.preventDefault()

            const updateProfile = {
                id: this.id,
                company_name: this.company_name,
                industry: this.industry,
                phone_no: Number(this.phone_no),
                website: this.website,
                address: this.address,
                company_size: Number(this.company_size),
                about: this.about,
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
        border: 1px solid #8790a163;
        padding: 10px;
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