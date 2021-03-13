<template lang="pug">
div
  header
    .sidebar-control
      base-button(@click="onAddClick") {{$t("rates.sidebar_button_add_bonus")}}
  .sidebar-overflow
    bonus-form(
      :bonus="formItem"
      :updateFn="updateItemField"
      :errors="getErrors"
      @form:save="saveForm"
    )
  .sidebar-footer
    .bonus-controls
      base-button(@click="remove" customClass="is-small is-cancel")
        span {{ $t('global.delete') }}
      base-button(@click="reset" customClass="is-small is-cancel")
        span {{ $t('rates.sidebar_reset') }}
      base-button(@click="saveForm" customClass="is-small")
        span {{ $t('rates.sidebar_update') }}
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex"
import BonusForm from "./VBonusForm"
import Bonus from "@/models/Bonus"


export default {
  components: {
    BonusForm
  },
  computed: {
    ...mapState("bonuses/table", ["selected"]),
    ...mapState("bonuses/edit", ["formItem", "itemSaved", "isFetching"]),
    ...mapGetters("bonuses/edit", ["getErrors", "getUploadStatus"]),
  },
  watch: {
    selected: function(item) {
      if (item && item.length > 0 && item[0].id) {
        this.setFormItem(Object.assign({}, item[0]))
      }
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  created() {
    this.setFormItem(Object.assign({}, this.selected[0]))
  },
  methods: {
    ...mapActions("bonuses", ["updateBonus", "removeBonus",]),
    ...mapActions("bonuses/edit", [
      "updateItemField",
      "clearErrors",
      "setFormItem"
    ]),
    ...mapActions("bonuses/table", ["clearSelectedItems"]),
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
      this.clearSelectedItems()
    },
    reset() {
      this.setFormItem(Object.assign({}, this.selected[0]))
    },
    remove() {
      this.removeBonus(this.formItem.id)
    },
    saveForm() {
      this.updateBonus(this.formItem)
      this.clearErrors()
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar'
.bonus-controls {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  >* {
    margin-top: 5px;
    margin-bottom: 5px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 5px;
    margin-right: 5px;
    max-width: 100% !important;
    flex: 1;
  }
}
</style>
