import { mapActions, mapState } from "vuex"

export const searchMixins = {
  props: {
    namespace: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    ...mapState({
      searchParams(state, getters) {
        return state[this.namespace].search.params
      }
    })
  },
  methods: {
    ...mapActions({
      updateSearch(dispatch, payload) {
        if (!this.namespace) {
          throw new Error("Namespace not set")
        }
        return dispatch(this.namespace + "/search/updateSearchParams", payload)
      }
    })
  }
}
