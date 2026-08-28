<template>
    <div v-if="profileDetails" class="add-modal">
        <div class="top">
            <p class="employer">{{profileDetails.company_name}}</p>
            <h1 class="title">{{profileDetails.industry}}</h1>
            <p class="location">{{profileDetails.address}}</p> 
        </div>
        <div class="close-modal">
            <img @click="$emit('close')" class="close-img" src="../../assets/close.svg" alt="">
        </div>
        <form @submit="onSubmit" enctype="multipart/form-data">
            <div class="input">
                <label for="">Job Title</label>
                <input type="text" v-model="title" name="name" id="" placeholder="">
            </div>
            <div class="input">
                <label for="">Location</label>
                <input type="text" v-model="location" name="name" id="" placeholder="">
            </div>
            <div class="input">
                <label for="">Description</label>
                <textarea v-model="description" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="group">
                <div class="input">
                    <label for="">Salary</label>
                    <input type="number" v-model="salary" name="education" id="" placeholder="">
                </div>
                <div class="input">
                    <label for="">Job Type</label>
                    <select v-model="job_type"  name="job-types" id="job-types">
                        <option value="" disabled>Select Job Type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="remote">Remote</option>
                        <option value="contract">Contract</option>
                    </select>
                </div>
            </div>
            <div class="input">
                <label for="">Requirements</label>
                <input v-model="requirements" type="text"  name="education" id="" placeholder="">
            </div>
            <div class="input">
                <label for="">Deadline</label>
                <input type="date" v-model="deadline" name="education" id="" placeholder="">
            </div>
            <div class="input">
                <input class="input-btn" type="submit" value="Add Job">
            </div>
        </form>
    </div>
    
</template>

<script>
import {supabase} from '../../supabase-client.ts'

export default {
    name: 'AddJobs',
    props: ['profileDetails', 'userEmail'],
    emits: ['close'],
    data(){
        return{
            title: '',
            description: '',
            employer: '',
            salary: '',
            location: '',
            job_type: '',
            deadline: '',
            requirements: '',
        }
    },
    methods: {
        async onSubmit(e){
            e.preventDefault()

            try{
                const formattedRequirementsArray = this.requirements
                    ? this.requirements.split(',').map(skill => skill.trim()).filter(Boolean)
                    : [];

                const {data, error} = await supabase.from("Job").insert({
                    title: this.title,
                    location: this.location,
                    description: this.description,
                    salary: this.salary,
                    requirements: formattedRequirementsArray,
                    deadline: this.deadline,
                    job_type: this.job_type,
                    employer: this.profileDetails.id,
                });
                if (error) throw error;
                if (data){
                    console.log("successfully saved profile")
                }
                this.clearform()
                this.$emit('close')
                

            }catch(err){
                console.error("Error matching user state:", err.message)
            }
        },
        clearform(){
            this.title = '',
            this.location = '',
            this.description = '',
            this.salary = '',
            this.requirements = '',
            this.deadline = ''
        }
    }
}
</script>

<style scoped>
    .add-modal{
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

    .close-modal{
        position: absolute;
        right: 380px;
        padding: 0px 10px 10px 10px;
        cursor: pointer;
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
    
    input, textarea, select{
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #8790a163;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        color: #666c79;
    }

    select{
        padding: 8px;
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
</style>