import helpers from '@/utils/helpers';
// Layouts
import Authentication from '@/views/layouts/Authentication.vue';
import Main from '@/views/layouts/Main.vue';
// Auth
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
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
                path: "/register",
                name: "Register",
                component: Register,
                meta: {
                    title: "Register",
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