(function(e){function s(s){for(var o,i,l=s[0],a=s[1],c=s[2],u=0,p=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);d&&d(s);while(p.length)p.shift()();return n.push.apply(n,c||[]),t()}function t(){for(var e,s=0;s<n.length;s++){for(var t=n[s],o=!0,l=1;l<t.length;l++){var a=t[l];0!==r[a]&&(o=!1)}o&&(n.splice(s--,1),e=i(i.s=t[0]))}return e}var o={},r={app:0},n=[];function i(s){if(o[s])return o[s].exports;var t=o[s]={i:s,l:!1,exports:{}};return e[s].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=o,i.d=function(e,s,t){i.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,s){if(1&s&&(e=i(e)),8&s)return e;if(4&s&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var o in e)i.d(t,o,function(s){return e[s]}.bind(null,o));return t},i.n=function(e){var s=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(s,"a",s),s},i.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=s,l=l.slice();for(var c=0;c<l.length;c++)s(l[c]);var d=a;n.push([0,"chunk-vendors"]),t()})({0:function(e,s,t){e.exports=t("56d7")},"034f":function(e,s,t){"use strict";var o=t("1356"),r=t.n(o);r.a},1356:function(e,s,t){},"17ab":function(e,s,t){"use strict";var o=t("6512"),r=t.n(o);r.a},2912:function(e,s,t){"use strict";var o=t("5584"),r=t.n(o);r.a},5584:function(e,s,t){},"56d7":function(e,s,t){"use strict";t.r(s);var o=t("2b0e"),r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-app",{staticClass:"app"},[e.isNavigationDrawerVisible()?t("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:e.drawer,callback:function(s){e.drawer=s},expression:"drawer"}},[t("v-treeview",{attrs:{items:this.$store.getters.treeViewItems,"item-key":"id",activatable:"",color:"warning","open-on-click":"",transition:""},on:{"update:active":function(s){return e.isItemSelected()}},scopedSlots:e._u([{key:"label",fn:function(s){var o=s.item;return[t("a",{on:{click:function(s){return e.redirectToLesson(o)}}},[e._v(e._s(o.name))])]}}],null,!1,1911419546)})],1):e._e(),t("v-app-bar",{attrs:{app:"",color:"primary",dark:"","clipped-left":""}},[e.isNavigationDrawerVisible()?t("v-app-bar-nav-icon",{on:{click:e.openOrCloseDrawer}}):e._e(),t("v-toolbar-title",{staticClass:"simplicite-logo",attrs:{id:"toolbar-title"},on:{click:function(s){return e.goHome()}}},[e._v("Simplicité")]),t("v-text-field",{staticClass:"ml-12",attrs:{flat:"","solo-inverted":"","hide-details":"","append-icon":"mdi-magnify",placeholder:"Search a keyword ..."}}),t("div",{staticClass:"flex-grow-1"}),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.checkIfRouteIsLesson(),expression:"checkIfRouteIsLesson()"}],attrs:{id:"previous-button",fab:"",icon:""},on:{click:function(s){return e.goToPreviousLesson()}}},[t("v-icon",[e._v("mdi-skip-previous")])],1),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.checkIfRouteIsLesson(),expression:"checkIfRouteIsLesson()"}],attrs:{id:"next-button",fab:"",icon:""},on:{click:function(s){return e.goToNextLesson()}}},[t("v-icon",[e._v("mdi-skip-next")])],1),t("v-toolbar-items",[t("v-btn",{attrs:{text:"",to:"/courses"}},[e._v("Cours")]),t("v-btn",{attrs:{text:"",to:"/lessons"}},[e._v("Leçons")])],1)],1),t("v-content",{staticClass:"content"},[t("v-container",{staticClass:"router-container-2",attrs:{"pa-0":"","mt-1":"",fluid:""},on:{"test-event":function(s){return e.logMessage()}}},[t("router-view",{key:e.$route.fullPath}),t("v-snackbar",{attrs:{id:"snackbar",timeout:e.snbTimeOut},model:{value:e.snackBar,callback:function(s){e.snackBar=s},expression:"snackBar"}},[t("span",{attrs:{id:"snb-text"}},[e._v(" "+e._s(e.snbText)+" ")]),t("v-btn",{attrs:{color:"#F08A7B",text:""},on:{click:function(s){e.snackBar=!1}}},[e._v("FERMER")])],1)],1)],1)],1)},n=[],i={name:"App",components:{},data:()=>({drawer:!1,snackBar:!1,snbTimeOut:1200,snbText:"",treeview:[],sections:[],lessons:[]}),methods:{openOrCloseDrawer(){this.$store.commit("DRAWER",!this.drawer),this.drawer=!this.drawer},goHome(){console.log("home !"),this.$router.push("/home")},goToPreviousLesson(){let e=this.$store.getters.otherLessonsIDs,s=e.length,t=this.$store.getters.currentLessonId;if(s>=2){let s=e.findIndex(e=>e===t);s>=1?this.$router.push("/lessonItem/"+e[s-1]):(this.shakeElement("previous-button"),this.showSnackBar("Il n'y a plus de leçons dans ce cours"))}else this.shakeElement("previous-button"),this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")},goToNextLesson(){let e=this.$store.getters.otherLessonsIDs,s=e.length,t=this.$store.getters.currentLessonId;if(s>=2){let o=e.findIndex(e=>e===t);o+1<s?this.$router.push("/lessonItem/"+e[o+1]):(this.shakeElement("next-button"),this.showSnackBar("Il n'y a plus de leçons dans ce cours"))}else this.shakeElement("next-button"),this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")},redirectToLesson(e){console.log("item.id : "),console.log(e.id),e.children?e.children&&(console.log("item has children"),this.$router.push("/lessons/section/"+e.id)):this.$router.push("/lessonItem/"+e.id)},shakeElement(e){document.getElementById(e).classList.add("animated"),setTimeout((function(){document.getElementById(e).classList.remove("animated")}),150)},hideButtons(){return this.checkIfRouteIsLesson()},isNavigationDrawerVisible(){return this.checkIfRouteIsLesson()},checkIfRouteIsLesson(){return console.log("is route a lesson"),console.log(this.$router.currentRoute.path),console.log(this.$router.currentRoute.path.split("/lessonItem/").length>=1),this.$router.currentRoute.path.split("/lessonItem/").length>=1},showSnackBar(e){this.snbText=e,this.snackBar=!0}},created(){this.treeview.forEach(e=>{e.forEach(e=>{7!==e.id&&5!==e.id&&8!==e.id||(e.active=!0)})})}},l=i,a=(t("034f"),t("2877")),c=t("6544"),d=t.n(c),u=t("7496"),p=t("40dc"),h=t("5bc1"),m=t("8336"),f=t("a523"),I=t("a75b"),v=t("132d"),L=t("f774"),_=t("2db4"),g=t("8654"),w=t("2a7f"),b=t("eb2a"),T=Object(a["a"])(l,r,n,!1,null,null,null),y=T.exports;d()(T,{VApp:u["a"],VAppBar:p["a"],VAppBarNavIcon:h["a"],VBtn:m["a"],VContainer:f["a"],VContent:I["a"],VIcon:v["a"],VNavigationDrawer:L["a"],VSnackbar:_["a"],VTextField:g["a"],VToolbarItems:w["a"],VToolbarTitle:w["b"],VTreeview:b["a"]});var S=t("8c4f"),D=t("f309");o["a"].use(D["a"]);var E=new D["a"]({theme:{themes:{light:{primary:"#387ED1",secondary:"#b0bec5",accent:"#ffffff",error:"#b71c1c"},dark:{primary:"#514FBF",secondary:"#b0bec5",accent:"#ff0011",error:"#b71c1c"}}},icons:{iconfont:"mdi"}}),C=t("2f62"),P=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"lesson-item-wrapper"}},[t("div",{class:{large:!e.openDrawer,thin:e.openDrawer}},[t("h1",{staticClass:"lesson-title smp-blue"},[t("span",{staticClass:"underlined"},[e._v(e._s(e.lessonToDisplay.title))])]),t("v-breadcrumbs",{attrs:{items:e.breadCrumbItems,divider:">"}}),e.lessonToDisplay.learningOutcomes?t("div",{staticClass:"lesson-content__lrn-outcomes"},[t("h2",{staticClass:"section-title"},[e._v("Objectifs Pédagogiques")]),t("div",{attrs:{id:"learning-outcomes-container"},domProps:{innerHTML:e._s(e.lessonToDisplay.learningOutcomes)}})]):e._e(),e.lessonToDisplay.genConcepts?t("div",{staticClass:"lesson-concepts"},[t("div",{attrs:{id:"concepts-container"},domProps:{innerHTML:e._s(e.lessonToDisplay.genConcepts)}})]):e._e()],1),t("div",{staticClass:"col-6",attrs:{id:"aside-content"}},[t("div",{attrs:{id:"pdf-container"}},[t("embed",{attrs:{src:e.lessonToDisplay.pdfUrl,type:"application/pdf",width:"100%",height:"100%"}})]),t("div",{attrs:{id:"video-container"}},[t("iframe",{attrs:{width:"100%",height:"100%",src:e.lessonToDisplay.videoUrl,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])]),t("h1",{attrs:{id:"error-message"}},[e._v("Sorry, we could not load this lesson")])])},O=[];class k{constructor(e,s,t,o,r,n,i,l,a,c,d,u){this.row_id=e,this.title=s,this.genConcepts=t,this.learningOutcomes=o,this.exercise=r,this.pdfUrl=n,this.videoUrl=i,this.sectionId=l,this.sectionName=a,this.courseId=c,this.courseName=d,this.order=u}static formatFromSimplicite({row_id:e,lrnLsnTitle:s,lrnLsnConcepts:t,lrnLsnLearningOutcomes:o,lrnLsnExercice:r,lrnLsnSlides:n,lrnLsnVideo:i,lrnLsnPrtId:l,lrnLsnPrtId__lrnPrtTitle:a,lrnLsnPrtId__lrnPrtPlnId:c,lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle:d,lrnLsnOrder:u}){return new k(e,s,t,o,r,n,i,l,a,c,d,u)}static convertToTreeView(e){return{id:e.row_id,name:e.lrnLsnTitle}}}var A={name:"LessonItem",data:()=>({lessonToDisplay:{},breadCrumbItems:[]}),computed:{openDrawer:function(){return this.$store.getters.drawer},...Object(C["c"])(["allLessonsLoaded","courses","lessons","lessonWithId","lessonsFromCourseAsListItems","lessonsFromSectionAsListItems","coursesAsListItems","lessonsAsListItems","displayedLesson"])},methods:{async fetchLesson(e){return new Promise((s,t)=>{let o=this.$smp.getBusinessObject("LrnLesson");o.get(e=>{e?s(e):t("Could not load the lesson")},e)})},async fetchTreeViewFromCourse(e){return console.log("fetchTreeViewFromCourse"),new Promise((s,t)=>{this.$smp.treeview(e=>{s(e.list)},"lrnTreeView",{service:"page",object:"LrnPlan",rowid:e,child:"LrnPart"})})},convertSmpTreeView(e){let s=e.map(e=>e.item),t=s.map(e=>({id:e.row_id,name:e.lrnPrtTitle,children:[]})),o=e.map(e=>e.links),r=o.map(e=>e[0].list),n=[];r.forEach(e=>{e.forEach(e=>n.push(e.item))});let i=n.map(e=>({id:e.row_id,name:e.lrnLsnTitle,sectionId:e.lrnLsnPrtId,order:e.lrnLsnOrder}));for(let l=0;l<i.length;l++)for(let e=0;e<t.length;e++)i[l].sectionId===t[e].id&&t[e].children.push(i[l]);for(let l=0;l<t.length;l++)t[l].children.sort((e,s)=>e.order-s.order);return this.$store.commit("UPDATE_TREE_VIEW_ITEMS",t),t},sortLessonIDs(e){let s=[];return e.forEach(e=>{e.children.forEach(e=>s.push(parseInt(e.id)))}),s}},async created(){let e=parseInt(this.$route.params.lessonId),s=this.lessonWithId(e);if(this.$store.commit("UPDATE_CURRENT_LESSON_ID",e),void 0!==s)console.log("smpLesson IS defined"),this.lessonToDisplay=k.formatFromSimplicite(s);else if(void 0===s){console.log("smpLesson NOT defined");let s={smp:this.$smp,lessonId:e};this.$store.dispatch("fetchLesson",s).then(()=>this.lessonToDisplay=k.formatFromSimplicite(this.$store.getters.lessonWithId(e)))}let t={smp:this.$smp,courseId:parseInt(this.lessonToDisplay.courseId)};this.$store.dispatch("fetchTreeViewFromCourse",t),this.breadCrumbItems.push({text:this.lessonToDisplay.courseName,disabled:!1,href:"/lessons/"+this.lessonToDisplay.courseId}),this.breadCrumbItems.push({text:this.lessonToDisplay.sectionName,disabled:!1,href:"/lessons/"+this.lessonToDisplay.sectionId}),this.breadCrumbItems.push({text:this.lessonToDisplay.title,disabled:!1})}},$=A,x=(t("57da"),t("2bc5")),V=Object(a["a"])($,P,O,!1,null,"7ed7a898",null),R=V.exports;d()(V,{VBreadcrumbs:x["a"]});var N=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"homepage-container"}},[t("div",{attrs:{id:"outer-div"}},[t("div",{staticClass:"row-1"},[e._m(0),t("div",{attrs:{id:"heading"}},[t("h1",{staticClass:"heading__title"},[e._v("Simplicite Software Training Platform")]),t("p",{staticClass:"heading__promotion"},[e._v("\n                    Learn to master the Simplicite platform to help your company build powerful applications, at lightning speed.")]),t("p",{staticClass:"heading__promotion"},[e._v(" This training will help you understand the basics of how\n                    our platform works and teach you the good practices to become a great application designer ")]),t("v-btn",{staticClass:"try-button",attrs:{"x-large":"",outlined:"",link:"",color:"white"},on:{click:function(s){return e.redirectTo("/courses")}}},[e._v("Try It ")])],1)]),t("nav",[t("ul",{staticClass:"nav-links"},[t("li",[t("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"#387ED1"},on:{click:function(s){return e.redirectTo("https://simplicite.fr/")}}},[e._v("Discover our offers ")])],1),t("li",[t("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"#387ED1"},on:{click:function(s){return e.redirectTo("https://docs.simplicite.io/")}}},[e._v(" Read the Documentation")])],1),t("li",[t("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"#387ED1"},on:{click:function(s){return e.redirectTo("https://simplicite.fr/cas-clients/")}}},[e._v("Watch Examples ")])],1)])])])])},j=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"video-wrapper"}},[t("iframe",{attrs:{src:"https://player.vimeo.com/video/359243007",width:"712",height:"400",frameborder:"0",allow:"autoplay; fullscreen",allowfullscreen:""}})])}],F={name:"HomePage",props:{},data:()=>({}),methods:{redirectTo(e){window.location.href=e}}},B=F,U=(t("17ab"),Object(a["a"])(B,N,j,!1,null,"60f2cad6",null)),H=U.exports;d()(U,{VBtn:m["a"]});var M=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"lesson-item-wrapper"}},[t("div",{attrs:{id:"wrapper"}},[t("h1",{staticClass:"smp-blue"},[e._v("Tous les cours disponibles :")]),t("ItemList",{attrs:{itemType:"courses","course-id":"courseId"}})],1)])},W=[],Y=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"item-list-wrapper"},e._l(e.listToDisplay,(function(s){return t("v-card",{key:s.row_id,staticClass:"item-prev",on:{click:function(t){return e.redirect(s)}}},[t("div",{staticClass:"item-prev__picture-container"},[t("img",{staticClass:"item-prev__picture",attrs:{src:"https://cdn.vuetifyjs.com/images/cards/mountain.jpg",alt:"course logo"}})]),t("div",{staticClass:"item-prev__info-container"},[t("h2",{staticClass:"item-prev__name "},[e._v(e._s(s.title))]),t("h3",{staticClass:"item-prev__short-description"},[e._v(e._s(s.shortDescription))]),t("p",{staticClass:"item-prev__long-description"},[e._v(e._s(s.longDescription))])])])})),1)},q=[],J={name:"ItemList",props:["itemType","courseId"],data:()=>({listToDisplay:[],redirectToLesson:!1}),computed:{...Object(C["c"])(["allLessonsLoaded","courses","lessons","lessonsFromCourseAsListItems","lessonsFromSectionAsListItems","coursesAsListItems","lessonsAsListItems","displayedLesson"])},methods:{...Object(C["b"])(["fetchCourses","fetchAllLessons","fetchLessonsFromCourseID"]),redirect(e){"courses"!==this.itemType?this.$router.push("/lessonItem/"+e.row_id):"courses"===this.itemType&&this.$router.push("/lessons/"+e.row_id)}},async created(){let e=this.allLessonsLoaded;if(console.log("allLessonsLoaded : "+e),"courses"===this.itemType){console.log("displaying courses");let e=this.coursesAsListItems;0===e.length?await this.fetchCourses(this.$smp).then(()=>this.listToDisplay=this.coursesAsListItems):this.listToDisplay=e}else if("lessons"===this.itemType){console.log("displaying lessons");let s=parseInt(this.courseId);if(console.log("courseId : "+s),!0===e)this.listToDisplay=0===s?this.lessonsAsListItems:this.lessonsFromCourseAsListItems(this.courseId);else if(!1===e)if(console.log("all lessons WERE NOT loaded previously"),0!==s&&this.lessonsFromCourseAsListItems(s).length>0)console.log("lessons from course : "+s+" from store"),this.listToDisplay=this.lessonsFromCourseAsListItems(this.courseId);else if(0!==s){console.log("lessons from course : "+s+" fetched from the web");let e={smp:this.$smp,courseId:s};await this.$store.dispatch("fetchLessonsFromCourseID",e).then(()=>this.listToDisplay=this.lessonsFromCourseAsListItems(s))}else console.log("fetching all lessons from the web"),await this.fetchAllLessons(this.$smp).then(()=>{console.log("this.lessonsAsListItems"),console.log(this.lessonsAsListItems),this.listToDisplay=this.lessonsAsListItems})}else if("sections"===this.itemType)if(console.log("displaying sections"),e)this.listToDisplay=this.lessonsFromSectionAsListItems(this.courseId);else{let e={smp:this.$smp,sectionId:parseInt(this.courseId)};await this.$store.dispatch("fetchLessonsFromSection",e).then(()=>{this.listToDisplay=this.lessonsFromSectionAsListItems(this.courseId)})}}},z=J,G=(t("2912"),t("b0af")),K=Object(a["a"])(z,Y,q,!1,null,"71212e3d",null),Q=K.exports;d()(K,{VCard:G["a"]});var X={name:"Courses",components:{ItemList:Q},data:()=>({courseId:0}),created(){console.log("Courses CREATED")},destroyed(){console.log("Courses DESTROYED")}},Z=X,ee=(t("ec0b"),Object(a["a"])(Z,M,W,!1,null,"557a0636",null)),se=ee.exports,te=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"lessons-wrapper"}},[t("div",{attrs:{id:"wrapper"}},[t("h1",{staticClass:"smp-blue",attrs:{id:"page-title"}},[e._v("Toutes les leçons disponibles :")]),e.emptyList?t("v-btn",{staticClass:"redirect-button ma-2",attrs:{outlined:"",color:"#387ED1"},on:{click:function(e){return this.$router.push("/courses")}}},[e._v("\n            Return to courses\n        ")]):e._e(),t("ItemList",{attrs:{itemType:e.lessonsOrSections,"course-id":e.courseID}})],1)])},oe=[],re={name:"Lessons",components:{ItemList:Q},data:()=>({displayedLessons:[],courseID:0,emptyList:!1,lessonsOrSections:"lessons"}),methods:{redirectToLesson(e){this.$router.push("/lessonItem/"+e)}},async created(){this.$route.params.courseId?(console.log("courseId : "+this.$route.params.courseId),this.courseID=parseInt(this.$route.params.courseId)):this.$route.params.sectionId?(console.log("sectionId : "+this.$route.params.sectionId),this.lessonsOrSections="sections",this.courseID=parseInt(this.$route.params.sectionId)):this.courseID=0}},ne=re,ie=(t("ab8c"),Object(a["a"])(ne,te,oe,!1,null,"37ecf43c",null)),le=ie.exports;d()(ie,{VBtn:m["a"]});const ae=[{path:"/",component:H},{path:"/home",component:H},{path:"/courses",component:se},{path:"/lessons/section/:sectionId",component:le},{path:"/lessons",component:le},{path:"/lessons/:courseId/",component:le},{path:"/lessonItem/:lessonId",component:R},{path:"/*",component:H}];var ce=new S["a"]({mode:"history",routes:ae});class de{constructor(e,s,t,o){this.row_id=e,this.title=s,this.shortDescription=t,this.longDescription=o}static convertSmpLesson({row_id:e,lrnLsnTitle:s,lrnLsnShortDescription:t="",lrnLsnLongDescription:o=""}){return new de(parseInt(e),s,t,o)}static convertSmpCourse({row_id:e,lrnPlnTitle:s,lrnPlnShortDescription:t="",lrnPlnLongDescription:o=""}){return new de(parseInt(e),s,t,o)}}function ue(e){let s=e.map(e=>e.item),t=s.map(e=>({id:e.row_id,name:e.lrnPrtTitle,children:[]})),o=e.map(e=>e.links),r=o.map(e=>e[0].list),n=[];r.forEach(e=>{e.forEach(e=>n.push(e.item))});let i=n.map(e=>({id:e.row_id,name:e.lrnLsnTitle,sectionId:e.lrnLsnPrtId,order:e.lrnLsnOrder}));for(let l=0;l<i.length;l++)for(let e=0;e<t.length;e++)i[l].sectionId===t[e].id&&t[e].children.push(i[l]);for(let l=0;l<t.length;l++)t[l].children.sort((e,s)=>e.order-s.order);return console.log("finished converting smpTreeView"),t}function pe(e){let s=[];return e.forEach(e=>{e.children.forEach(e=>s.push(parseInt(e.id)))}),s}o["a"].use(C["a"]);var he=new C["a"].Store({state:{displayedLesson:{},courses:[],lessons:[],currentSectionId:0,currentCourseId:0,allLessonsLoaded:!1,drawer:!1,currentLessonId:0,otherLessonsIDs:[],treeViewItems:[]},getters:{allLessonsLoaded:e=>{return e.allLessonsLoaded},drawer:e=>{return e.drawer},currentLessonId:e=>{return e.currentLessonId},otherLessonsIDs:e=>{return e.otherLessonsIDs},treeViewItems:e=>{return e.treeViewItems},displayedLesson:e=>{return e.displayedLesson},courses:e=>{return e.courses},coursesAsListItems:e=>{return e.courses.map(e=>de.convertSmpCourse(e))},lessons:e=>{return e.lessons},lessonWithId:e=>s=>{return console.log(e.lessons.find(e=>parseInt(e.row_id)===s)),e.lessons.find(e=>parseInt(e.row_id)===s)},lessonsFromCourseAsListItems:e=>s=>{let t=e.lessons.filter(e=>parseInt(e.lrnLsnPrtId__lrnPrtPlnId)===s);return t.map(e=>de.convertSmpLesson(e))},lessonsFromSectionAsListItems:e=>s=>{let t=e.lessons.filter(e=>parseInt(e.lrnLsnPrtId)===s);return t.map(e=>de.convertSmpLesson(e))},lessonsAsListItems:e=>{return console.log("lessonsAsListItems"),e.lessons.map(e=>de.convertSmpLesson(e))}},mutations:{ALL_LESSONS_LOADED(e,s){e.allLessonsLoaded=s},DRAWER(e,s){e.drawer=s},PUSH_COURSES(e,s){void 0===e.courses.find(e=>e.row_id===s.row_id)?e.courses.push(s):console.log("course already in the store")},PUSH_LESSON(e,s){void 0===e.lessons.find(e=>e.row_id===s.row_id)?e.lessons.push(s):console.log("lesson already in the store")},UPDATE_CURRENT_LESSON_ID(e,s){o["a"].set(e,"currentLessonId",s)},UPDATE_OTHER_LESSONS_IDs(e,s){o["a"].set(e,"otherLessonsIDs",s)},UPDATE_TREE_VIEW_ITEMS(e,s){o["a"].set(e,"treeViewItems",s)},UPDATE_DISPLAYED_LESSON(e,s){o["a"].set(e,"displayedLesson",s)},UPDATE_COURSES(e,s){e.courses=s},UPDATE_LESSONS(e,s){e.lessons=s}},actions:{updateDisplayedLesson({commit:e},s){console.log(s),e("UPDATE_DISPLAYED_LESSON",s)},async fetchCourses({commit:e},s){return new Promise((t,o)=>{let r=s.getBusinessObject("LrnPlan");r.search(()=>{r.list?(r.list.forEach(s=>e("PUSH_COURSES",s)),t(r.list)):o("Could not load the content")},{})})},async fetchLesson(e,s){return new Promise((t,o)=>{let r=s.smp.getBusinessObject("LrnLesson");r.get(s=>{s?(console.log(s),e.commit("PUSH_LESSON",s),e.commit("UPDATE_DISPLAYED_LESSON",s),t(s)):o("Could not load the lesson")},s.lessonId)})},async fetchAllLessons({commit:e},s){return new Promise((t,o)=>{let r=s.getBusinessObject("LrnLesson");r.search(()=>{r.list?(r.list.forEach(s=>e("PUSH_LESSON",s)),e("ALL_LESSONS_LOADED",!0),t(r.list)):t("Could not load the content")},{})})},async fetchLessonsFromCourseID(e,s){return new Promise((t,o)=>{let r=s.smp.getBusinessObject("LrnLesson");r.search(()=>{r.list?(r.list.forEach(s=>e.commit("PUSH_LESSON",s)),t(r.list)):o("Could not load the content")},{lrnLsnPrtId__lrnPrtPlnId:s.courseId})})},async fetchLessonsFromSection(e,s){return new Promise((t,o)=>{let r=s.smp.getBusinessObject("LrnLesson");r.search(()=>{r.list?(r.list.forEach(s=>e.commit("PUSH_LESSON",s)),t(r.list)):o("Could not load the content")},{lrnLsnPrtId:s.sectionId})})},async fetchTreeViewFromCourse(e,s){return new Promise((t,o)=>{s.smp.treeview(s=>{console.log(s);let o=ue(s.list);e.commit("UPDATE_TREE_VIEW_ITEMS",o),e.commit("UPDATE_OTHER_LESSONS_IDs",pe(o)),t(o)},"lrnTreeView",{service:"page",object:"LrnPlan",rowid:s.courseId,child:"LrnPart"})})}}});o["a"].config.productionTip=!1,o["a"].use(S["a"]),o["a"].use(C["a"]),o["a"].prototype.$smp=new Simplicite.Ajax("/app","api","designer","simplicite"),new o["a"]({el:"#app",store:he,render:e=>e(y),vuetify:E,router:ce}).$mount("#app")},"57da":function(e,s,t){"use strict";var o=t("acbc"),r=t.n(o);r.a},6512:function(e,s,t){},ab8c:function(e,s,t){"use strict";var o=t("f331"),r=t.n(o);r.a},acbc:function(e,s,t){},c5d7:function(e,s,t){},ec0b:function(e,s,t){"use strict";var o=t("c5d7"),r=t.n(o);r.a},f331:function(e,s,t){}});
//# sourceMappingURL=app.e2dd5395.js.map