<template lang="pug">
  div.exclude-candidates
      exclude-selector(
        :candidates="candidatesList"
        @exclude-selector:exclude="update"
      )
      div.exclude-candidates__list
        excluded-candidate(
          v-for="excludedTemp in client.excludedTemps" 
          :candidate="excludedTemp" 
          @excluded-candidate:remove="remove" 
          :key="excludedTemp.id"
        )

</template>
<script>
import { mapActions, mapGetters, mapState} from "vuex"
import { CandidateSelector } from "@/components/shared/selectors"
import ExcludedCandidate from "./VExcludedCandidate"
import ExcludeSelector from "./VExcludeSelector"


export default {
    components: {
      ExcludedCandidate,
      ExcludeSelector
    },
    props: {
      client: {
        type: Object,
        required: true,
        default() {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters("candidates", ["getCandidatesWithFullName"]),
      candidatesList: function() {
        return this.getCandidatesWithFullName.filter(candidate => {
          return this.client.excludedTemps.filter(temp => {
            return temp.id == candidate.id
          }).length == 0
        })
      }
    },
    created() {
      this.getCandidates({responseType: "all"})
    },
    methods: {
      ...mapActions("candidates", ["getCandidates"]),
      update(payload) {
        let existingCandidates = this.client.excludedTemps.map(temp => { return {id: temp.id} })
        this.$emit("exclude-candidates:update", [...payload, ...existingCandidates])
      },
      remove(payload) {
        let candidates = this.client.excludedTemps.filter(temp => temp.id !== payload).map(tmp => { return  {id: tmp.id} })
        this.$emit("exclude-candidates:update", [...candidates])
      }
    }
}
</script>
<style lang="stylus" scoped>
.exclude-candidates
  padding-left 20px
  padding-right 20px
  max-width: 600px;
  margin: 0 auto;
  &__list {
    padding-top: 25px;  
  }
</style>