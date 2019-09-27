<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #514FBF">
        <router-link to="/home" class="navbar-brand"> Simplicité</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form id="search-form" class="form-inline my-2 my-lg-0">
                <input id="search-input" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn searchButton my-2 my-sm-0" type="submit">Search</button>
            </form>

            <ul class="navbar-nav ml-auto ">
                <li class="nav-item active">
                   <router-link to="/courses" class="nav-link"> Courses</router-link>
                   <!-- <a class="nav-link" href="#">Courses</a>-->
                </li>
                <li class="nav-item active">
                    <router-link to="/lessons" class="nav-link"> Lessons</router-link>
                </li>
                <li class="nav-item dropdown active">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Lesson Tree
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Header',
        props: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .searchButton {
        border-color: white;
        outline-color: white;
        color: white;
    }
    input[type=search] {
        width: 50%;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
    }

    /* When the input field gets focus, change its width to 100% */
    input[type=search]:focus {
        width: 80%;
    }
    #search-form {
        width: 30%;
    }
</style>
