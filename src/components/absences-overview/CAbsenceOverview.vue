<template lang="pug">
  div
    router-view
</template>

<script>
//ABSENCE ROUTES - TO BE REMOVED

import CTableFilters from "@/components/shared/search-filters/CTableFilters.vue"
import searchOptions from "./search.options.js"

export default {
  components: {
    CTableFilters
  },
   data() {
    return {
      tableFilterOptions: searchOptions,
      activeView: "absences",
      namespace: "absences"
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
