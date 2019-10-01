<template>
  <v-app>
    <v-navigation-drawer app clipped="true" v-model="drawer" >
      <v-treeview :items="items" activatable color="warning" open-on-click></v-treeview>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark clipped-left="true">
      <v-app-bar-nav-icon @click="drawer = ! drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title>Simplicité</v-toolbar-title>
<!--      <form id="search-form" class="form-inline my-2 my-lg-0">
        <input id="search-input" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </form>-->

      <v-text-field
              flat
              solo-inverted
              hide-details
              append-icon="mdi-magnify"
              placeholder="Search a keyword ..."
              class="ml-12"
      ></v-text-field>

<!--      <v-form align-center justify-center>
        <v-text-field append-icon="mdi-magnify" placeholder="Search for a course"> </v-text-field>
      </v-form>-->

      <div class="flex-grow-1"></div>



      <v-btn icon>
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>

      <v-toolbar-items>
        <v-btn text > Courses</v-btn>
        <v-btn text>Lessons</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app padless="true">
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {
    },
    data: () => ({
      drawer: false,
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' },
              ],
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' },
          ],
        },
      ],
    }),
  };
</script>

<style >

</style>
