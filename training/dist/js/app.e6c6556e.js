(function(t){function e(e){for(var r,n,a=e[0],l=e[1],c=e[2],h=0,u=[];h<a.length;h++)n=a[h],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&u.push(o[n][0]),o[n]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(u.length)u.shift()();return i.push.apply(i,c||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],r=!0,a=1;a<s.length;a++){var l=s[a];0!==o[l]&&(r=!1)}r&&(i.splice(e--,1),t=n(n.s=s[0]))}return t}var r={},o={app:0},i=[];function n(e){if(r[e])return r[e].exports;var s=r[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=r,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var d=l;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"00cd":function(t,e,s){"use strict";var r=s("2f38"),o=s.n(r);o.a},"13e3":function(t,e,s){},"1c6c":function(t,e,s){},"25da":function(t,e,s){"use strict";var r=s("2cb7"),o=s.n(r);o.a},"2cb7":function(t,e,s){},"2f38":function(t,e,s){},"47b1":function(t,e,s){"use strict";var r=s("aa08"),o=s.n(r);o.a},"56d7":function(t,e,s){"use strict";s.r(e);var r=s("2b0e"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{staticClass:"app"},[t.isNavigationDrawerVisible()?s("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:this.$store.getters.drawer,callback:function(e){t.$set(this.$store.getters,"drawer",e)},expression:"this.$store.getters.drawer"}},t._l(this.$store.getters.treeViewItems,(function(e){return s("ul",{key:e.row_id},[s("li",{staticClass:"treeview-section",on:{click:function(s){return t.redirectToLesson(e)}}},[t._v(" "+t._s(e.name))]),t._l(e.children,(function(e){return s("ul",{key:e.row_id},[s("li",{class:{"treeview-lesson--active":t.isLessonActive(e.id),"treeview-lesson":!t.isLessonActive(e.id)},on:{click:function(s){return t.redirectToLesson(e)}}},[t._v(t._s(e.name)+"\n                    ")])])}))],2)})),0):t._e(),s("v-app-bar",{attrs:{app:"",color:"primary",dark:"","clipped-left":""}},[t.isNavigationDrawerVisible()?s("v-app-bar-nav-icon",{on:{click:t.openOrCloseDrawer}}):t._e(),s("v-toolbar-title",{staticClass:"simplicite-logo",attrs:{id:"toolbar-title"},on:{click:function(e){return t.goHome()}}},[t._v("Simplicité")]),s("v-text-field",{staticClass:"ml-12",attrs:{flat:"","solo-inverted":"","hide-details":"","append-icon":"mdi-magnify",placeholder:"Search a keyword ..."}}),s("div",{staticClass:"flex-grow-1"}),s("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.checkIfRouteIsLesson(),expression:"checkIfRouteIsLesson()"}],attrs:{id:"previous-button",fab:"",icon:""},on:{click:function(e){return t.goToPreviousLesson()}}},[s("v-icon",[t._v("mdi-skip-previous")])],1),s("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.checkIfRouteIsLesson(),expression:"checkIfRouteIsLesson()"}],attrs:{id:"next-button",fab:"",icon:""},on:{click:function(e){return t.goToNextLesson()}}},[s("v-icon",[t._v("mdi-skip-next")])],1),s("v-toolbar-items",[s("v-btn",{attrs:{text:"",to:"/courses"}},[t._v("Cours")]),s("v-btn",{attrs:{text:"",to:"/lessons"}},[t._v("Leçons")])],1)],1),s("v-content",{staticClass:"content"},[s("v-container",{staticClass:"router-container-2",attrs:{"pa-0":"","mt-1":"",fluid:""},on:{"test-event":function(e){return t.logMessage()}}},[s("router-view",{key:t.$route.fullPath}),s("v-snackbar",{attrs:{id:"snackbar",timeout:t.snbTimeOut},model:{value:t.snackBar,callback:function(e){t.snackBar=e},expression:"snackBar"}},[s("span",{attrs:{id:"snb-text"}},[t._v(" "+t._s(t.snbText)+" ")]),s("v-btn",{attrs:{color:"#F08A7B",text:""},on:{click:function(e){t.snackBar=!1}}},[t._v("FERMER")])],1)],1)],1)],1)},i=[],n={name:"App",components:{},data:()=>({itemSelected:!0,drawer:!1,snackBar:!1,snbTimeOut:1200,activeLesson:!0,snbText:"",treeview:[],sections:[],lessons:[],items:[{row_id:2,name:"Joe"},{row_id:3,name:"Joe"}]}),methods:{isLessonActive(t){return console.log(t),parseInt(t)===parseInt(this.$store.getters.currentLessonId)},openOrCloseDrawer(){this.$store.commit("UPDATE_DRAWER",!this.drawer),this.drawer=!this.drawer},goHome(){console.log("home !"),this.$router.push("/home")},goToPreviousLesson(){let t=this.$store.getters.otherLessonsIDs,e=t.length,s=this.$store.getters.currentLessonId;if(e>=2){let e=t.findIndex(t=>t===s);e>=1?this.$router.push("/lessonItem/"+t[e-1]):(this.shakeElement("previous-button"),this.showSnackBar("Il n'y a plus de leçons dans ce cours"))}else this.shakeElement("previous-button"),this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")},goToNextLesson(){let t=this.$store.getters.otherLessonsIDs,e=t.length,s=this.$store.getters.currentLessonId;if(e>=2){let r=t.findIndex(t=>t===s);r+1<e?this.$router.push("/lessonItem/"+t[r+1]):(this.shakeElement("next-button"),this.showSnackBar("Il n'y a plus de leçons dans ce cours"))}else this.shakeElement("next-button"),this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")},redirectToLesson(t){console.log("item.id : "),console.log(t.id),t.children?t.children&&(console.log("item has children"),this.$router.push("/lessons/section/"+t.id)):this.$router.push("/lessonItem"+t.path)},shakeElement(t){document.getElementById(t).classList.add("animated"),setTimeout((function(){document.getElementById(t).classList.remove("animated")}),150)},isNavigationDrawerVisible(){return this.checkIfRouteIsLesson()},checkIfRouteIsLesson(){return this.$router.currentRoute.path.split("/lessonItem/").length>1},showSnackBar(t){this.snbText=t,this.snackBar=!0}},computed:{drawerOpen:function(){return this.$store.getters.drawer}}},a=n,l=(s("5c0b"),s("2877")),c=s("6544"),d=s.n(c),h=s("7496"),u=s("40dc"),p=s("5bc1"),m=s("8336"),g=s("a523"),v=s("a75b"),f=s("132d"),I=s("f774"),_=s("2db4"),L=s("8654"),y=s("2a7f"),w=Object(l["a"])(a,o,i,!1,null,null,null),C=w.exports;d()(w,{VApp:h["a"],VAppBar:u["a"],VAppBarNavIcon:p["a"],VBtn:m["a"],VContainer:g["a"],VContent:v["a"],VIcon:f["a"],VNavigationDrawer:I["a"],VSnackbar:_["a"],VTextField:L["a"],VToolbarItems:y["a"],VToolbarTitle:y["b"]});var b=s("8c4f"),T=s("f309");r["a"].use(T["a"]);var P=new T["a"]({theme:{themes:{light:{primary:"#20477A",secondary:"#387ED1",accent:"#3cba3c",error:"#b71c1c"},dark:{primary:"#514FBF",secondary:"#b0bec5",accent:"#ff0011",error:"#b71c1c"}}},icons:{iconfont:"mdi"}}),D=s("2f62"),E=s("998c"),k=s.n(E),O=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"lesson-item-wrapper"}},[s("div",{class:{large:!t.openDrawer,thin:t.openDrawer}},[s("h1",{staticClass:"lesson-title"},[t._v(t._s(t.lessonToDisplay.title))]),s("v-breadcrumbs",{staticClass:"breadcrumbs",attrs:{items:t.breadCrumbItems,divider:">"}}),t.lessonToDisplay.Content?s("div",{staticClass:"lesson_content"},[s("div",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}],staticClass:"html-content",domProps:{innerHTML:t._s(t.lessonToDisplay.Content)}})]):t._e()],1),s("div",{staticClass:"aside-content col-6"},[s("div",{staticClass:"aside-content__carousel-container"},[s("v-carousel",{attrs:{"hide-delimiters":"","show-arrows-on-hover":"",height:"100%"}},t._l(t.items,(function(t,e){return s("v-carousel-item",{key:e,attrs:{src:t.src}})})),1)],1),s("div",{staticClass:"video-container"},[s("iframe",{staticClass:"video-container__video-frame",attrs:{src:t.lessonToDisplay.videoUrl,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])])])},S=[],$={name:"LessonItem",data:()=>({lessonToDisplay:{},breadCrumbItems:[],items:[{src:"https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/sky.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/bird.jpg"},{src:"https://cdn.vuetifyjs.com/images/carousel/planet.jpg"}]}),computed:{openDrawer:function(){return this.$store.getters.drawer},...Object(D["b"])(["getLessonWithPath"])},methods:{setBreadCrumb(){this.breadCrumbItems.push({text:this.lessonToDisplay.courseName,disabled:!1,href:"/lessons/"+this.lessonToDisplay.courseId}),this.breadCrumbItems.push({text:this.lessonToDisplay.sectionName,disabled:!1,href:"/lessons/"+this.lessonToDisplay.sectionId}),this.breadCrumbItems.push({text:this.lessonToDisplay.title,disabled:!1})},displayLesson(t){this.lessonToDisplay.title=t.title,this.lessonToDisplay.Content=t.content,this.lessonToDisplay.videoUrl=t.videoUrl}},async mounted(){let t=this.$router.currentRoute.path.split("lessonItem"),e=t[1]?t[1]:"";if(this.$store.commit("UPDATE_DRAWER",!0),""!==e){let t=this.getLessonWithPath(e);if(void 0!==t)this.displayLesson(t);else{let t={smp:this.$smp,itemPath:this.$route.params.lessonPath};this.$store.dispatch("fetchContentItem",t).then(t=>this.displayLesson(t))}}else console.error("error on the path of the lesson"+e)}},x=$,A=(s("47b1"),s("2bc5")),j=s("5e66"),V=s("3e35"),B=Object(l["a"])(x,O,S,!1,null,"2b965687",null),R=B.exports;d()(B,{VBreadcrumbs:A["a"],VCarousel:j["a"],VCarouselItem:V["a"]});var U=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"homepage-container"}},[s("div",{attrs:{id:"outer-div"}},[t._m(0),s("nav",[s("ul",{staticClass:"__links"},[s("li",[s("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"primary"},on:{click:function(e){return t.redirectTo("https://simplicite.fr/")}}},[t._v("Discover our offers ")])],1),s("li",[s("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"primary"},on:{click:function(e){return t.redirectTo("https://docs.simplicite.io/")}}},[t._v(" Read the Documentation")])],1),s("li",[s("v-btn",{staticClass:"text-white",attrs:{"x-large":"",link:"",color:"primary"},on:{click:function(e){return t.redirectTo("https://simplicite.fr/cas-clients/")}}},[t._v("Watch Examples ")])],1)])])])])},N=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row-1"},[s("div",{attrs:{id:"video-wrapper"}},[s("iframe",{attrs:{src:"https://player.vimeo.com/video/359243007",width:"712",height:"400",frameborder:"0",allow:"autoplay; fullscreen",allowfullscreen:""}})]),s("div",{staticClass:"heading"},[s("h1",{staticClass:"heading__title"},[t._v("Simplicite Software Training Platform")]),s("p",{staticClass:"heading__promotion"},[t._v("\n                    Learn to master the Simplicite platform to help your company build "),s("span",{staticClass:"highlighted"},[t._v(" powerful applications")]),t._v(", at "),s("span",{staticClass:"highlighted"},[t._v(" lightning speed")])]),s("p",{staticClass:"heading__promotion"},[t._v(" This training will help you understand the basics of how\n                    our platform works and teach you the "),s("span",{staticClass:"highlighted"},[t._v(" good practices")]),t._v(" to become a great application designer ")])])])}],M={name:"HomePage",methods:{redirectTo(t){window.location.href=t}}},H=M,F=(s("fc01"),Object(l["a"])(H,U,N,!1,null,"733ecc6d",null)),W=F.exports;d()(F,{VBtn:m["a"]});var Y=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"lesson-item-wrapper"}},[s("div",{attrs:{id:"wrapper"}},[s("h1",[t._v("Tous les cours disponibles :")]),s("ItemList",{attrs:{itemType:"courses","category-path":t.categoryPath}})],1)])},G=[],J=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item-list-wrapper"},t._l(t.listToDisplay,(function(e){return s("v-card",{key:e.row_id,staticClass:"item-prev",on:{click:function(s){return t.onListItemClicked(e)}}},[s("div",{staticClass:"item-prev__picture-container"},[s("img",{staticClass:"item-prev__picture",attrs:{src:"https://cdn.vuetifyjs.com/images/cards/mountain.jpg",alt:"course logo"}})]),s("div",{staticClass:"item-prev__info-container"},[s("h2",{staticClass:"item-prev__name"},[t._v(t._s(e.title))]),s("p",{staticClass:"item-prev__long-description"},[t._v(t._s(e.longDescription))])])])})),1)},q=[];class z{constructor(t,e,s,r,o,i){this.row_id=t,this.title=e,this.shortDescription=s,this.longDescription=r,this.itemType=o,this.path=i}static convertCategoryToListItem(t){return new z(parseInt(t.row_id),t.title,"Description d'une Catégorie",t.description,K,t.path)}static convertContentItemToListItem(t){return new z(parseInt(t.row_id),t.title,"Description d'un contenu",t.description,Q,t.path)}}const K="category",Q="content";var X={name:"ItemList",props:["itemType","categoryPath"],data:()=>({listToDisplay:[],redirectToLesson:!1}),computed:{...Object(D["b"])(["categoriesAsListItems","allCategoriesLoaded","allChildrenAsItemList","allItemsLoaded"])},methods:{onListItemClicked(t){t.itemType===K?this.$router.push("/courses"+t.path):t.itemType===Q?this.$router.push("/lessonItem"+t.path):console.error("there is an error on the itemType, it is : "+t.itemType)}},async created(){if(""===this.categoryPath){console.log("Loading everyCategory");let t={smp:this.$smp,categoryPath:this.categoryPath};this.allCategoriesLoaded&&this.allItemsLoaded?this.listToDisplay=this.categoriesAsListItems:await this.$store.dispatch("fetchCategories",t).then(()=>{this.listToDisplay=this.categoriesAsListItems}).then(()=>console.log(this.listToDisplay))}else{console.log("Loading children of a category");let t={smp:this.$smp,categoryPath:this.categoryPath};this.allCategoriesLoaded&&this.allItemsLoaded?this.listToDisplay=this.allChildrenAsItemList(this.categoryPath):await this.$store.dispatch("getCategoriesFromParent",t).then(()=>this.$store.dispatch("getLessonsFromCategory",t)).then(()=>this.listToDisplay=this.allChildrenAsItemList(this.categoryPath)).then(()=>console.log(this.listToDisplay))}}},Z=X,tt=(s("25da"),s("b0af")),et=Object(l["a"])(Z,J,q,!1,null,"a3724ed8",null),st=et.exports;d()(et,{VCard:tt["a"]});var rt={name:"Courses",components:{ItemList:st},data:()=>({categoryPath:""}),created(){console.log("Courses CREATED");let t=this.$router.currentRoute.path.split("courses/");this.categoryPath=t[1]?"/"+t[1]:""}},ot=rt,it=(s("9dba"),Object(l["a"])(ot,Y,G,!1,null,"586a2bdd",null)),nt=it.exports,at=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"lessons-wrapper"}},[s("div",{attrs:{id:"wrapper"}},[s("h1",{attrs:{id:"page-title"}},[t._v("Toutes les leçons disponibles :")]),t.emptyList?s("v-btn",{staticClass:"redirect-button ma-2",attrs:{outlined:"",color:"#387ED1"},on:{click:function(t){return this.$router.push("/courses")}}},[t._v("\n            Return to courses\n        ")]):t._e(),s("ItemList",{attrs:{itemType:t.lessonsOrSections,"course-id":t.courseID}})],1)])},lt=[],ct={name:"Lessons",components:{ItemList:st},data:()=>({displayedLessons:[],courseID:0,emptyList:!1,lessonsOrSections:"lessons"}),methods:{redirectToLesson(t){this.$router.push("/lessonItem/"+t)}},async created(){this.$route.params.courseId?(console.log("courseId : "+this.$route.params.courseId),this.courseID=parseInt(this.$route.params.courseId)):this.$route.params.sectionId?(console.log("sectionId : "+this.$route.params.sectionId),this.lessonsOrSections="sections",this.courseID=parseInt(this.$route.params.sectionId)):this.courseID=0}},dt=ct,ht=(s("00cd"),Object(l["a"])(dt,at,lt,!1,null,"5db615d1",null)),ut=ht.exports;d()(ht,{VBtn:m["a"]});const pt=[{path:"/",component:W},{path:"/home",component:W},{path:"/courses",component:nt},{path:"/courses/:categoryPath",component:nt},{path:"/courses/*",component:nt},{path:"/lessons",component:ut},{path:"/lessonItem/*",component:R},{path:"/*",component:W}];var mt=new b["a"]({mode:"history",routes:pt});class gt{constructor(t,e,s,r,o,i,n,a,l,c,d,h){this.row_id=t,this.title=e,this.genConcepts=s,this.learningOutcomes=r,this.exercise=o,this.pdfUrl=i,this.videoUrl=n,this.sectionId=a,this.sectionName=l,this.courseId=c,this.courseName=d,this.order=h}static formatFromSimplicite({row_id:t,lrnLsnTitle:e,lrnLsnConcepts:s,lrnLsnLearningOutcomes:r,lrnLsnExercice:o,lrnLsnSlides:i,lrnLsnVideo:n,lrnLsnPrtId:a,lrnLsnPrtId__lrnPrtTitle:l,lrnLsnPrtId__lrnPrtPlnId:c,lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle:d,lrnLsnOrder:h}){return new gt(t,e,s,r,o,i,n,a,l,c,d,h)}static convertToTreeView(t){return{id:t.row_id,name:t.lrnLsnTitle}}}function vt(t){let e=t.map(t=>t.item),s=e.map(t=>({id:t.row_id,name:t.lrnPrtTitle,children:[]})),r=t.map(t=>t.links),o=r.map(t=>t[0].list),i=[];o.forEach(t=>{t.forEach(t=>i.push(t.item))});let n=i.map(t=>({id:t.row_id,name:t.lrnLsnTitle,sectionId:t.lrnLsnPrtId,order:t.lrnLsnOrder}));for(let a=0;a<n.length;a++)for(let t=0;t<s.length;t++)n[a].sectionId===s[t].id&&s[t].children.push(n[a]);for(let a=0;a<s.length;a++)s[a].children.sort((t,e)=>t.order-e.order);return console.log("finished converting smpTreeView"),s}function ft(t){let e=[];return t.forEach(t=>{t.children.forEach(t=>e.push(parseInt(t.id)))}),e}class It{constructor({row_id:t,trnCatOrder:e,trnCatTitle:s,trnCatDescription:r,trnCatPath:o,trnCatId:i,trnCatId__trnCatTitle:n,trnCatId__trnCatPath:a}){this.row_id=parseInt(t),this.order=e,this.title=s,this.description=s,this.description=r,this.path=o,this.parentId=i,this.parentTitle=n,this.parentPath=a}}class _t{constructor({row_id:t,trnLsnOrder:e,trnLsnTitle:s,trnLsnDescription:r,trnLsnVideoUrl:o,trnLsnContent:i,trnLsnPath:n,trnLsnCatId:a,trnLsnCatId__trnCatTitle:l,trnLsnCatId__trnCatPath:c}){this.row_id=parseInt(t),this.order=e,this.title=s,this.description=r,this.videoUrl=o,this.videoUrl=o,this.content=i,this.path=n,this.categoryId=a,this.categoryTitle=l,this.categoryPath=c}}r["a"].use(D["a"]);var Lt=new D["a"].Store({state:{displayedLesson:{},courses:[],lessons:[],currentLessonId:0,currentSectionId:0,currentCourseId:0,allLessonsLoaded:!1,drawer:!1,otherLessonsIDs:[],treeViewItems:[],categories:[],items:[],allCategoriesLoaded:!1,allItemsLoaded:!1},getters:{allCategoriesLoaded:t=>{return t.allCategoriesLoaded},getLessonWithPath:t=>e=>{return t.items.find(t=>t.path===e)},allItemsLoaded:t=>{return t.allItemsLoaded},categoriesAsListItems:t=>{return t.categories.map(t=>z.convertCategoryToListItem(t))},contentItemsAsListItems:t=>{return t.items.map(t=>z.convertContentItemToListItem(t))},contentItemsFromCategoryAsItemList:t=>e=>{let s=t.items.filter(t=>t.categoryPath.includes(e));return s.map(t=>z.convertContentItemToListItem(t))},allChildrenAsItemList:t=>e=>{let s=t.categories.filter(t=>t.path.includes(e+"/")).map(t=>z.convertCategoryToListItem(t));return t.items.filter(t=>t.categoryPath.includes(e)).map(t=>s.push(z.convertContentItemToListItem(t))),s},ancestorCategories:t=>{return t.categories.filter(t=>void 0===t.parentId).map(t=>z.convertCategoryToListItem(t))},drawer:t=>{return t.drawer},treeViewItems:t=>{return t.treeViewItems},displayedLesson:t=>{return t.displayedLesson}},mutations:{ALL_CATEGORIES_LOADED(t,e){t.allCategoriesLoaded=e},ALL_ITEMS_LOADED(t,e){t.allItemsLoaded=e},PUSH_CATEGORY(t,e){void 0===t.categories.find(t=>t.row_id===e.row_id)?t.categories.push(e):console.log("category already in the store")},PUSH_ITEM(t,e){void 0===t.items.find(t=>t.row_id===e.row_id)?t.items.push(e):console.log("item already in the store")},UPDATE_DRAWER(t,e){t.drawer=e},UPDATE_TREE_VIEW_ITEMS(t,e){r["a"].set(t,"treeViewItems",e)},UPDATE_DISPLAYED_LESSON(t,e){r["a"].set(t,"displayedLesson",e)}},actions:{updateDisplayedLesson({commit:t},e){console.log(e),t("UPDATE_DISPLAYED_LESSON",e)},async fetchCategories({commit:t},e){return new Promise((s,r)=>{let o=e.smp.getBusinessObject("TrnCategory");o.search(()=>{o.list?(o.list.forEach(e=>{console.log(e),t("PUSH_CATEGORY",new It(e))}),t("ALL_LESSONS_LOADED",!0),s(o.list)):r("Could not load the categories")},{})})},async getCategoriesFromParent({commit:t},e){return new Promise((s,r)=>{let o=e.smp.getBusinessObject("TrnCategory");o.search(()=>{o.list?(o.list.forEach(e=>t("PUSH_CATEGORY",new It(e))),s(o.list)):r("Could not load the categories")},{trnCatPath:e.categoryPath})})},async fetchContentItem({commit:t},e){return new Promise((s,r)=>{let o=e.smp.getBusinessObject("TrnLesson");o.get(e=>{e?(t("PUSH_ITEM",new _t(e)),s(e)):r("Could not load the lesson")},{trnLsnPath:e.itemPath})})},async getLessons(t,e){return new Promise((s,r)=>{let o=e.getBusinessObject("TrnLesson");o.search(()=>{o.list?(o.list.forEach(e=>t.commit("PUSH_ITEM",new _t(e))),t.commit("ALL_ITEMS_LOADED",!0),s(o.list)):r("Could not load the lessons")},{})})},async getLessonsFromCategory({commit:t},e){return new Promise((s,r)=>{let o=e.smp.getBusinessObject("TrnLesson");o.search(()=>{o.list?(o.list.forEach(e=>t("PUSH_ITEM",new _t(e))),s(o.list)):r("Could not load the lessons")},{trnCatId:e.categoryId})})},async getChildrenOf({commit:t},e){console.log("getting children of : "+e.parentId);let s=[],r=new Promise((r,o)=>{let i=e.smp.getBusinessObject("TrnCategory");i.search(()=>{i.list?(i.list.forEach(e=>{s.push(new It(e)),t("PUSH_CATEGORY",new It(e))}),r(i.list)):o("Could not load the categories")},{trnCatId:e.parentId})}),o=new Promise((r,o)=>{let i=e.smp.getBusinessObject("TrnLesson");i.search(()=>{i.list?(i.list.forEach(e=>{s.push(new _t(e)),t("PUSH_ITEM",new _t(e))}),r(i.list)):o("Could not load the lessons")},{trnLsnCatId:e.parentId})});Promise.all([r,o]).then(()=>console.log(s))},async fetchTreeViewFromCourse(t,e){return console.log("fetchTreeView"),console.log(e),new Promise((s,r)=>{e.smp.treeview(e=>{console.log(e);let r=vt(e.list);t.commit("UPDATE_TREE_VIEW_ITEMS",r),t.commit("UPDATE_OTHER_LESSONS_IDs",ft(r)),s(r)},"lrnTreeView",{service:"page",object:"LrnPlan",rowid:e.courseId,child:"LrnPart"})})}}});r["a"].use(k.a),r["a"].config.productionTip=!1,r["a"].use(b["a"]),r["a"].use(D["a"]),r["a"].prototype.$smp=new Simplicite.Ajax("/app","api","designer","simplicite"),new r["a"]({el:"#app",store:Lt,render:t=>t(C),vuetify:P,router:mt}).$mount("#app")},"5c0b":function(t,e,s){"use strict";var r=s("13e3"),o=s.n(r);o.a},"9dba":function(t,e,s){"use strict";var r=s("1c6c"),o=s.n(r);o.a},aa08:function(t,e,s){},cdd6:function(t,e,s){},fc01:function(t,e,s){"use strict";var r=s("cdd6"),o=s.n(r);o.a}});
//# sourceMappingURL=app.e6c6556e.js.map