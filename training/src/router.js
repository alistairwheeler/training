import VueRouter from 'vue-router'
import LessonItem from "./components/Pages/Lesson/LessonItem"
import HomePage from "./components/Pages/HomePage"
import PageNotFound from "./components/Pages/PageNotFound"
import SandBoxRedirect from "./components/Pages/SandBoxRedirect"
import SandBoxForm from "./components/Pages/SandBoxForm"

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
