<template lang="pug">
div
  header
    div.sidebar-control.sidebar-control--align-left
      //- base-button(@click="onAddClick") {{ $t("client_locations_sidebar.button_add_client") }}
      h2.sidebar-control__title {{formItem.name}}
    div.sidebar-control-tab.sidebar-control-tab--tab-cont
      ul.sidebar-control__tab-nav
        li.sidebar-control__tab-item(:class="{'sidebar-control__tab-item--is-active': activeTab === 'details'}" @click="activeTab = 'details'") {{$t("client_locations_sidebar.tab_0")}}
        li.sidebar-control__tab-item(:class="{'sidebar-control__tab-item--is-active': activeTab === 'notes'}" @click="activeTab = 'notes'") {{$t("client_locations_sidebar.tab_1")}}
        li.sidebar-control__tab-item(:class="{'sidebar-control__tab-item--is-active': activeTab === 'exclude'}" @click="activeTab = 'exclude'") {{$t("client_locations_sidebar.tab_2")}}

  transition-group(name="slide-fade" mode="out-in")
    .sidebar-overflow(key="1" v-show="activeTab === 'details'")
      v-client-form(
        v-if="formItem"
        :client="formItem"
        action="edit"
        :updateFn="updateItemField"
        :errorsFromBack="getErrors"
        @form:save="saveUser"
        @form:cancel="onCancel"
      )

    .sidebar-overflow(key="2" v-show="activeTab === 'notes'")
      notes(
        v-if="formItem"
        :subject="formItem"
        updateRoute="clients"
        @notes:created="test"
        @notes:deleted="test"
      )
    .sidebar-overflow(:key="3" v-show="activeTab === 'exclude'" )
      exclude-candidate(
        :client="formItem"
        @exclude-candidates:update="updateExcludedCandidates"
      )


</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import VClientForm from './VClientForm'
import Client from '@/models/Client'
import Notes from '@/components/shared/notes/CNotesInterface'
import ExcludeCandidate from './exclude-candidates/CExcludeInterface'

import { formMessages } from '@/mixins/formMessages.mixin'

export default {
  components: {
    VClientForm,
    ExcludeCandidate,
    Notes
  },
  mixins: [formMessages],
  data() {
    return {
      preventSidebarCancel: true,
      activeTab: 'details',
      successMessage: this.$t('client_locations_sidebar.toast_update')
    }
  },
  computed: {
    ...mapState('clients/edit', [
      'formItem',
      'itemSaved',
      'isFetching',
      'itemDeleted'
    ]),
    ...mapGetters('clients/edit', ['getErrors'])
  },
  beforeDestroy() {
    this.clearErrors()
  },
  methods: {
    ...mapActions('clients', [
      'updateClient',
      'setSelected',
      'getClient',
      'excludeCandidates'
    ]),
    ...mapActions('clients/edit', [
      'updateItemField',
      'clearErrors',
      'setFormItem',
      'addChildItem',
      'removeChildItem'
    ]),
    test() {
      this.getClient(this.formItem.id)
    },
    onAddClick() {
      this.setSelected(0)
      this.$emit('sidebar:navigate', 'create')
    },
    saveUser() {
      this.clearErrors()
      this.updateClient(this.formItem)
    },
    updateExcludedCandidates(payload) {
      this.clearErrors()
      this.excludeCandidates({
        excludeList: [...payload],
        user: { ...this.formItem }
      })
    },
    onCancel() {
      this.setSelected({})
      this.$emit('sidebar:navigate', 'cancel')
    },
    errorParser(error) {
      return Object.keys(error).map((key) => {
        return error[key][0]
      })[0]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/styles/global/partials/slide-animation";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
