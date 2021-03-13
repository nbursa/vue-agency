import { mapActions, mapState, mapGetters } from "vuex"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { app } from "../main"

export const jtMixin = {
  computed: {
    ...mapState("jobTypeSelector", ["selectedJobTypes"])
  },
  watch: {
    jobTypes: function() {
      this.setSelectedJobTypes(this.jobTypes)
    },
    getErrors: function(errors) {
      if (Object.keys(errors).length !== 0) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: app.$t("global.toast_error_generic")
        })
        this.$notify(e)
      }
    },
    itemSaved: function(value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: "foo",
          text: this.successMessage
        })
        this.$notify(e)
        this.$emit("sidebar:navigate", "cancel")
      }
    },
    itemDeleted: function(value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: "foo",
          text: this.deleteMessage || "Item deleted!"
        })
        this.$notify(e)
        this.$emit("sidebar:navigate", "cancel")
      }
    }
  },
  methods: {
    ...mapActions("jobTypeSelector", [
      "resetSelectedJobType",
      "setSelectedJobTypes"
    ]),
    onCancel() {
      this.$emit("sidebar:navigate", "cancel")
    },
    onJobTypeClick() {
      this.showJobPicker = true
    },
    onJobTypeCancel(jobType) {
      this.removeChildItem(jobType)
    },
    onAddJobTypeSave() {
      this.setChildItems(this.selectedJobTypes)
      console.log(this.selectedJobTypes)
      this.showJobPicker = false
    },
    onAddJobTypeCancel() {
      this.setSelectedJobTypes(this.jobTypes)
      this.showJobPicker = false
    },
    onAddClick() {
      this.$emit("sidebar:navigate", "create")
    }
  }
}
