<template lang="pug">
transition(name="modal")
  .modal-background(v-show="modalStatus")
    .modal-container(:style="customStyle" v-click-outside="closeModal" v-if="modalStatus")
      slot(
        name="content"
      )
</template>

<script>
import ClickOutside from "vue-click-outside"
import { mapActions, mapState } from "vuex"
import modalState from "@/store/modules/modals"

export default {
  directives: {
    ClickOutside
  },
  provide() {
    const options = {}
    Object.defineProperty(options, "modalData", {
      enumerable: true,
      get: () => this.modalModule.data
    })
    return { options }
  },
  props: {
    namespace: {
      type: String,
      required: true,
      default: null
    },
    customStyle: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    ...mapState({
      modalStatus(state) {
        return state[this.namespace].modal.toggle
      },
      modalModule(state) {
        return state[this.namespace].modal
      }
    })
  },
  created() {
    if (this.namespace && !this.modalModule) {
      this.$store.registerModule([this.namespace, "modal"], modalState)
    }
  },
  beforeDestroy() {
    this.resetModal()
  },
  methods: {
    ...mapActions({
      closeModal(dispatch) {
        return dispatch(`${this.namespace}/modal/closeModal`)
      },
      resetModal(dispatch) {
        return dispatch(`${this.namespace}/modal/resetModal`)
      }
    })
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/global/partials/modal';

.modal-container {
  width: 822px;
  height: 455px;
  margin: 0 auto;
  background-color: $white;
  margin-top: 120px;
  border-radius: 9px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.14);
  position: relative;
  display: flex;

  .close {
    height: 29px;
    width: 29px;
    border-radius: 50px;
    position: absolute;
    right: -15px;
    top: -15px;
    background-color: $white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.17);

    .icon {
      color: #333;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
