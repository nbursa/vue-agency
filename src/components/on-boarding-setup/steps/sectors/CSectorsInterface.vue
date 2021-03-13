<template lang="pug">
  div.column.is-8.is-offset-2.sectors#sectors
    v-sector-item(
      v-if="sectors.length > 0"
      v-for="( sector, index ) in sectors"
      :key="sector.id"
      :sector="sector"
      @action:delete-sector="deleteSector"
      @action:update-sector="updateSector"
      @action:create-sector="createSector"
    )

    v-base-input(
      :placeholder="$t('agency_structure.new_branch')",
      ref="newNodeInput",
      @action:save="createSector"
    )

</template>
<script>
import { mapState, mapActions } from "vuex"
import { SectorItem } from "./VSectorItem.vue"
import VBaseInput from "../_shared/VBaseInput"
import VSectorItem from "./VSectorItem.vue"

export default {
  components: {
    VBaseInput,
    VSectorItem
  },
  data() {
    return {
      newSector: {
        name: ""
      }
    }
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("onboarding/sectors", ["sectors"])
  },
  created() {
    this.getSectors()
  },
  methods: {
    ...mapActions("onboarding/sectors", [
      "getSectors",
      "updateSector",
      "createSector",
      "deleteSector"
    ])
  }
}
</script>

<style lang="stylus" scoped>
#sectors {
  width: 100%;
  max-width: 625px;
  margin: 0 auto;
}
</style>
