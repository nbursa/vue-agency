<template lang="pug">
  .right-sidebar-container
    .right-sidebar
        transition(name="fade")
          div.right-sidebar-container__loader(v-if="isLoading" :key="0")
            half-circle-spinner(
              :animation-duration="1000"
              :size="60"
              color="#507DFF"
              )
        transition(name="slide-fade" mode="out-in")
          component(
            :is="getComponent"
            @sidebar:navigate="onNavigate"
            :key="1"
          )
</template>

<script>
import { deepPropFind } from "@/utils/general"
import { mapActions, mapState, mapGetters } from "vuex"
import { HalfCircleSpinner } from "epic-spinners"

export default {
  components: {
    HalfCircleSpinner
  },
  provide() {
    return { namespace: this.namespace }
  },
  props: {
    sidebarOptions: {
      type: Array,
      required: true
    },
    namespace: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      sidebarComponent(state, getters) {
        return state[this.namespace].sidebar.sidebarComponent
      },
      isLoading(state) {
        if(!state[this.namespace][this.sidebarComponent]) return false
        return deepPropFind(state[this.namespace][this.sidebarComponent], "isFetching")
      }
    }),
    getComponent() {
      const activeComponent = this.sidebarOptions.find(
        option => option.label === this.sidebarComponent
      )
      if (activeComponent && activeComponent.component) {
        return activeComponent.component
      }

      return this.sidebarOptions.find(option => option.label === "default")
    }
  },
  created() {
    if (!this.sidebarComponent) {
      this.setSidebarComponent("default")
    }
  },
  methods: {
    ...mapActions({
      setSidebarComponent(dispatch, payload) {
        return dispatch(
          this.namespace + "/sidebar/setSidebarComponent",
          payload
        )
      }
    }),
    onNavigate(data) {
      if (this.sidebarOptions.find(i => i.label === data)) {
        this.setSidebarComponent(data)
      } else {
        //this.sidebarOptions[0].label
        this.setSidebarComponent("default")
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/partials/right-sidebar';
@import '~@/assets/styles/global/partials/slide-animation';

.right-sidebar-container {
  position: relative;

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 400px;
    background-color: rgba(white, 0.75);
    pointer-events: none;
    z-index: 1;
  }
}
</style>
