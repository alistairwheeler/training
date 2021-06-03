<template>
<div id="SearchBar">
  <ReactiveBase app="myindex" url="http://127.0.0.1:9200">

    <DataSearch class="datasearch" @valueSelected="valueSelected" componentId="SearchSensor" queryFormat="and"
                :dataField="searchFields">
                <div slot="renderNoSuggestion" >
                  <div>
                      Aucun résultat de recherche
                  </div>
                </div>
                <div
                    class="suggestion"
                    slot="render"
                    slot-scope="{
                        downshiftProps: { isOpen, highlightedIndex, getItemProps, getItemEvents },
                        data: suggestions,
                    }"
                  >
                  <div v-if="isOpen" class="result-list-container">
                    <div  class="result-container" v-for="suggestion in (suggestions || []).map(s => ({
                                      label: s.source.trnLsnTitle,
                                      value: s.source.trnLsnTitle,
                                      excerpt: s.source.trnLsnDescription,
                                      path: s.source.trnLsnFrontPath,
                                      key: s._id,
                                  }))"
                      v-bind="getItemProps({ item: suggestion })"
                      v-on="getItemEvents({ item: suggestion })"
                      :key="suggestion._id">
                      <div class="result-item">
                        <div class="result-title">{{suggestion.label}}</div>
                        <div class="result-url">
                          <div>
                            <a :href="trainingUrl+suggestion.path" target="_blank"><img :src="'http://www.google.com/s2/favicons?domain='+trainingUrl+suggestion.path"/> {{trainingUrl}}{{suggestion.path}}</a>
                          </div>
                        </div>
                        <div class="result-body">
                          {{suggestion.excerpt}}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
    </DataSearch>
    <!--<MultiList componentId="MultiList" dataField="searchType.keyword"  title="Type" :showCount="false" :showSearch="false"
      className="multi-list-container"/>-->

    <!--<div v-if="searchUsed">
      <ReactiveList componentId="SearchResult" dataField="searchFields" className="result-list-container" :pagination="true" :size="10" :react="{ and: ['SearchSensor', 'MultiList'] }">
        <div slot="renderItem" slot-scope="{item}" class="result-container">
              <div class="result-item" :id="item._id" :key="item._id" :itemUrl="trainingUrl+item.trnLsnFrontPath" @click="openPage(trainingUrl+item.trnLsnFrontPath)">
                <div class="result-title">{{item.searchType}} - {{item.trnLsnTitle}}</div>
                <div class="result-url">
                  <div>
                    <a :href="trainingUrl+item.trnLsnFrontPath" target="_blank"><img :src="'http://www.google.com/s2/favicons?domain='+trainingUrl+item.trnLsnFrontPath"/> {{trainingUrl}}{{item.trnLsnFrontPath}}</a>
                  </div>
                </div>
                <div class="result-body">
                  {{item.trnLsnDescription}}
                </div>
          </div>
        </div>

        <div slot="renderItem" slot-scope="{ item }">
          <div :id="item._id" class="flex search-content" :key="item._id">
            <div class="flex column justify-center ml20">
              <div class="flex column justify-space-between">
                <div class="search-header">
                  <a :href="'https://docs2.simplicite.io'+item.trnLsnFrontPath" target="_blank">{{ item.trnLsnTitle }}</a>
                </div>
                <div>
                  {{ item.trnLsnDescription }}
                </div>
              </div>

            </div>
          </div>
        </div>
      </ReactiveList>
    </div>-->
  </ReactiveBase>
</div>
</template>


<script>
export default {
  name: "SearchBar",
  data: function() {
    return {
      searchUsed: false,
      trainingUrl : "https://docs2.simplicite.io",
      searchFields : ['trnLsnTitle', 'trnLsnDescription', 'trnLsnContent'],
    }
  },
  methods: {
    valueSelected(val, event, item) {
      this.$router.push('/lesson' + item.trnLsnFrontPath).catch(err => console.error(err));
      //this.searchUsed = true;
    },
    inputMethod(val) {
      this.name = val.target.value;
    },
    /*suggestions(suggestionsList){
      console.log(suggestionsList)
    },*/
    parseSuggestion: suggestion => ({
      label: `${suggestion.source.trnLsnTitle}`,
      value: suggestion.source.trnLsnTitle,
      source: suggestion.source  // for onValueSelected to work with parseSuggestion
    }),

    openPage(item){
      window.open(item, "_blank");

    }

  }
};

</script>

<style scoped lang="sass">
@import "../../assets/sass/variables"
@import "../../assets/sass/mixins"

.datasearch
  display: flex
  flex-direction: column

.result-list-container
  display: flex
  flex-direction: column
  border-left: 1.5px solid #ccc
  border-right: 1.5px solid #ccc
  border-bottom: 1.5px solid #ccc
  background-color: #fafafa
  position: absolute
  z-index: 1
  overflow: scroll
  max-height: 50rem
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)



.result-container
  &:hover
    background-color: #EDF3FA
    border-radius: .3rem
    cursor: pointer

.result-title
  font-weight: bold
  font-size: 1.2rem


.result-url
  padding: .5rem 0 .5rem 0


.result-body
  height: 100%
  font-size: 1rem


.result-item
  //border:solid black;
  display: flex
  flex-direction: column
  width: 100%
  padding: .5rem
  height: 100%
  min-height: 10em



</style>
