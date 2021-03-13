<template lang="pug">
div 
  header
    .sidebar-control
      v-new-pool-link
  transition(name="slide-fade" mode="out-in")
    .sidebar-overflow
      v-pool-form(
        action="edit"
        :pool="formItem"
        :updateFn="updateItemField"
        :errorsFromBack="getErrors"
        @form:save="savePool"
        @form:cancel="onCancel"
        @form:add-candidate="addPoolCandidate"
        @form:remove-candidate="removePoolCandidate"
      )
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VPoolForm from './VPoolForm'
import VNewPoolLink from './VNewPoolLink'
import Pool from '@/models/Pool'

export default {
  components: {
    VPoolForm,
    VNewPoolLink
  },
  computed: {
    ...mapState('candidatePools/table', ['selected']),
    ...mapState('candidatePools/edit', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapGetters('candidatePools/edit', ['getErrors'])
  },
  watch: {
    selected: function (item) {
      if (item && item.length > 0 && item[0].id) {
        let { id: poolId } = item[0]
        this.getCandidatePool(poolId)
      }
    }
  },
  created() {
    const poolItem = Object.assign({}, new Pool())
    this.setFormItem(poolItem)
    if (this.selected[0]) {
      let { id: poolId } = this.selected[0]
      this.getCandidatePool(poolId)
    }
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions('candidatePools/edit', [
      'updateItemField',
      'clearErrors',
      'setFormItem'
    ]),
    ...mapActions('candidatePools/table', ['deselectItem']),
    ...mapActions('candidatePools', [
      'getCandidatePool',
      'updateCandidatePool'
    ]),
    addPoolCandidate(candidate) {
      let newCandidateList = [...this.formItem.users, candidate]
      this.updateItemField({ name: 'users', value: newCandidateList })
    },
    removePoolCandidate(candidate) {
      let newCandidateList = this.formItem.users.filter(
        (user) => user.id !== candidate.id
      )
      this.updateItemField({ name: 'users', value: newCandidateList })
    },
    savePool() {
      let userIds = this.formItem.users.map((user) => user.id)
      this.updateCandidatePool(
        Object.assign({}, this.formItem, { users: userIds })
      )
    },
    onCancel() {
      this.deselectItem(this.formItem)
      this.$emit('sidebar:navigate', 'cancel')
    }
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
