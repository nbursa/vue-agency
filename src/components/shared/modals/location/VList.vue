<template lang="pug">
  .list
    .list__head
      .panel-head
        .panel-head__field.field--id #
        .panel-head__field.field--name Candidate
        .panel-head__field.field--jobstart Job start
        .panel-head__field.field--response Accepted
        .panel-head__field.field--distance Distance
    .overflow    
      .list__content(v-if="location")
        v-list-item(
          :location="location"
          @location:show="showLocation"
        )
</template>

<script>
import VListItem from './VListItem'
export default {
  props:['location'],
  components: {
    VListItem
  },
  methods: {
    showLocation(location) {
      this.$emit('show:location', location)
    }
  }
  
}
</script>


<style lang="stylus" scoped>
.list {
    .overflow {
      overflow-y: auto;
      height:410px;
    }
  // flex:1;
    &__head{
      border-bottom:1px solid #ddd;
      color:#989DA2;
      font-weight:700;
      .panel-head {
        display:flex;
        padding:0.2em 0.5em;
        &__field {
          flex:auto;
          font-size:12px;
          height:30px;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .field--id {
          flex:1;
        }
        .field--name {
          flex:2;
        }
        .field--jobstart {
          flex:2;
        }
        .field--response {
          flex:2;
        }
        .field--distance {
          flex:2;
        }
      }
    }
  }

</style>


