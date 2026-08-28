<template>
    <div class="side-bar-menu-container">
        <router-link exact-active-class="active-menu" to="/admin" class="sidebar-menu">
            <img src="../../assets/home.svg" alt="">
            <h4 class="dash-menu">Overview</h4>
        </router-link>
        <router-link active-class="active-menu" to="/admin/verification" class="sidebar-menu">
            <img src="../../assets/verified.svg" alt="">
            <h4 class="dash-menu">Verification</h4>
        </router-link>
        <router-link active-class="active-menu" to="/admin/professionals" class="sidebar-menu">
            <img src="../../assets/professional.svg" alt="">
            <h4 class="dash-menu">Professionals</h4>
        </router-link>
        <router-link active-class="active-menu" to="/admin/companies" class="sidebar-menu">
            <img src="../../assets/company.svg" alt="">
            <h4 class="dash-menu">Companies</h4>
        </router-link>
        <router-link active-class="active-menu" to="/admin/job-openings" class="sidebar-menu">
            <img src="../../assets/jobs.svg" alt="">
            <h4 class="dash-menu">Job Openings</h4>
        </router-link>
    </div>
    
</template>

<script>
export default {
    name: 'AppSidebar',
}

</script>

<style scoped>
.side-bar-menu-container{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.sidebar-menu{
    display: flex;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
    color: #6b7280;
    border-radius: 5px;
}

.dash-menu{
    font-size: 13.5px;
}

.active-menu{
    background: #151d2a;
    color: white;
}
    
</style>