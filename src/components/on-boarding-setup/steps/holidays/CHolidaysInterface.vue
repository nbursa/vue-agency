<template lang="pug">
  div.column.holidays#holidays
    v-holiday-item(
      v-if="holidays.length > 0"
      v-for="( holiday, index ) in holidays"
      :key="holiday.id"
      :holiday="holiday"
      @action:delete-holiday="deleteHoliday"
      @action:update-holiday="updateHoliday"
      @action:create-holiday="createHoliday"
    )

    v-holiday-input.holiday(
      :value="newHoliday.name"
      :date="newHoliday.date"
      :isEditing="true"
      :hideControls="true"
      :placeholder="$t('agency_structure.holidays_placeholder')",
      ref="newNodeInput",
      @action:save="createHoliday"
    )
    button.button.holidays__submit-button(@click="submitHoliday") {{$t("agency_structure.submit_holiday")}}
    CErrorValidation

</template>
<script>
import { mapState, mapActions } from "vuex"
import VHolidayInput from "./VHolidayInput.vue"
import VHolidayItem from "./VHolidayItem.vue"
import CErrorValidation from "../_shared/CErrorValidation.vue"
import DateTimeUtils from "@/utils/dateUtils.js"


export default {
  components: {
    VHolidayInput,
    VHolidayItem,
    CErrorValidation
  },
  data() {
    return {
      newHoliday: {
        name: "",
        date: null
      }
    }
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("onboarding/holidays", ["holidays"])
  },
  created() {
    this.getAllHolidays()
  },
  methods: {
    ...mapActions("onboarding/holidays", [
      "getAllHolidays",
      "updateHoliday",
      "createHoliday",
      "deleteHoliday"
    ]),
    submitHoliday() {
      this.createHoliday({date: DateTimeUtils.getDateTimeFromClient(this.$refs.newNodeInput.dateInternal), name: this.$refs.newNodeInput.valueInternal})
      this.$refs.newNodeInput.onCancel()
    }
  }
}
</script>

<style lang="stylus" scoped>
#holidays {
  width: 100%;
  max-width: 625px;
  margin: 0 auto;
  .holiday {
    margin: 1em 0;
    position: relative;
  }
  .holidays {
    &__submit-button {
      min-width: 100px;
      min-height: 30px;
      margin-top: 0.5em;
      margin-right: 1em;
      float: right;
      flex: 1;
      margin: 0 0 0 auto;
      color $primary;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 3px;
      border: 1px solid $primary;
      &:hover {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
      }

    }
  }
}
</style>