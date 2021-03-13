<template lang="pug">
.all
  draggable.draggable-container#draggable-container(
    ref="drag-container"
    v-model="iterations"
    :options="options"
    @start="drag=true"
    @end="drag=false"
    @update="getGradesFromDraggable"
    )
    v-grade(
      v-for="(grade, index) in iterations"
      :key="index"
      :grade="grade"
      :showHandle="showGrabHandle"
      @grade-input:enter="update"
      @grade-input:delete="remove"
    )
    CErrorValidation
    div.grade
      v-base-input(
        :placeholder="$t('agency_structure.grades_placeholder')",
        ref="newNodeInput",
        @action:save="create"
      )
</template>
<script>
import draggable from "vuedraggable"
import VGrade from "./VGrade"
import VBaseInput from "../_shared/VBaseInput"
import CErrorValidation from "../_shared/CErrorValidation.vue"
import { mapState, mapActions } from "vuex"

function getNewGradeModel() {
  return {
    name: "",
    level: 0,
    id: 0
  }
}
export default {
  components: { draggable, VGrade, VBaseInput, CErrorValidation },
  containerClasses: ["column", "is-10", "is-offset-1"],
  data() {
    return {
      newGradeModel: getNewGradeModel(),
      iterations: [],
      options: {
        animation: 150,
        handle: ".handle"
      }
    }
  },
  computed: {
    ...mapState("onboarding/grades", ["grades"]),
    /*
    * This is what gets sent, after levels are being updated by index
    */
    showGrabHandle: function() {
      return this.iterations.length > 1
    }
  },
  mounted() {
    this.$options.containerClasses.map(cls => {
      this.$refs["drag-container"].$el.classList.add(cls)
    })
  },
  created() {
    this.getGrades().then(() => {
      this.iterations = this.grades
    })
  },
  methods: {
    ...mapActions("onboarding/grades", [
      "getGrades",
      "createGrade",
      "updateGrade",
      "deleteGrade",
      "updateLevels"
    ]),

    updateNewGradeModel(e, id) {
      this.$set(this.newGradeModel, "name", e)
    },

    async create(name) {
      this.newGradeModel.name = name
      this.newGradeModel.level = this.grades[this.grades.length - 1].level + 1
      const data = await this.createGrade(this.newGradeModel)
      this.runGetter()
      this.newGradeModel = getNewGradeModel()
    },

    async update(e, id) {
      /*
      * Dispatch action to save/edit v-grade input value
      */
      let value = e.target ? e.target.value : e
      await this.updateGrade({
        value,
        id
      })
      this.runGetter()
    },
    /*
     * Dispatch action to delete v-grade from collection
     */
    async remove(id) {
      await this.deleteGrade({ id })
      this.runGetter()
    },

    async getGradesFromDraggable(e) {
      let value = this.$refs["drag-container"].value
      const gradeList = value.reduce((acc, grade) => {
        acc.push(grade)
        return acc
      }, [])
      const levels = gradeList.map((grade, index) => {
        let { id, level, name } = grade
        return {
          level: index + 1,
          id,
          name
        }
      })
      await this.updateLevels({
        grades: levels
      })
      this.runGetter()
    },

    async runGetter() {
      await this.getGrades()
      this.iterations = this.grades
    }
  }
}
</script>
<style lang="stylus">


.draggable-container {
  width: 100%;
  max-width: 625px;
  margin: 0 auto !important;

  .sortable-ghost {
    background: $lightGray;
    min-height: 45px;

    .field {
      display: none;
    }
  }

  .control {
    .grade-save-cancel {
      input {
        height: 60px;
        font-size: 18px;

        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
