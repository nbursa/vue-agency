<template lang="pug">
  div.column.areas#areas
    v-area-item(
      v-if="areas.length > 0"
      v-for="( area, index ) in areas"
      :key="area.id"
      :area="area"
      @action:delete-area="deleteArea"
      @action:update-area="updateArea"
      @action:create-area="createArea"
    )

    v-base-input(
      :placeholder="$t('agency_structure.areas_placeholder')",
      ref="newNodeInput",
      @action:save="createArea"
    )

    CErrorValidation

</template>
<script>
import { mapState, mapActions } from "vuex"
import { AreaItem } from "./VAreaItem.vue"
import VBaseInput from "../_shared/VBaseInput"
import VAreaItem from "./VAreaItem.vue"
import CErrorValidation from "../_shared/CErrorValidation.vue"

export default {
  components: {
    VBaseInput,
    VAreaItem,
    CErrorValidation
  },
  data() {
    return {
      newArea: {
        name: ""
      }
    }
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("onboarding/areas", ["areas"])
  },
  created() {
    this.getAreas()
  },
  methods: {
    ...mapActions("onboarding/areas", [
      "getAreas",
      "updateArea",
      "createArea",
      "deleteArea"
    ])
  }
}
</script>

<style lang="stylus" scoped>
#areas {
  width: 100%;
  max-width: 625px;
  margin: 0 auto;
}
</style>