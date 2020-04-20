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
const Home = () => import( /* webpackChunkName: "Home" */ '@/views/Home.vue');
import error404 from '@/views/errors/404.vue';

const routes = [{
        path: '/admin',
        component: Main,
        meta: {
            auth: {
                roles: [helpers.userRoles().Admin.val],
            }
        },
        children: [{
            path: 'home',
            name: 'AdminHome',
            component: Home,
            meta: {
                title: "Home Page"
            }
        }]
    },
    {
        path: '/normal',
        component: Main,
        meta: {
            auth: {
                roles: [helpers.userRoles().Normal.val],
            }
        },
        children: [{
            path: 'home',
            name: 'NormalHome',
            component: Home,
            meta: {
                title: "Home Page",
            }
        }]
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