<template>
<div id="SearchBar">
  <ReactiveBase app="myindex" url="http://127.0.0.1:9200">
    <DataSearch @valueChange="valueChange" @valueSelected="valueSelected" componentId="SearchSensor" queryFormat="or"
            iconPosition="right"
            :showIcon="false"
            :showClear="false"
            :dataField="searchFields"
            :fieldWeights="fieldWeights"
            :highlight="true">

            <div slot="renderNoSuggestion">
              Aucun résultat de recherche
            </div>
            <div
                class="suggestion"
                slot="render"
                slot-scope="{
                    error,
                    loading,
                    downshiftProps: { isOpen, highlightedIndex, getItemProps, getItemEvents },
                    data: suggestions,
                }"
              >
              <div v-if="isOpen" class="result-list-container">
                <div v-for="suggestion in (suggestions || []).map(s => ({
                                  label: s.source.trnLsnTitle,
                                  value: s.source.trnLsnTitle,
                                  excerpt: s.source.trnLsnDescription,
                                  path: s.source.trnLsnFrontPath,
                                  titleHighlight: s.source.highlight.trnLsnTitle,
                                  excerptHighlight: s.source.highlight.trnLsnDescription,
                                  cat: s.source.trnCatTitle,
                                  catParent: s.source.trnCatId__trnCatTitle,
                                  key: s._id,
                                  source : s.source
                              }))"
                  v-bind="getItemProps({ item: suggestion })"
                  v-on="getItemEvents({ item: suggestion })"
                  :key="suggestion._id">

                  <suggestion-item :inputValue="inputValue" :suggestion="suggestion" :trainingUrl="trainingUrl" />

                </div>
              </div>
          </div>
        </DataSearch>
  </ReactiveBase>
  <div @click="searchIconClick" class="searchbar-logo-container">
    <span class="material-icons searchbar-logo">
      search
    </span>
  </div>
</div>
</template>


<script>

import SuggestionItem from "./SuggestionItem";

export default {

  name: "SearchBar",
  components :{
    SuggestionItem
  },
  data: function() {
    return {
      inputValue:'',
      searchUsed: false,
      trainingUrl : "https://docs2.simplicite.io",
      searchFields : ['trnLsnTitle', 'trnLsnDescription', 'trnLsnContent'],
      fieldWeights : [3, 2, 1],
      hover: false,
      isSugOpen:false,
    }
  },
  methods: {
    searchIconClick() {
      this.isSugOpen = true
    },
    valueSelected(val, event, item) {
      this.isSugOpen = false
      if(item !== undefined){
          this.$router.push('/lesson' + item.trnLsnFrontPath).catch(err => console.error(err));
      }
    },
    valueChange(val){
      this.isSugOpen = true
      this.inputValue = val
    }
  }
};

</script>

<style scoped lang="sass">
@import "../../assets/sass/variables"
@import "../../assets/sass/mixins"

#SearchBar
  display: flex
  //border: 1px solid #ccc
  min-width: 40rem

.searchbar-logo-container
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  padding: .5rem
  border-right: 1px solid #ccc
  border-top: 1px solid #ccc
  border-bottom: 1px solid #ccc
  background-color: #20477a

  &:hover
    background-color: transparentize(white, 0.9)
    cursor: pointer

.searchbar-logo


.datasearch
  display: flex
  flex-direction: column

.result-list-container
  display: flex
  flex-direction: column
  border-top: 1.5px solid #ccc
  border-left: 1.5px solid #ccc
  border-right: 1.5px solid #ccc
  border-bottom: 1.5px solid #ccc
  background-color: #fafafa
  border-radius: 0 0 8px 8px
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
