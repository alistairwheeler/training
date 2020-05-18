import VueRouter from 'vue-router'
import Home from "./components/Pages/Home"
import Lesson from "./components/Pages/Lesson"
import PageNotFound from "./components/Pages/PageNotFound"
import SandBoxDeployment from "./components/Pages/SandBox/Deployment"
import SandBoxDemand from "./components/Pages/SandBox/Demand"

//1. Routes definition
const routes = [
    { path: '/', component: Home },
    { path: '/lessonItem/*', component: Lesson },
    { path: '/sandbox/:demandId', component: SandBoxDeployment },
    { path: '/sandbox-demand', component: SandBoxDemand },
    //This route is last in the list because it can override the other ones (because it matches all routes)
    { path: '/*', component: PageNotFound }
];

//2. Exporting the router instance
export default  new VueRouter({
    mode: 'history',
    routes});
