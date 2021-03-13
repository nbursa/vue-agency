
import { debounce } from "lodash"
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      metaData(state) {
        return state[this.namespace].meta
      }
    })
  },
  mounted() {
    this.vBarHookScroll()
  },
  methods: {
    vBarHookScroll() {
      const vm = this
      const debouncedCallback = debounce(function () {
        // console.log("META CHECK", vm.metaData)
        let { totalPages, currentPage } = vm.metaData.pagination || { totalPages: 1, currentPage: 1 }


        // console.log('WN STATE', currentPage, totalPages)
        if (currentPage < totalPages) {
          vm.vBarScrollCallback()
        }
      }, 150)
      if(vm.metaData && vm.metaData.pagination) {
        debouncedCallback()
      } else {
        return 
      }
    }
  }
}