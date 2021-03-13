<template lang="pug">
div.job-type.tree-node--box
  span.job-type.tree-node--child-counter(v-if="attribute.values.length !== 0") {{attribute.values.length}}
  v-base-edit(
    :value="attribute.name"
    :isEditing="isEditing"
    @blur="onBlur()"
    @input:action-save="onSaveClick"
    @input:action-edit="onEditClick"
    @gradeInput:action-delete="onDestroyClick"
    @expand="showChildren"
    v-tooltip.top-center="attributeLength === 0 ? $t('tooltips.settings.attributes') : ''"
  )
  transition(
    v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:before-leave="beforeLeave"
      v-on:enter="enter"
      v-on:leave="leave"
  )
    .pull-right.tree-lines--children(v-if="isOpen" ref="container")
      v-attribute-value.tree-node(
        v-for="value in attribute.values"
        :key="value.id"
        :attributeValue="value"
        @action:delete-attribute-value="onValueDelete"
        @action:update-attribute-value="onValueUpdate"
      )
      v-base-input.tree-input(
        :placeholder="$t('agency_structure.add_new_attr')",
        @action:save="saveChild"
        :key ="attributeLength"
      )
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import VBaseEdit from '../_shared/VBaseEdit.vue'
import VAttributeValue from './VAttributeValue.vue'
import VBaseInput from '../_shared/VBaseInput'

export default {
  components: {
    VBaseEdit,
    VBaseInput,
    VAttributeValue
  },
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isOpen: false
    }
  },
  computed: {
    attributeLength() {
      return this.attribute.values ? this.attribute.values.length : 0
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.maxHeight = 0
      el.style.overflow = 'hidden'
    },
    enter(el, done) {
      setTimeout(() => {
        let l = this.attributeLength || 1
        el.style.maxHeight = l * 100 + 150 + 'px'
        el.style.overflow = 'none'
        done()
      })
    },
    beforeLeave(el, done) {
      setTimeout(() => {
        el.style.maxHeight = 0
        el.style.overflow = 'hidden'
      }, 250)
    },
    leave(el, done) {
      setTimeout(() => {
        el.style['margin-top'] = 0
      }, 700)
    },
    onDestroyClick() {
      this.$emit('action:delete-attribute', this.attribute.id)
    },
    onBlur() {
      this.isEditing = false
    },
    onEditClick() {
      this.isEditing = true
    },
    showChildren() {
      this.isOpen = this.isOpen ? false : true
    },
    onSaveClick(value) {
      this.$emit('action:update-attribute', {
        id: this.attribute.id,
        name: value
      })
      this.isEditing = false
    },
    onValueDelete(options) {
      this.$emit('action:delete-attribute-value', options)
    },
    onValueUpdate(options) {
      this.$emit('action:update-attribute-value', options)
    },
    saveChild(attributeValue) {
      // console.log('IS IT HERE', attributeValue)
      this.$refs.container.style.maxHeight =
        (this.attributeLength + 1) * 100 + 150 + 'px'
      this.$emit('action:create-attribute-value', {
        id: this.attribute.id,
        value: attributeValue
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.job-type {
  margin-top: 0;
  margin-bottom: 1em;
  position: relative;

  .tree-node {
    &--child-counter {
      position: absolute;
      left: -9px;
      top: 20px;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-right: 10px;
      border-radius: 50px;
      background-color: $primary;
      font-size: 0.75rem;
      color: white;
      width: 20px;
      height: 20px;
      font-weight: bold;
    }
  }
}

.pull-right {
  padding-left: 30px;
  transition: max-height 0.5s;
}
</style>
