import helpers from '@/utils/helpers';
// Layouts
import Authentication from '@/views/layouts/Authentication.vue';
import Main from '@/views/layouts/Main.vue';
// Auth
import Login from '@/views/auth/Login.vue';
import AdminRegister from '@/views/auth/AdminRegister.vue';
import NormalRegister from '@/views/auth/NormalRegister.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
// Pages
const Home = () => import( /* webpackChunkName: "home" */ '@/views/Home.vue');
const About = () => import( /* webpackChunkName: "about" */ '@/views/About.vue');
import error404 from '@/views/errors/404.vue';

const isNav = true;
const routes = [{
        path: '/',
        component: Main,
        meta: {
            auth: {
                roles: [helpers.userRoles().Admin.val, helpers.userRoles().Normal.val],
            }
        },
        children: [{
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    isNav,
                    title: "Home Page",
                }
            },
            {
                isNav,
                path: '/about',
                name: 'About',
                component: About,
                meta: {
                    title: "About Page"
                },
            }
        ]
    },
    {
        path: '/',
        component: Authentication,
        meta: {
            auth: {
                roles: [helpers.userRoles().Guest.val],
            }
        },
        children: [{
                path: "/login",
                name: "Login",
                component: Login,
                meta: {
                    title: "Login",
                }
            },
            {
                path: "/admin-register",
                name: "AdminRegister",
                component: AdminRegister,
                meta: {
                    title: "Register",
                }
            },
            {
                path: "/normal-register",
                name: "NormalRegister",
                component: NormalRegister,
                meta: {
                    title: "Register",
                }
            },
            {
                path: "/forgot-password",
                name: "ForgotPassword",
                component: ForgotPassword,
                meta: {
                    title: "Forgot Password",
                }
            },
            {
                path: "/reset-password",
                name: "ResetPassword",
                component: ResetPassword,
                meta: {
                    title: "Reset Password",
                }
            }
        ]
    },
    {
        path: '*',
        name: '404',
        component: error404,
        meta: {
            title: "404 Page Not Found"
        }
    },
];

export default routes;