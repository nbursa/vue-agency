<script>
import BaseTypeAhead from './BaseTypeahead'
import { mapActions, mapState, mapGetters } from 'vuex'
import { ASYNC_SEARCH } from '@riophae/vue-treeselect'

export default {
  extends: BaseTypeAhead,
  watch: {
    'selected.id': function (candidateId) {
      if (candidateId) {
        let o = {}
        o.user_id = candidateId
        return this.updateSearch(o)
      }
      this.updateSearch({ user_id: null })
    }
  },
  mounted() {
    if (this.searchParams.user_id) {
      this.findCandidate(this.searchParams.user_id).then((res) => {
        this.selected = {
          id: res.id,
          label: res.firstName + ' ' + res.lastName
        }
      })
    }
  },
  methods: {
    ...mapActions({
      search(dispatch, payload) {
        return dispatch('candidates/searchCandidate', payload)
      },
      findCandidate(dispatch, payload) {
        return dispatch('candidates/findCandidate', payload)
      }
    })
  }
}
</script>
