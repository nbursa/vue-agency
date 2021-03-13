<template lang="pug">
.job-reminders
  .custom-checkbox
    input(id="jobReminders" type="checkbox" v-model="jobRemindersToggle")
    label(for="jobReminders") {{ $t("agency_structure.reminders_toggle_label") }}
  transition(name="dropdown")
    .reminder(v-if="jobRemindersToggle")
      base-tree-select(
        v-model="jobReminders"
        :items="jobReminderOptions"
        optionName="jobReminders"
        valueFormat="object"
        :multiple="true",
        :isClearable="false"
        :openDirection="'above'"
      )
        div(slot="label") {{ $t("agency_structure.reminders_input_label") }}
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      jobReminderOptions: [
        { id: 0, name: '48hrs', value: 2880 },
        { id: 1, name: '24hrs', value: 1440 },
        { id: 2, name: '12hrs', value: 720 },
        { id: 3, name: '2hrs', value: 120 },
        { id: 4, name: '1hrs', value: 60 }
      ]
    }
  },
  computed: {
    jobRemindersToggle: {
      get() {
        return this.options.jobReminders === null ||
          (Array.isArray(this.options.jobReminders) &&
            !this.options.jobReminders.length)
          ? false
          : true
      },
      set(val) {
        if (val === false) {
          return (this.jobReminders = null)
        }
        let selected = []
        selected.push(this.jobReminderOptions[0])
        this.jobReminders = selected
      }
    },
    jobReminders: {
      get() {
        if (
          this.options.jobReminders === null ||
          (Array.isArray(this.options.jobReminders) &&
            !this.options.jobReminders.length)
        ) {
          return null
        }
        let reminders = this.options.jobReminders
        if (reminders.value) {
          return reminders
        }
        let selectedOption = reminders.map((val) => {
          return this.jobReminderOptions.find((option) => {
            return option.value === val
          })
        })
        return selectedOption
      },
      set(val) {
        let value
        if (val === null || val === []) {
          return this.$emit('job-reminder:update', null)
        }
        if (val.hasOwnProperty('jobReminders')) {
          if (!val.jobReminders.length) {
            return this.$emit('job-reminder:update', null)
          }
          value = val.jobReminders.map((item) => {
            return item.value
          })
          return this.$emit('job-reminder:update', value)
        }
        value = val.map((item) => {
          return item.value
        })
        return this.$emit('job-reminder:update', value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/custom-checkbox';
@import '~@/assets/styles/global/label-input';
@import '~@/assets/styles/global/dropdown-animation';

.job-reminders
  border 1px solid #DFE6EB
  padding 10px 20px
  border-radius 3px
  .custom-checkbox
    display flex
    justify-content space-between
    label
      font-size 18px
      line-height 24px
</style>
