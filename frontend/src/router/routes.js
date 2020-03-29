import helpers from '@/utils/helpers';
// Layouts
import Authentication from '@/views/layouts/Authentication.vue';
import Main from '@/views/layouts/Main.vue';
// Auth
import Login from '@/views/auth/Login.vue';
// Pages
const Home = () => import( /* webpackChunkName: "home" */ '@/views/Home.vue');
const About = () => import( /* webpackChunkName: "about" */ '@/views/About.vue');
import error404 from '@/views/errors/404.vue';

const isNav = true;
const routes = [

    {
        path: '/',
        component: Main,
        meta: {
            title: "Home"
        },
        children: [{
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    isNav,
                    title: "Home Page",
                    auth: {
                        roles: [helpers.userTypes().Admin, helpers.userTypes().Normal],
                        redirect: 'Login',
                    }
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
            title: "Authentication",
            auth: {
                roles: [helpers.userTypes().Guest],
                redirect: 'Home',
            }
        },
        children: [{
            path: "login",
            name: "Login",
            component: Login,
            meta: {
                title: "Login",
            }
        }]
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