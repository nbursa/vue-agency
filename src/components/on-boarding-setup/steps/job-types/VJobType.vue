<template lang="pug">

.job-type--box.tree-node--box
  div(v-if="!isRoot()" class="job-type tree-node is-clearfix")
    v-base-edit(
      :isEditing="isEditing"
      :value="node.name"
      :childCount="0"
      @gradeInput:action-delete="onDestroyClick"
      @blur="onBlur()"
      @input:action-save="onSaveClick"
      @input:action-edit="onEditClick"
      @expand=""
    )
  div
    transition(
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:before-leave="beforeLeave"
      v-on:enter="enter"
      v-on:leave="leave"
    )
      div(v-if="isOpen || isRoot()"  :class="{ 'pull-right tree-lines--children': !isRoot() }")
        tree-menu(
          v-if="hasChildren()",
          v-for="(node, index) in node.children",
          :node="node"
          :key="node.id",
          :isLast="isLastNode(index)"
        )

        v-base-input.tree-input(
          :placeholder="`${$t('agency_structure.job_type_placeholder')} ${node.name === 'jobTypes' ? '' : '(' + node.name + ')'}`"
          @action:save="saveNode"
        )

</template>

<style lang="stylus" scoped>

.list-enter-active, .list-leave-active {
  transition: all 0.4s;
}

.list-enter, .list-leave-to {
  opacity: 0;
}

.pull-right {
  padding-left: 30px;
  transition: max-height 0.5s;

  .job-type:first-child {
    margin-top: 0;
  }
}

.job-type--box {
  //margin: 1em 0;
  .control:hover {
    cursor default
  }
}
</style>

<script>
import { mapActions, mapState } from "vuex"
import _ from "lodash"
import Vue from "vue"
import VBaseEdit from "../_shared/VBaseEdit.vue"
import VBaseInput from "../_shared/VBaseInput.vue"

export default {
  name: "TreeMenu",
  components: {
    VBaseInput,
    VBaseEdit
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    isLast: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newNode: "",
      isOpen: false,
      isEditing: false
    }
  },
  computed: {
    ...mapState("jobTypes", ["jobTypes", "fetching"]),
    childCounter: function() {
      return this.node.children === undefined ? this.node.childrenCount : this.node.children.length
    }
  },
  methods: {
    ...mapActions("jobTypes", [
      "getJobTypes",
      "addChildNode",
      "updateNode",
      "addSiblingNode",
      "destroyNode",
      "clearCache",
      "saveJobType"
    ]),
    beforeEnter(el) {
      el.style.maxHeight = 0
      el.style.overflow = "hidden"
      el.style["margin-top"] = 0

    },
    enter(el, done) {
      setTimeout(() => {
        if (this.node.children) {
          el.style.maxHeight = 2000 + "px"
          el.style.overflow = "none"
          el.style["margin-top"] = 1 + "em"
          done()
        }
      }, 250)
    },
    beforeLeave(el, done) {
      setTimeout(() => {
        el.style.maxHeight = 0
        el.style.overflow = "hidden"
      }, 250)

    },
    leave(el, done) {
      setTimeout(() => {
        el.style["margin-top"] = 0
      },750)
    },
    isFirstLevel() {
      return this.node.parentId === 0 ? true : false
    },
    showChildren(nodeId) {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.getJobTypes(nodeId).then(() => {
          this.isOpen = true
        })
      }
    },
    isLastNode(index) {
      if (index + 1 == this.node.children.length) {
        return true
      } else {
        return false
      }
    },
    isRoot() {
      if (
        typeof this.node.parentId === "undefined" ||
        this.node.parentId === null
      ) {
        return true
      } else {
        return false
      }
    },
    saveNode: _.debounce(function(input) {
      this.saveJobType({
        name: input,
        parentId: this.node.id
      })
    }, 700),
    hasChildren() {
      if (this.node.children.length > 0) {
        return true
      } else {
        return false
      }
    },
    onEditClick() {
      this.isEditing = true
    },
    onSaveClick: _.debounce(function(value) {
      if (value === "") {
        return
      }
      this.updateNode({
        id: this.node.id,
        name: value.trim()
      })
      this.isEditing = false
    }, 750),
    onBlur() {
      this.isEditing = false
    },
    onDestroyClick() {
      this.destroyNode(this.node)
    }
  }
}
</script>
