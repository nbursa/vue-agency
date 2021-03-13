<template lang="pug">
div(style="padding-top:1em;")
  c-dropdown(
    :data="grades"
    :labelOnly="labelOnly"
    @input="onGradeSelect($event, jobType)"
    v-model="selectedGrade.name"
    :placeholder="placeholder"
  )
</template>

<script>
import CDropdown from "@/components/shared/dropdown/CDropdown.vue"
import { mapState } from "vuex"
export default {
  components: {
    CDropdown
  },
  props: {
    grades: {
      type: Array,
      required: true
    },
    jobType: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedGrade: {
        name: null
      },
      labelOnly: false
    }
  },
  computed: {
    ...mapState("jobTypeSelector", ["selectedJobTypes"]),
    placeholder: {
      get() {
        let id = this.jobType.id
        let jobType = this.selectedJobTypes.find(item => item.id === id) || {}
        return jobType.grade ? jobType.grade.name : "Select Grade"
      }
    }
  },
  methods: {
    onGradeSelect(selectedGrade) {
      console.log(selectedGrade)
      this.$emit("grade:select", {
        grade: selectedGrade,
        jobType: this.jobType
      })
    }
  }
}
</script>
