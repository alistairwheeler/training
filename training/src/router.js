import VueRouter from 'vue-router'
import LessonItem from "./components/LessonItem"
import HomePage from "./components/HomePage"
import Courses from "./components/Courses"
import Lessons from "./components/Lessons"
import PageNotFound from "./components/PageNotFound"
import SandBoxRedirect from "./components/SandBoxRedirect"

//1. Routes definition
const routes = [
    { path: '/', component: HomePage },
    { path: '/home', component: HomePage },
    { path: '/courses', component: Courses },
    { path: '/courses/:categoryPath', component: Courses },
    { path: '/courses/*', component: Courses },
    { path: '/lessons', component: Lessons },
    { path: '/lessonItem/*', component: LessonItem },
    { path: '/sandbox/:demandId', component: SandBoxRedirect },
    //This route is last in the list because it can override the other ones (because it matches all routes)
    { path: '/*', component: PageNotFound }
];

//2. Exporting the router instance
export default  new VueRouter({
    mode: 'history',
    routes});
