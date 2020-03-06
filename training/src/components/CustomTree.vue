<template>
    <div class="tree">
        <!--<ul id="myUL">
            <li>
                <span class="caret expand" data-path="hello" data-type="category">Utilisation de l'interface</span>
            </li>
            <li><span class="caret expand" data-path="hello" data-type="category">Architecture Générale</span>
            </li>
            <li>
                <span class="caret expand ">Tutoriel</span>
                <ul>
                    <li><span data-type="category" data-path="/configuration"
                                    class="caret expand">Configuration</span>
                        <ul>
                            <li><span data-type="lesson" data-path="hello" class="expand zbang">Créer Module</span></li>
                            <li><span data-type="lesson" data-path="hello" class="expand">Créer Objet Métier</span></li>
                            <li><span data-type="lesson" data-path="hello" class="expand ">Créer Attribut</span></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="tree-element"><span data-type="category" class="caret expand ">Opérations</span>
            </li>
            <li class="tree-element"><span data-type="category" class="caret expand ">Tests Plateforme training</span>
            </li>
        </ul>-->
        <!--<ul id="secondTree">
        </ul>-->
        <TreeViewNode v-for="motherCat in this.tree" :key="motherCat.trnCatPath" :node="motherCat" :depth="0"></TreeViewNode>

    </div>

</template>

<script>
    import {mapGetters} from "vuex";
    import TreeViewNode from "./TreeViewNode";

    export default {
        name: "CustomTree",
        components: {
            TreeViewNode
        },
        computed: {
            ...mapGetters([
                'currentLesson',
                'tree',
            ])
        },
        data: () => ({
            activeLesson: "hello"
        }),

        mounted() {
            //let secondTree = document.getElementById("secondTree");
            /*this.tree.forEach(cat => {
                console.log(this.generateCategory(cat))
            });*/

            //var v = this;
            //console.log(v)
            //this.setFoldingListeners();
            //this.setOnClickListeners(v);
        },
        methods: {
            generateCategory(category) {
                let li = document.createElement("li")
                let span = document.createElement("span");
                span.innerText = category.trnCatTitle;
                span.setAttribute("data-path", category.trnCatPath);
                span.setAttribute("data-type", "category");
                if(category.categories.length > 0 || category.lessons.length > 0)
                    span.classList.add("caret")

                span.classList.add("expand")
                li.appendChild(span);
                let secondTree = document.getElementById("secondTree");
                secondTree.append(li)
                console.log(span);
                console.log(li);
                console.log(secondTree);
                return li;
            },

            generateLesson(lesson) {
                let li = document.createElement("li")
                let span = document.createElement("span");
                span.innerText = lesson.trnLsnTitle;
                span.setAttribute("data-path", lesson.trnLsnPath);
                span.setAttribute("data-type", "lesson");
                span.classList.add("expand")

                console.log(span);
                li.appendChild(span);
                return li;
            },


            //To use after the tree is built
            setFoldingListeners: () => {
                let carets = document.getElementsByClassName("caret");
                let i;
                for (i = 0; i < carets.length; i++) {
                    carets[i].addEventListener("click", function () {
                        this.parentElement.querySelector("ul").classList.toggle("folded");
                        this.classList.toggle("caret-down");
                    });
                }
            },

            //To use after the tree is built
            setOnClickListeners: (instance) => {
                let treeElements = document.getElementsByClassName("expand");
                for (let i = 0; i < treeElements.length; i++) {
                    if (treeElements[i].dataset.type === "lesson") {
                        treeElements[i].addEventListener("click", () => {
                            treeElements[i].classList.toggle("active")
                            //1. Rediriger vers la leçon correspondante
                            //instance.navigateToLesson(treeElements[i].dataset['path']);
                            instance.toString()
                            //2. Activer cet élément, désactiver les autres l'élément actif du treeview
                            //Ce process doit être fait par l'instance vue de l'App, pcq dans cette fonction
                            // on ne peut pas accéder au store et donc pas à la valeur de currentLesson.trnLsnPath
                            /*let elements = document.getElementsByClassName("expand");
                            for (let j = 0; j < elements.length; j++) {
                                if(elements[j].dataset['path'] === instance.currentLesson.trnLsnPath)
                                    elements[j].classList.add("active")
                                else
                                    elements[j].classList.remove("active")
                            }*/
                        })
                    }
                }
            },

            navigateToLesson(path) {
                this.$router.push('/lessonItem' + path).catch(() => console.log("Navigation Duplicated"))
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    .tree {
        color: white;
        background: linear-gradient($color-primary, $color-secondary);

        .expand {
            font-size: 1.1rem;
            display: block;
            height: 100%;
            border-bottom-right-radius: $radius-tree-element;
            border-top-right-radius: $radius-tree-element;
            padding: 10px;

            &.caret::before {
                content: "\25B6";
                color: white;
                display: inline-block;
                margin-right: 6px;
                transition: transform $duration-caret-rotation ease-in-out;
            }

            &.caret-down::before {
                transform: rotate(90deg);
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
                cursor: pointer;
            }
        }

        .folded { //applies on <ul> elements
            display: none;
        }

        .unfolded {
            display: block;
        }

        .active {
            background-color: $color-active;

            &:hover {
                background-color: $color-active;
            }
        }
    }



    #secondTree {
        background-color: red;

        .expand {
            background-color: #00bcd4;
        }
    }
</style>
