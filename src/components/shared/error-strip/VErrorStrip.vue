<template lang="pug">
div
  transition(name="validation-animation")
    p.help(v-show="mappedError.errors") {{ serverErrorMessage }}
  transition(name="validation-animation")
    p.help(v-show="localError.message") {{ localError.message }}
</template>


<script>
import { mapState } from "vuex"
export default {
  props: {
    localError: {
      type: [Object],
      required: false,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState({ mappedError: state => state.serverErrors }),
    serverErrorMessage: function() {
      if (this.mappedError.errors) {
        return this.mappedError.errors.id[0]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.help {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #D0021B;
  padding: 5px 20px;
  color: white;
  font-size: 14px;
  line-height: 19px;
  margin: 0;
}

.validation-animation-enter-active {
  transition: all 0.25s ease;
}

.validation-animation-enter, .validation-animation-leave-to {
  opacity: 0;
}
</style>
