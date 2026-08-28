<template>
    <div class="side-bar-menu-container">
        <router-link exact-active-class="active-menu" to="/employer" class="sidebar-menu">
            <img class="sidebar-img" src="../../assets/jobs.svg" alt="">
            <h4 class="dash-menu">My Job Openings</h4>
        </router-link>
        <router-link active-class="active-menu" to="/employer/candidates" class="sidebar-menu">
            <img class="sidebar-img" src="../../assets/professional.svg" alt="">
            <h4 class="dash-menu">Candidate Shortlist</h4>
        </router-link>
        <router-link active-class="active-menu" to="/employer/talents" class="sidebar-menu">
            <img class="sidebar-img" src="../../assets/professional-three.svg" alt="">
            <h4 class="dash-menu">Verified Talents</h4>
        </router-link>
        <router-link active-class="active-menu" to="/employer/companies" class="sidebar-menu">
            <img class="sidebar-img" src="../../assets/company.svg" alt="">
            <h4 class="dash-menu">Verified Companies</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'EmployerSidebar',
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

.sidebar-img{
    width: 25px;
    height: 25px;
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