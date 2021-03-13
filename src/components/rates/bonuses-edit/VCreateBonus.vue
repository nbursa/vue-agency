<template lang="pug">
div
  header
    .sidebar-control(
      style="height: 48px"
    )
      // base-button {{$t("rates.sidebar_button_add_bonus")}}
  .sidebar-overflow
    bonus-form(
      :bonus="formItem"
      :updateFn="updateItemField"
      :errors="getErrors"
      @form:save="saveForm"
    )
  .sidebar-footer.sidebar-footer-flex
    base-button(@click="reset" customClass="is-small is-cancel")
      span {{ $t('rates.sidebar_reset') }}
    base-button(@click="saveForm" customClass="is-small")
      span {{ $t('rates.sidebar_create') }}
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
    ...mapState("bonuses/create", ["formItem", "itemSaved", "isFetching"]),
    ...mapGetters("bonuses/create", ["getErrors"]),
  },
   beforeDestroy() {
    this.clearErrors()
  },
  created() {
    this.setFormItem(Object.assign({}, new Bonus()))
  },
  methods: {
    ...mapActions("bonuses", ["createBonus"]),
    ...mapActions("bonuses/create", [
      "updateItemField",
      "clearErrors",
      "setFormItem"
    ]),
    reset() {
      this.setFormItem(Object.assign({}, new Bonus()))
    },
    saveForm() {
      this.createBonus(this.formItem)
      this.clearErrors()
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar'

</style>
