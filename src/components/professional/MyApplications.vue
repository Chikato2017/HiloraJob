<template>
    <div class="my-applications-component">
        <div class="stats">
            <div class="professionals">
                <div class="header">
                    <h4>TOTAL APPLICATIONS</h4>
                    <h1>{{jobApplications.length}}</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/professional-two.svg" alt="">
                </div>
            </div>
            <div class="companies">
                <div class="header">
                    <h4>UNDER REVIEW</h4>
                    <h1>14</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/company-two.svg" alt="">
                </div>
            </div>
            <div class="openings">
                <div class="header">
                    <h4>SHORTLISTED & INTERVIEWS</h4>
                    <h1>10</h1>
                </div>
                <div class="info">
                    <img class="badge" src="../../assets/jobs-two.svg" alt="">
                </div>
            </div>
        </div>

        <div class="application-history">
            <div class="application-header">
                <div class="heading">
                    <div class="heading-top">
                        <h4>My Application History</h4>
                    </div>
                    <p class="heading-p">Track status updates directly from verified hiring partners.</p>
                </div>
                <div class="application-sorting">
                    <button class="all app-sort">All</button>
                    <button class="app-sort">Submitted</button>
                    <button class="app-sort">Under Review</button>
                    <button class="app-sort">Shortlisted</button>
                    <button class="app-sort">Interview</button>
                </div>
            </div>
            <div v-for="jobApp in jobApplications" :key="jobApp.id" class="profiles">
                <div class="img">
                    <img class="profile-img" src="../../assets/Software.jpg" alt="">
                </div>
                <div class="details">
                    <div>
                        <p class="name">{{jobApp.job.employer.company_name}}</p>
                        <h4 class="name-title">{{jobApp.job.title}}</h4>
                        <p class="title">
                            {{jobApp.job.location}}
                        </p>
                    </div>
                    <div class="about">
                        {{jobApp.job.description}}
                    </div>
                    <p class="salary">₦{{jobApp.job.salary}}</p>
                    <div class="core-skills">
                        <p>.Data Analysis</p>
                        <p>.AI Prompt</p>
                        <p>.CAD</p>
                    </div>
                </div>
                <div class="profile-btns">
                    <button class="approve">Apply</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {supabase} from '../../supabase-client.ts'

export default {
    name: 'MyApplications',
    data(){
        return{
            profileDetails: null,
            jobApplications: []
        }
    },
    async mounted(){
        try{
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            const userId = user.id;
            //this.userEmail = user.email

            const { data: professionalCheck, error: dBError} = await supabase
            .from('Professional')
            .select('*')
            .eq('user', userId)
            .maybeSingle();
            
            if (dBError) throw dBError;

            this.profileDetails = professionalCheck;
            
            this.fetchJobApplications()

        } catch (err) {
            console.error("Error matching user state:", err.message)
        }
        
    },
    methods: {
        async fetchJobApplications(){
            try{
                const { data, error } = await supabase
                .from("JobApplication")
                .select("*, job(title, employer(company_name), location, description, salary)")
                .eq('professional', this.profileDetails.id)

                if (error) throw error

                this.jobApplications = data || []
            }catch(err){
                console.error("Error fetching tasks:", err.message)
            }
        }
    }
}
</script>

<style scoped>
    .my-applications-component{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .stats{
        display: flex;
        gap: 15px;
        justify-content: space-between;
    }

    .professionals, .companies, .openings, .percentage{
        display: flex;
        gap: 15px;
        background: white;
        padding: 20px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #b7becad7;
        justify-content: space-between;
    }

    .header{
        display: flex;
        flex-direction: column;
    }

    .badge{
        width: 22px;
        height: 22px;
    }

    .header h4{
        color: #6b7280;
        font-size: 13px;
    }

    .info{
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .info h1{
        font-size: 25px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #151d2a;
    }

    .info p, .heading-p{
        font-size: 13px;
        color: #6b7280;
    }

    .application-history{
        background: white;
        padding: 25px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        border: 1px solid #a7adb96b;
        border-radius: 10px;
    }

    .application-header{
        display: flex;
        justify-content: space-between;
    }

    .application-sorting{
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .all{
        background:#151d2a !important;
        color: white;
    }

    .app-sort{
        background: #F8FAFC;
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
        border: 1px solid #a7adb96b;
        font-size: 12.5px;
    }

    .profiles{
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid #a7adb96b;
        padding: 15px;
        display: flex;
        gap: 15px;
        justify-content: space-between;
    }

    .img{
        width: 10%;
    }

    .profile-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .name{
        font-size: 14.5px;
    }

    .title{
        font-size: 13px;
        color:#6b7280;
    }

    .name-title{
        font-size: 18px;
    }

    .salary{
        font-size: 14px;
        font-weight: 600;
    }

    .core-skills{
        display: flex;
        gap: 5px;
        color: #ff5524;
        font-size: 11.5px;
    }

    .core-skills p{
        background: #f8d9a36b;
        padding: 3px;
        border-radius: 3px;
    }

    .about{
        padding: 10px;
        border-radius: 10px;
        background: #9ca3af75;
        font-size: 11.5px;
    }

    .details{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 80%;
    }

    .approve{
        background: #2563eb;
        padding: 10px;
        border: 1px solid #b7becad7;
        color: white;
        border-radius: 10px;
    }
</style>