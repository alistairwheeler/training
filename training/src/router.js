import VueRouter from 'vue-router'
import LessonItem from "./components/LessonItem"
import HomePage from "./components/HomePage"
import Courses from "./components/Courses"
import Lessons from "./components/Lessons"

//1. Routes definition
const routes = [
    { path: '/', component: HomePage },
    { path: '/home', component: HomePage },
    { path: '/courses', component: Courses },
    { path: '/lessons/section/:sectionId', component: Lessons },
    { path: '/lessons', component: Lessons },
    { path: '/lessons/:courseId/', component: Lessons },
    { path: '/lessonItem/:lessonId', component: LessonItem },
    //This route is last in the list because it can override the other ones (because it matches all routes)
    { path: '/*', component: HomePage }
];

//2. Exporting the router instance
export default  new VueRouter({
    mode: 'history',
    routes});
