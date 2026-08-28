<template>
    <div class="side-bar-menu-container">
        <router-link exact-active-class="active-menu" to="/professional" class="sidebar-menu">
            <img src="../../assets/jobs.svg" alt="">
            <h4 class="dash-menu">Verified Jobs</h4>
        </router-link>
        <router-link active-class="active-menu" to="/professional/my-applications" class="sidebar-menu">
            <img src="../../assets/verified.svg" alt="">
            <h4 class="dash-menu">My Applications</h4>
        </router-link>
        <router-link active-class="active-menu" to="/professional/verified-companies" class="sidebar-menu">
            <img src="../../assets/company.svg" alt="">
            <h4 class="dash-menu">Verified Companies</h4>
        </router-link>
        <router-link active-class="active-menu" to="/professional/talent-network" class="sidebar-menu">
            <img src="../../assets/professional.svg" alt="">
            <h4 class="dash-menu">Talent Network</h4>
        </router-link>
    </div>
    
</template>

<script>
export default {
    name: 'ProfessionalSidebar',
    
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
    border-radius: 5px;
}
</style>