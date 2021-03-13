<template lang="pug">
  div 
    .sidebar-form
      div
        base-tree-select(
          :key="1"
          :items="candidates"
          optionName="users"
          :disableBranchNodes="true"
          @input="onFieldSelect"
          :multiple="true"
          :normalizer="candidateNormalizer"
          valueFormat="object"
          ref="selector"
        )
          div(slot="label") {{$t("reporting.filter_6")}}
      base-button(@click="excludeCandidates" customClass="is-fullwidth" :disabled="disabled") {{$t("client_locations_sidebar.exclude")}}
    

</template>
<script>
export default {
  props: {
    candidates: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
      return {
        excludeList: []
      }
  },
  computed: {
    disabled() {
      return this.excludeList.users ? this.excludeList.users.length === 0 : true
    }
  },
  methods: {
    candidateNormalizer: function(item) {
      return {
        id: item.id,
        label: item.fullName
      }
    },
    onFieldSelect(payload) {
      this.excludeList = payload
    },
    excludeCandidates() {
      let candidateIdList = this.excludeList.users.map(user => { return {id: user.id} })
      this.$emit("exclude-selector:exclude", candidateIdList)
      this.$refs.selector.$children[0].clear()
    }
  },
 
}
</script>
<style lang="stylus" scoped></style>