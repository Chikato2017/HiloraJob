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
                <input class="input-btn" type="submit" value="Edit Job">
            </div>
        </form>
        <div v-if="job" class="input">
            <button @click="deleteJob(job.id)" class="delete-btn">Delete Job</button>
        </div>
    </div>
    
</template>

<script>
import {supabase} from '../../supabase-client.ts'

export default {
    name: 'EditJobs',
    props: ['profileDetails', 'userEmail', 'job'],
    emits: ['close'],
    data(){
        return{
            id: '',
            title: '',
            description: '',
            salary: '',
            location: '',
            job_type: '',
            deadline: '',
            requirements: '',
        }
    },
    watch: {
        job: {
            handler(newJob) {
                if (newJob) {
                    this.mapJobData(newJob);
                }
            },
            immediate: true // Forces it to map immediately if the prop exists right away
        }
    },
    mounted(){
        if(this.job){
            this.mapJobData(this.job);
        }
    },
    methods: {
        mapJobData(jobData) {
            this.id = jobData.id || '';
            this.title = jobData.title || '';
            this.description = jobData.description || '';
            this.salary = jobData.salary 
            this.location = jobData.location || '';
            this.job_type = jobData.job_type || '';
            this.deadline = jobData.deadline || '';
            
            // Convert database array ["Vue", "Node"] into editable text "Vue, Node"
            if (jobData.requirements) {
                this.requirements = Array.isArray(jobData.requirements)
                    ? jobData.requirements.join(', ')
                    : jobData.requirements;
            } else {
                this.requirements = '';
            }
        },
        async onSubmit(e){
            e.preventDefault()

            try{
                const formattedRequirementsArray = this.requirements
                    ? this.requirements.split(',').map(skill => skill.trim()).filter(Boolean)
                    : [];

                const {data, error} = await supabase.from("Job").update({
                    title: this.title,
                    location: this.location,
                    description: this.description,
                    salary: Number(this.salary),
                    requirements: formattedRequirementsArray,
                    deadline: this.deadline,
                    job_type: this.job_type,
                    employer: this.profileDetails.id,
                })
                .eq("id", this.id)
                if (error) throw error;
                if (data){
                    console.log("successfully saved profile")
                }

                alert("Successfully edited Job details");
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
        },
        async deleteJob(id){
            try {
                const { error } = await supabase
                .from("Job")
                .delete()
                .eq("id", id)
                
                if (error) throw error

                this.$emit('close')
                alert("Delete successful");
            } catch (err) {
                console.error("Error deleting task:", err.message)
                alert(err.message)
            }
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

    .delete-btn{
        background: red;
        width: 100%;
        color: white;
        cursor: pointer;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 10px;
        border-radius: 4px;
    }
</style>