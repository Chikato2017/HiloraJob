<template>
    <div v-if="currentJob" class="apply-modal">
        <div class="top">
            <p class="employer">{{currentJob.employer.company_name}}</p>
            <h1 class="title">{{currentJob.title}}</h1>
            <p class="location">{{currentJob.location}} • <strong>({{currentJob.job_type}})</strong></p>
        </div>
        <div class="close-modal">
            <img @click="$emit('close')" class="close-img" src="../../assets/close.svg" alt="">
        </div>
        <p class="salary">Expected Salary: ₦{{currentJob.salary}}</p>
        <div class="skills">
            <span>Requirements:</span>
            <p v-for="skill in currentJob.requirements" :key="skill.id">
                 {{skill}}</p>
        </div>
        <p class="desc">{{currentJob.description}}</p>
        <form  @submit="onSubmit" enctype="multipart/form-data">
            <div class="group">
                <div class="input">
                    <label for="">Name</label>
                    <input type="text" v-model="name" name="name" id="" placeholder="">
                </div>
                <div class="input">
                    <label for="">Title</label>
                    <input type="text" name="title" v-model="title" id="" placeholder="">
                </div>
            </div>
            <div class="group">
                <div class="input">
                    <label for="">Education</label>
                    <input type="text" v-model="education" name="education" id="" placeholder="">
                </div>
                <div class="input">
                    <label for="">CV</label>
                    <input class="file" type="file" name="cv" id="" placeholder="">
                </div>
            </div>
            <div class="group">
                <div class="input">
                    <label for="">Cover Letter</label>
                    <input class="file" type="file" name="cover_letter" id="" placeholder="">
                </div>
                <div class="input">
                    <label for="">Skills</label>
                    <input type="text" v-model="skills" name="skills" id="" placeholder="">
                </div>
            </div>
            <div class="input">
                <input class="input-btn" type="submit" value="Submit Application">
            </div>
            
        </form>
    </div>
    
</template>

<script>
import {supabase} from '../../supabase-client.ts'

export default {
    name: 'AddApplication',
    props: ['currentJob', 'profileDetails'],
    emits: ['close'],
    data(){
        return{
            name: '',
            title: '',
            education: '',
            skills: '',
            professional: '',
            job: '',
        }
    },
    mounted(){
        if(this.profileDetails){
            this.name = this.profileDetails.full_name || '';
            this.title = this.profileDetails.title || '';
            this.education = this.profileDetails.education || '';
        }
    },
    methods: {
        async onSubmit(e){
            e.preventDefault()
            try{
                const formattedSkillsArray = this.skills
                    ? this.skills.split(',').map(skill => skill.trim()).filter(Boolean)
                    : [];

                const {data, error} = await supabase.from("JobApplication").insert({
                    skills: formattedSkillsArray,
                    professional: this.profileDetails.id,
                    job: this.currentJob.id
                });

                if (error) throw error;
                if (data){
                    console.log("successfully saved profile")
                }
                this.$emit('close')
            }catch(error){
                console.error("Error matching user state:", error.message)
            }
        },
        
    }
}
</script>

<style scoped>
    .apply-modal{
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        width: 100%;
        max-width: 50%;        /* Limits width on desktop monitors */
        box-shadow: 14px 10px 25px -5px rgba(122, 116, 116, 0.26), 0 8px 10px -6px rgba(49, 46, 46, 0.336);
        max-height: 75vh;
        display: flex;
        flex-direction: column;
        gap: 15px;
        box-sizing: border-box;
        overflow-y: auto; 
    }

    .employer{
        color: #151d2a;
        font-size: 13.5px;
        font-weight: 800;
    }

    .title{
        color: #151d2a;
        font-size: 18px;
        letter-spacing: -1px;
    }

    .location{
        color: #555c6b;
        font-size: 13px;
    }

    .salary{
        font-size: 14px;
        font-weight: 600;
        padding: 3px;
        border-radius: 4px;
    }

    .skills{
        display: flex;
        font-size: 11px;
        font-weight: 600;
        gap: 10px;
    }

    span{
        padding: 3px;
        font-weight: 600;
        font-size: 13px;
    }

    .skills p{
        background: #3068e04f;
        padding: 3px;
        border-radius: 5px;
    }

    .desc{
        font-size: 13px;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .group{
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 15px;
    }

    .input{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    
    input{
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #8790a163;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
    }

    label{
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
    }

    .file{
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
    }

    .input-btn{
        width: 100%;
        background: #151d2a;
        color: white;
        cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .close-modal{
        position: absolute;
        right: 380px;
        padding: 0px 10px 10px 10px;
        cursor: pointer;
    }
</style>