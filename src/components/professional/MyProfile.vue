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
                        <label for="">Phone No</label>
                        <input type="number" name="phone" v-model="phone_no" id="">
                    </div>
                    <div class="input">
                        <label for="">Location</label>
                        <input type="text" name="location" v-model="location" id="">
                    </div>
                </div>
                <div class="group">
                    <div class="input">
                        <label for="">Years of Experience</label>
                        <input type="text" name="years_of_experience" v-model="years_of_experience" id="">
                    </div>
                    <div class="input">
                        <label v-if="profileDetails.profile_img" for="">Profile Image: • 
                            ({{ profileDetails.profile_img?.length > 20 ? profileDetails.profile_img.slice(0, 20) + '...' : profileDetails.profile_img }})
                            </label>
                        <input class="file" type="file" name="location"  accept="image/*" @change="handleFileChange">
                    </div>
                </div>
                
                <h1>Preferences</h1>
                <div class="group">
                    <div class="input">
                        <label for="">Type</label>
                        <select v-model="type" name="job-types" id="job-types">
                            <option value="" disabled>Professional Types</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
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
                <div class="group">
                    <div class="input">
                        <label for="">School Certificate: •
                            <a  v-if="profileDetails.certificate" :href="profileDetails.certificate" class="label">
                            ({{ profileDetails.certificate?.length > 20 ? profileDetails.certificate.slice(0, 20) + '...' : profileDetails.certificate }})
                            </a>
                            </label>
                        <input class="file" type="file" name="phone" accept=".pdf,image/*" @change="handleSchCertificateChange">
                    </div>
                    <div class="input">
                        <label for="">Certification: •
                            <a v-if="profileDetails.certification" :href="profileDetails.certification" class="label">
                            ({{ profileDetails.certification?.length > 20 ? profileDetails.certification.slice(0, 20) + '...' : profileDetails.certification }})
                            </a>
                        </label>
                        <input class="file" type="file" name="location" accept=".pdf,image/*" @change="handleCertificationChange">
                    </div>
                </div>
                <div class="input">
                    <input class="input-btn" type="submit" value="Save Profile">
                </div>
            </form>
        </div>
        <div v-if="profileDetails" class="right">
            <div class="img-details">
                <img class="img" :src="profile_img || '../../assets/Ayo.jpg'" alt="Profile picture">
            </div>
            <p>Email Address: <strong>{{userEmail}}</strong></p>
            <p class="approved" v-if="profileDetails.is_verified.includes('Approved')">
                Approved Professional</p>
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'

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
            skills: '',
            profile_img: '',
            certificate: '',
            certification: '',
            selectedFile: null,
            selectedSchCertificateFile: null,
            selectedCertificationFile: null,
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
            this.skills = data.skills || '';
            this.profile_img = data.profile_img || '';
            this.certificate = data.certificate || '';
            this.certification = data.certification || '';
        },
        handleFileChange(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.selectedFile = files[0]; // Capture the file asset metadata cleanly
            }
        },
        handleSchCertificateChange(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.selectedSchCertificateFile = files[0]; // Capture the file asset metadata cleanly
            }
        },
        handleCertificationChange(e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                this.selectedCertificationFile = files[0]; // Capture the file asset metadata cleanly
            }
        },
        async onSubmit(e){
            e.preventDefault()
            this.isUploading = true;
            let imageUrl = this.profile_img;
            let certificateUrl = this.certificate;
            let certificationUrl = this.certification;


            if (this.selectedFile) {
                const ext = this.selectedFile.name.split('.').pop();
                const path = `profile_${this.id}_${Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('avatars').upload(path, this.selectedFile, { upsert: true });
                if (error) throw error;
                imageUrl = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;// This string matches database column parameters
            }

            if (this.selectedSchCertificateFile) {
                const ext = this.selectedSchCertificateFile.name.split('.').pop();
                const path = `school_cert_${this.id}_${Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('avatars').upload(path, this.selectedSchCertificateFile, { upsert: true });
                if (error) throw error;
                certificateUrl = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
             }

            if (this.selectedCertificationFile) {
                const ext = this.selectedCertificationFile.name.split('.').pop();
                const path = `professional_cert_${this.id}_${Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('avatars').upload(path, this.selectedCertificationFile, { upsert: true });
                if (error) throw error;
                certificationUrl = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
            }

            let skillsArray = [];
            if (typeof this.skills === 'string') {
                // If it's a string, it's safe to split it by commas
                skillsArray = this.skills.split(',').map(s => s.trim()).filter(Boolean);
            } else if (Array.isArray(this.skills)) {
                // If it's already an array, just filter out any accidental empty items
                skillsArray = this.skills.map(s => String(s).trim()).filter(Boolean);
            }

            const updateProfile = {
                
                id: this.id,
                full_name: this.full_name,
                title: this.title,
                phone_no: Number(this.phone_no),
                years_of_experience: this.years_of_experience,
                location: this.location,
                type: this.type,
                skills: skillsArray,
                rate: Number(this.rate),
                portfolio_url: this.portfolio_url,
                bio: this.bio,
                education: this.education,
                profile_img: imageUrl,
                certificate: certificateUrl,
                certification: certificationUrl,
            }

            this.$emit('update-profile', updateProfile)

            this.profile_img = imageUrl; 
            this.certificate = certificateUrl;
            this.certification = certificationUrl;
            this.selectedFile = null;    // Flush cache
            this.selectedCertificationFile = null;
            this.selectedSchCertificateFile = null;
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
        display: flex;
        flex-direction: column;
        gap: 10px;
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

    .label{
        color: #ff5524;
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

    p{
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
    }

    .approved{
        background: #151d2a;
        color: white;
        padding: 4px 10px 4px 10px;
        border-radius: 5px;
        width: fit-content;
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

</style>
