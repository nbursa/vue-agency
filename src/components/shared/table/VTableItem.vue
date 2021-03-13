<template lang="pug">
  div.is-clearfix.table__row(
    :class="{ 'table__row--active' : isSelected(item) || isChecked(item), 'table__row--no-select': selectType === 'none'}",
    @click="toggleSelect"
  )
    div.table__row--checkbox(v-if="hasCheckbox")
      base-checkbox.table__checkbox(
        v-model="checked"
        ref="test"
      ) 
    div.table__row--cell(
      v-for="(attr, index) in attributes"
      :key="index",
      v-show="attr.hideCell ? !hidden.has(attr.hideCell) : true"
      :style="{ flex: attr.width }"
    )
      div(v-if="isComponent(attr)")
        component(
          :is="purgeComponent(attr.component)"
          :options="item"
          :config="attr.config || null"
          )
      div(v-else-if="attr.type && attr.type === 'date'")
        span {{ lodashGet(item, attr.show) | nice-date }}
      div(v-else="!attr.type")
        span
          | {{ lodashGet(item, attr.show) | row-filter }}
</template>

<script>
import VTableItem from './VTableItem.vue'
import BaseButton from '@/components/shared/base-components/BaseButton'
import { mapActions, mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import Vue from 'vue'

import '@/compiled-icons/global'
import '@/compiled-icons/job-schedule'

export default {
  components: {
    BaseButton
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    hasCheckbox: {
      type: Boolean,
      required: true,
      default: true
    },
    selectType: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    namespace: {
      type: String,
      required: true
    },
    hidden: {
      type: Set,
      required: false,
      default: []
    }
  },
  computed: {
    ...mapState({
      state(state) {
        return state[this.namespace]
      },
      selected(state, getters) {
        return getters[this.namespace + '/selected']
      },
      isSelected(state, getters) {
        return getters[this.namespace + '/isSelected']
      },
      isChecked(state, getters) {
        return getters[this.namespace + '/isChecked']
      },
      hasSignOff(state) {
        return (
          state.auth.user.permissions.includes('admin-signOff-job') &&
          this.filterJobStatus
        )
      }
    }),
    attributes: function () {
      if (this.namespace === 'jobManagement/table') {
        return this.columns.filter((a) => {
          return !Object.keys(a).includes('sign')
        })
      }

      return this.columns
    },
    isJobTable: function () {
      return this.namespace === 'jobManagement/table'
    },
    cellNumber: function () {
      return this.columns.length
    },
    checked: {
      get() {
        return this.isChecked(this.item)
      },
      set() {
        if (this.isChecked(this.item)) {
          this.unCheckItem(this.item)
        } else {
          this.checkItem(this.item)
        }
      }
    },
    filterJobStatus: function () {
      if (this.item) {
        return (
          this.namespace === 'jobManagement/table' &&
          (this.item.status.name === 'Sign off pending' ||
            this.item.status.name === 'Admin sign off pending')
        )
      }
      return null
    }
  },
  methods: {
    deselectItem() {
      this.deselectItem(this.item)
    },
    isComponent(attr) {
      return attr.component && attr.component instanceof Object
    },
    purgeComponent(component) {
      return { ...component } //Spread clone component as to remove vuex observables causing mutation errors in state
    },
    ...mapActions({
      selectItem(dispatch, payload) {
        return dispatch(this.namespace + '/selectItem', payload)
      },
      deselectItem(dispatch, payload) {
        return dispatch(this.namespace + '/deselectItem', payload)
      },
      checkItem(dispatch, payload) {
        return dispatch(this.namespace + '/checkItem', payload)
      },
      unCheckItem(dispatch, payload) {
        return dispatch(this.namespace + '/unCheckItem', payload)
      },
      isButton() {
        return this.item.type === 'button' ? true : false
      }
    }),
    ...mapActions('modals', ['closeModal']),
    ...mapActions('modals', ['toggleModal']),
    lodashGet(object, path) {
      const item = get(object, path)
      let validItem = ''
      if (typeof item === 'boolean') {
        validItem = item ? this.$t('global.yes') : this.$t('global.no')
      } else {
        validItem = item
      }
      return validItem === undefined ? '--' : validItem
    },
    toggleCheckbox(e) {
      if (this.isChecked(this.item)) {
        this.unCheckItem(this.item)
      } else {
        this.checkItem(this.item)
      }
    },
    toggleItem(e) {
      if (this.isSelected(this.item)) {
        this.deselectItem(this.item)
      } else {
        this.selectItem(this.item)
      }
    },
    toggleSelect(e) {
      if (this.selectType === 'none') return
      if (this.selectType === 'multi') {
        this.toggleCheckbox(e)
        return
      }
      this.toggleItem(e)
    },
    signOff(e) {
      this.toggleModal(this.item.id)
    }
  }
}
</script>

<style scoped lang="stylus">
.sign-off {
  .btn {
    height: 25px;
    padding: 0 10px;
  }
}
</style>
