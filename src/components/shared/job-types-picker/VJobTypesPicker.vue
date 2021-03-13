<template lang="pug">
div
  .sidebar-jobtypes.not-selected
    ul
      li(v-for="(jobType, index) in jobTypes.children")
        .sidebar-jobtypes_tab#sidebar-jobtypes_tab
          input(
            v-if="!jobType.children && !hasGrades"
            type="checkbox"
            @click="onJobTypeSelect(jobType, $event)"
            :checked="isChecked(jobType)"
            class="is-danger"
          )

          a(
            @click.prevent="onJobTypeClick(jobType, $event)"
          ) {{ jobType.name }}

          v-grade(
            v-if="!jobType.children && hasGrades"
            :grades="grades"
            :jobType="jobType"
            @grade:select="onGradeSelect"
          )

          .dot.is-pulled-right(v-if="jobType.children")
        transition(name="slide-fade")
          div(v-if="isOpen(jobType.id)" ref="container")
            v-job-types-picker(
              :jobTypes="jobType"
              :hasGrades="hasGrades"
            )
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import VGrade from "./VGrade"

export default {
  name: "VJobTypesPicker",
  components: {
    VGrade
  },
  props: {
    jobTypes: {
      type: Object,
      required: true
    },
    hasGrades: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      opened: []
    }
  },
  computed: {
    ...mapState("jobTypeSelector", ["selectedJobTypes"]),
    ...mapState("onboarding/grades", ["grades"]),
    ...mapGetters("jobTypeSelector", ["isChecked"])
  },
  created() {},
  methods: {
    ...mapActions("jobTypeSelector", [
      "addSelectedJobType",
      "removeSelectedJobType",
      "updateSelectedJobType"
    ]),
    isOpen(id) {
      if (this.opened.indexOf(id) > -1) {
        return true
      } else {
        return false
      }
    },
    onJobTypeClick(jobType, e) {
      const id = jobType.id
      if (!jobType.children) {
        return false
      }
      let index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, id)
      } else {
        this.opened.push(id)
      }
    },
    onJobTypeSelect(jobType, e) {
      if (e.target.checked) {
        this.addSelectedJobType(jobType)
      } else {
        this.removeSelectedJobType(jobType)
      }
    },
    beforeEnter(el) {
      el.style.maxHeight = 0
      el.style.overflow = "hidden"
    },
    onGradeSelect(options) {
      const o = {}
      o.id = options.jobType.id
      o.gradeId = options.grade.id
      o.name = options.jobType.name

      let x = this.selectedJobTypes.find(item => {
        return item.id === o.id
      })

      if (x) {
        this.updateSelectedJobType(o)
      } else {
        this.addSelectedJobType(o)
      }
    },
    enter(el, done) {
      setTimeout(() => {
        let l = this.jobTypes.children.length || 1
        el.style.maxHeight = l * 100 + 150 + "px"
        el.style.overflow = "none"
        done()
      })
    },
    leave(el, done) {
      setTimeout(() => {
        el.style.maxHeight = 0
        el.style.overflow = "hidden"
      }, 250)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';

.pull-right {
  margin-left: 20px;
}

.closed {
  max-height: 0px;
  overflow: hidden;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #856ff9;
  border-radius: 100%;
  margin: 0.7em 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

