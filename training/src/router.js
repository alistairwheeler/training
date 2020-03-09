import VueRouter from 'vue-router'
import LessonItem from "./components/LessonItem"
import HomePage from "./components/HomePage"
import PageNotFound from "./components/PageNotFound"
import SandBoxRedirect from "./components/SandBoxRedirect"
import SandBoxForm from "./components/SandBoxForm"

//1. Routes definition
const routes = [
    { path: '/', component: HomePage },
    { path: '/lessonItem/*', component: LessonItem },
    { path: '/sandbox/:demandId', component: SandBoxRedirect },
    { path: '/sandbox-demand', component: SandBoxForm },
    //This route is last in the list because it can override the other ones (because it matches all routes)
    { path: '/*', component: PageNotFound }
];

//2. Exporting the router instance
export default  new VueRouter({
    mode: 'history',
    routes});
