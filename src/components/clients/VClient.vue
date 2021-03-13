<template lang="pug">

.job-type--box
  div(v-if="!isRoot" class="job-type is-clearfix")
    v-base-edit(
      :class="{'job-type--active': isSelected}"
      :isEditing="isEditing"
      :sendTimeSheet="true"
      :value="node.name"
      :childCount="childCounter"
      @gradeInput:action-delete="onDestroyClick"
      @blur=""
      @input:action-save="onSaveClick"
      @input:action-edit="onEditClick(node)"
      @input:action-send-timesheet="onSendTimeSheet(node.id)"
      @expand="showChildren(node.id)"
    )
  div
    transition(
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    )
      div(v-if="isOpen || isRoot"  :class="{ 'pull-right': !isRoot }")
        tree-menu(
          v-if="hasChildren()",
          v-for="(node, index) in node.children",
          :node="node"
          :key="node.id",
          :isLast="isLastNode(index)"
        )
        button(
          @click="onAddClientClick(node)"
          class="btn-add-new-client"
            :class="{'is-active' : addBtnActiveClass}"
            ref="buttonClick"
        ) {{$t("client_locations.button_add")}}

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import _ from 'lodash'
import VBaseEdit from '@/components/on-boarding-setup/steps/_shared/VBaseEdit.vue'
import VBaseInput from '@/components/on-boarding-setup/steps/_shared/VBaseInput.vue'

export default {
  name: 'TreeMenu',
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
      newNode: '',
      isOpen: false,
      isEditing: false,
      btnActiveClass: false
    }
  },
  computed: {
    ...mapState('clients', ['clients', 'fetching', 'selected']),
    isSelected: function () {
      return this.selected.id === this.node.id
    },
    addBtnActiveClass() {
      return this.node.id == this.selected ? true : false
    },
    isRoot() {
      return typeof this.node.parentId === 'undefined' ? true : false
    },
    childCounter: function () {
      return this.node.children === undefined
        ? this.node.childrenCount
        : this.node.children.length
    }
  },
  methods: {
    ...mapActions('clients', [
      'setSelected',
      'getClients',
      'getClient',
      'addChildNode',
      'updateNode',
      'addSiblingNode',
      'destroyNode',
      'clearCache',
      'saveClient',
      'sendTimesheet'
    ]),
    ...mapActions('clients/sidebar', ['setSidebarComponent']),
    beforeEnter(el) {
      el.style.maxHeight = 0
      el.style.overflow = 'hidden'
    },
    enter(el, done) {
      setTimeout(() => {
        if (this.node.children) {
          el.style.maxHeight = 100 + '%'
          el.style.overflow = 'none'
          done()
        }
      }, 250)
    },
    leave(el, done) {
      setTimeout(() => {
        el.style.maxHeight = 0
        el.style.overflow = 'hidden'
      }, 250)
    },
    isFirstLevel() {
      return this.node.parentId === 0 ? true : false
    },
    showChildren(nodeId) {
      this.setSelected({ id: null })
      this.setSidebarComponent('default')
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.getClients(nodeId).then(() => {
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
    saveNode: _.debounce(function (input) {
      this.saveClient({
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
    onSaveClick: _.debounce(function (value) {
      if (value === '') {
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
    },
    onEditClick(node) {
      this.setSelected(node)
      this.getClient(node.id)
      this.setSidebarComponent('edit')
    },
    onAddClientClick(node) {
      this.setSelected(node.id)
      this.setSidebarComponent('create')
    },
    onSendTimeSheet(id) {
      this.sendTimesheet(id)
    }
  }
}
</script>

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

.job-type {
  &--box {
    margin: 1em 0 0;
  }

  &--active {
    box-shadow: 0 0 0 1px #2898ff;
    margin: 2px;
    border-radius: 3px !important;
  }
}

.btn-add-new-client {
  cursor: pointer;
  outline: none;
  opacity: 0.7;
  padding-left: 1em;
  margin: 1em 0 0;
  border: 1px solid #DFE6EB;
  width: 100%;
  display: flex;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  align-items: center;
  background-color: #ffffff;
  height: 60px;
  color: #363636;
  font-size: 1.1em;
  &:hover {
    background-color: #f4f7f9;
  }
  &:focus {
    box-shadow: inset 0px 0px 0px 1px rgba(77, 144, 254, 1);
  }
}
</style>
