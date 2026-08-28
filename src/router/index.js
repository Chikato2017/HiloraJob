import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/AppHome'
import Register from '../views/AppRegister'
import Login from '../views/AppLogin'
import Admin from '../views/AppAdmin'
import ProfessionalAdmin from '../views/ProfessionalAdmin'
import EmployerAdmin from '../views/EmployerAdmin'
import ProfessionalReg from '../views/ProfessionalReg'
import EmployerReg from '../views/EmployerReg'

import AdminDashboard from '../components/admin/AdminDashboard'
import AdminVerification from '../components/admin/AdminVerification'
import AdminProfessionals from '../components/admin/AdminProfessionals'
import AdminCompanies from '../components/admin/AdminCompanies'
import AdminJobOpenings from '../components/admin/AdminJobOpenings'

import VerifiedJobs from '../components/professional/VerifiedJobs'
import MyApplications from '../components/professional/MyApplications'
import TalentNetwork from '../components/professional/TalentNetwork'
import VerifiedCompanies from '../components/professional/VerifiedCompanies'
import MyProfile from '../components/professional/MyProfile'

import EmployerJobopenings from '../components/employer/EmployerJobopenings'
import EmployerCandidates from '../components/employer/EmployerCandidates'
import EmployerTalents from '../components/employer/EmployerTalents'
import EmployerCompanies from '../components/employer/EmployerCompanies'
import EmployerProfile from '../components/employer/EmployerProfile'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/professional-reg',
        name: 'ProfessionalReg',
        component: ProfessionalReg
    },
    {
        path: '/employer-reg',
        name: 'EmployerReg',
        component: EmployerReg
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: AdminDashboard
            },
            {
                path: 'verification',
                name: 'AdminVerification',
                component: AdminVerification
            },
            {
                path: 'professionals',
                name: 'AdminProfessionals',
                component: AdminProfessionals
            },
            {
                path: 'companies',
                name: 'AdminCompanies',
                component: AdminCompanies
            },
            {
                path: 'job-openings',
                name: 'AdminJobOpenings',
                component: AdminJobOpenings
            },
        ]
    },
    {
        path: '/professional',
        name: 'Professional',
        component: ProfessionalAdmin,
        children: [
            {
                path: '',
                name: 'ProfessionalDashboard',
                component: VerifiedJobs
            },
            {
                path: 'my-applications',
                name: 'MyApplications',
                component: MyApplications
            },
            {
                path: 'verified-companies',
                name: 'VerifiedCompanies',
                component: VerifiedCompanies
            },
            {
                path: 'talent-network',
                name: 'TalentNetwork',
                component: TalentNetwork
            },
            {
                path: 'my-profile',
                name: 'MyProfile',
                component: MyProfile
            }
        ]
    },
    {
        path: '/employer',
        name: 'Employer',
        component: EmployerAdmin,
        children: [
            {
                path: '',
                name: 'Job-Openings',
                component: EmployerJobopenings
            },
            {
                path: 'candidates',
                name: 'Candidates',
                component: EmployerCandidates
            },
            {
                path: 'talents',
                name: 'Talents',
                component: EmployerTalents
            },
            {
                path: 'companies',
                name: 'Companies',
                component: EmployerCompanies
            },
            {
                path: 'company-profile',
                name: 'CompanyProfile',
                component: EmployerProfile
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router