<template lang="pug">
div.column.job-types#job-types.tree-lines
  draggable.draggable-container#draggable-container(
      ref="drag-container"
      v-model="iterations"
      :options="options"
      @start="drag=true"
      @end="drag=false"
      @update="getNodesFromDraggable"
    )
    .job-type--box.tree-node--box(v-for="item in iterations" :key="item.id")
      div(v-if="!isRoot(item)" class="job-type tree-node is-clearfix")
        v-base-edit(
          :isEditing="item.id === editedItem.id"
          :value="item.name"
          :childCount="0"
          @gradeInput:action-delete="onDestroyClick(item)"
          @blur="onBlur()"
          @input:action-save="onSaveClick"
          @input:action-edit="onEditClick(item)"
          @expand=""
          :showHandle="showGrabHandle"
        )
    v-base-input(
      :placeholder="$t('agency_structure.job_type_placeholder')",
      @action:save="saveNode"
    )
    

  CErrorValidation

</template>

<script>
import TreeMenu from "./VJobType.vue"

import { mapActions, mapState } from "vuex"
import _ from "lodash"
import CErrorValidation from "../_shared/CErrorValidation.vue"

import draggable from "vuedraggable"
import VBaseEdit from "../_shared/VBaseEdit.vue"
import VBaseInput from "../_shared/VBaseInput.vue"

export default {
  components: {
    TreeMenu,
    CErrorValidation,
    draggable,
    VBaseEdit,
    VBaseInput
  },
  data() {
    return {
      newNode: "",
      iterations: [],
      options: {
        animation: 150,
        handle: ".handle"
      },
      editedItem: {}
    }
  },
  computed: {
    ...mapState("jobTypes", ["jobTypes"]),
    showGrabHandle: function() {
      return this.iterations.length > 1
    }
  },
  mounted() {
    this.runGetter()
  },
  methods: {
    isRoot(item) {
      if (typeof item.parentId === "undefined" || item.parentId === null) {
        return true
      } else {
        return false
      }
    },
    async getNodesFromDraggable(e) {
      let value = this.$refs["drag-container"].value
      const nodeList = value.reduce((acc, node) => {
        acc.push(node)
        return acc
      }, [])
      const levels = nodeList.map((node, index) => {
        let { id, level, name } = node
        return {
          level: index + 1,
          id
        }
      })
      await this.updateLevels({
        job_types: levels
      })
      this.runGetter()
    },
    ...mapActions("jobTypes", [
      "getJobTypesWithChildren",
      "getJobTypes",
      "addChildNode",
      "updateNode",
      "addSiblingNode",
      "destroyNode",
      "clearCache",
      "saveJobType",
      "updateLevels"
    ]),
    onSaveClick: _.debounce(function(value) {
      if (value === "") {
        return
      }
      this.updateNode({
        id: this.editedItem.id,
        name: value.trim()
      })
      this.editedItem = {}
    }, 750),
    onDestroyClick(item) {
      this.destroyNode(item)
    },
    onEditClick(item) {
      this.editedItem = item
    },
    onBlur() {
      this.editedItem = {}
    },
    async runGetter() {
      this.getJobTypesWithChildren().then(() => {
        this.iterations = this.jobTypes.children
        // console.log('iterations ', this.iterations)
      })
    },
    saveNode: _.debounce(function(input) {
      this.saveJobType({
        name: input,
        parentId: 0
      })
    }, 750)
  }
}
</script>

<style lang="stylus" scoped>
#job-types {
  width: 100%;
  padding-left: 17px;
  padding-right: 17px;
}
</style>
