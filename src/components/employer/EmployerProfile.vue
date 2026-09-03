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
                        <label for="">Company Logo: •
                            <span v-if="profileDetails.profile_img">
                                ({{ profileDetails.profile_img?.length > 20 ? profileDetails.profile_img.slice(0, 20) + '...' : profileDetails.profile_img }})
                            </span>
                        </label>
                        <input class="file" type="file" name="location"  accept="image/*" @change="handleFileChange">
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
                <div class="group">
                    <div class="input">
                        <label for="">CAC Reg Doc: •
                            <a v-if="profileDetails.reg_doc" :href="profileDetails.reg_doc" class="label">
                                ({{ profileDetails.reg_doc?.length > 20 ? profileDetails.reg_doc.slice(0, 20) + '...' : profileDetails.reg_doc }})
                            </a>
                        </label>
                        <input class="file" type="file" name="location"  accept=".pdf,image/*" @change="handleDocChange">
                    </div>
                    <div class="input">
                        <label for="">Company Size</label>
                        <input type="number" name="address" v-model="company_size" id="">
                    </div>
                </div>
                <div class="input">
                    <label for="">Tax No</label>
                    <input type="text" name="tax no" v-model="tax_no" id="">
                </div>
                <div class="input">
                    <input class="input-btn" type="submit" value="Save Profile">
                </div>
            </form>
        </div>
        <div class="right">
            <img class="img" :src="profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
            <p class="email">Email Address: <strong>{{userEmail}}</strong></p>
            <p class="approved" v-if="profileDetails.is_verified.includes('Verified')">
                Approved Company</p>
        </div>
    </div>
    
</template>

<script>
import {supabase} from '../../supabase-client.ts'

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
            tax_no: '',
            reg_doc: '',
            profile_img: '',
            selectedFile: null,
            selectedDoc: null,
            isUploading: false,
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
            this.tax_no = data.tax_no || '';
            this.reg_doc = data.reg_doc || '';
            this.profile_img = data.profile_img || '';
        },
        handleFileChange(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.selectedFile = files[0]; // Capture the file asset metadata cleanly
            }
        },
        handleDocChange(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.selectedDoc = files[0]; // Capture the file asset metadata cleanly
            }
        },
        async onSubmit(e){
            e.preventDefault()
            this.isUploading = true;
            let imageUrl = this.profile_img;
            let regDocUrl = this.reg_doc;

            if (this.selectedFile) {
                const ext = this.selectedFile.name.split('.').pop();
                const path = `profile_${this.id}_${Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('avatars').upload(path, this.selectedFile, { upsert: true });
                if (error) throw error;
                imageUrl = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;// This string matches database column parameters
            }
            if (this.selectedDoc) {
                const ext = this.selectedDoc.name.split('.').pop();
                const path = `reg_doc_${this.id || Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('avatars').upload(path, this.selectedDoc, { upsert: true });
                if (error) throw error;
                regDocUrl = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
             }

            const updateProfile = {
                id: this.id,
                company_name: this.company_name,
                industry: this.industry,
                phone_no: Number(this.phone_no),
                website: this.website,
                address: this.address,
                company_size: Number(this.company_size),
                about: this.about,
                tax_no: this.tax_no,
                profile_img: imageUrl,
                reg_doc: regDocUrl,
            }

            this.$emit('update-profile', updateProfile)

            this.profile_img = imageUrl; 
            this.reg_doc = regDocUrl;
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
        display: flex;
        flex-direction: column;
        gap: 10px;
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
        padding: 10px;
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

    label, .email{
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
        width: 140px;
        height: 140px;
        border-radius: 10%;
    }

    .input-btn{
        width: 100%;
        background: #151d2a;
        color: white;
        cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .file{
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
    }

    .approved{
        background: #151d2a;
        color: white;
        padding: 4px 10px 4px 10px;
        border-radius: 5px;
        width: fit-content;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
    }

    .label{
        color: #ff5524;
    }
</style>