<template lang="html">

  <div class="result-item">
    <!-- THIS WORKS = <div v-if="highlightExists" class="result-title" v-html="highlitedTitle"></div>
    <div v-else class="result-title">{{suggestion.label}}</div>-->
    <div class="result-header">
      <div class="result-title">
        <div v-if="highlightedTitle" v-html="highlightedTitle"></div>
        <div v-else>{{suggestion.label}}</div>
      </div>
      <div class="result-catgory">
        Tutoriel > {{suggestion.cat}}
      </div>
    </div>
    <!--<div class="result-url">
      <div>
        <a :href="trainingUrl+suggestion.path" target="_blank"><img :src="'http://www.google.com/s2/favicons?domain='+trainingUrl+suggestion.path"/> {{trainingUrl}}{{suggestion.path}}</a>
      </div>
    </div-->
    <div class="result-body">
      <div class="result-icon material-icons" v-html="materialIconCode"></div>
      <div class="result-text">
        <div v-if="highlightedExcerpt" v-html="highlightedExcerpt"></div>
        <div v-else>{{suggestion.excerpt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "suggestionitem",
  props:{
    suggestion: Object,
    trainingUrl: String,
    inputValue: {
      type: String,
      default: "",
    },
  },
  methods:{
    getHighlightedSuggestion: function(input, highlight){
      var highlighted = highlight
      var regEx = new RegExp(input, "ig");
      highlighted = highlighted.replace(/<mark[^>]*>/g, "").replace(/<\/mark>/g,"").replace(regEx, function(match){
        return "<span style=\"background-color: yellow; font-weight: bold\">"+match+"</span>"
      });
      return highlighted;
    }
  },
  computed:{
    materialIconCode: function(){
      var materialCode = '';
      switch(this.suggestion.cat){
        case "Configuration":
          materialCode = "design_services"
          break;
        case "Development":
          materialCode = "code"
          break;
        case "Apis":
          materialCode = "api"
          break;
        default:
          materialCode = "settings"
      }
      return materialCode
    },
    highlightedTitle: function(){
      if(this.suggestion.titleHighlight && Array.isArray(this.suggestion.titleHighlight) && this.suggestion.titleHighlight.length > 0){
          /*
          //UNDERKILL ?
          var highlighted = this.suggestion.titleHighlight[0]
          highlighted = highlighted.replace(/<mark[^>]*>/g, "<span style=\"background-color: yellow;\">").replace(/<\/mark>/g,'</span>');
          return highlighted*/

          //OVERKILL ?
          return this.getHighlightedSuggestion(this.inputValue, this.suggestion.titleHighlight[0])
      }
      return null
    },
    highlightedExcerpt: function(){
        if(this.suggestion.excerptHighlight && Array.isArray(this.suggestion.excerptHighlight) && this.suggestion.excerptHighlight.length > 0){
          /*
          //UNDERKILL ?
          var highlighted = this.suggestion.excerptHighlight[0]
          highlighted = highlighted.replace(/<mark[^>]*>/g, "<span style=\"background-color: yellow;\">").replace(/<\/mark>/g,'</span>');*/

          //OVERKILL ?
          return this.getHighlightedSuggestion(this.inputValue, this.suggestion.excerptHighlight[0])
        }
        return null
    }
  }
}

</script>

<style lang="sass" scoped>

.result-header
  display: flex
  justify-content: space-between
  padding-bottom: .5rem

.result-catgory
  padding: 0.3rem
  color: white
  background-color: grey
  border-radius: .3rem
  font-size: .8rem
  font-weight: lighter
  min-width: 12em
  text-align: center
  align-content: center


.result-title
  font-weight: bold
  font-size: 1.2rem

.highlightedPart
  background-color: green

.result-url
  padding: .5rem 0 .5rem 0


.result-body
  display: flex
  height: 100%
  font-size: 1rem
  flex-grow: 1

.result-text
  border-left: .10rem solid #ccc
  padding-left: .5rem
  flex-grow: 1
  line-height: 1.3rem

.result-icon
  align-self: center
  margin: 1rem
  border-radius: 3px
  padding: .5rem
  background: linear-gradient(to bottom, #ccc 18%, #ffefef)

.result-item
  //border:solid black;
  display: flex
  flex-direction: column
  width: 100%
  padding: .5rem
  height: 100%
  min-height: 10em

  &:hover
    background-color: #EDF3FA
    border-radius: .3rem
    cursor: pointer


</style>
