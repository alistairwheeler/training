import VueRouter from 'vue-router'
import LessonItem from "./components/LessonItem"
import HomePage from "./components/HomePage"
import Courses from "./components/Courses"
import Lessons from "./components/Lessons"
import PageNotFound from "./components/PageNotFound"
import Stupid from "./components/Stupid";

//1. Routes definition
const routes = [
    { path: '/', component: HomePage },
    { path: '/home', component: HomePage },
    { path: '/courses', component: Courses },
    { path: '/lessons', component: Lessons },
    { path: '/lessons/:courseName/', component: Lessons },
    { path: '/lessonItem/:lessonId', component: LessonItem },
    { path: '/Stupid', component: Stupid },
    //This route should be last in the list because it can overcome the other ones (because it matches all routes)
    { path: '/*', component: PageNotFound }
];

//2. Exporting the router instance
export default  new VueRouter({
    mode: 'history',
    routes});
