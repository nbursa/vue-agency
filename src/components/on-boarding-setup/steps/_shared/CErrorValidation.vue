<template lang="pug">
div
  transition(name="validation-animation")
    p.help(v-if="mappedError.errors") {{ serverErrorMessage }} {{ localError.message }}
  transition(name="validation-animation")
    p.help(v-if="localError.message") {{ localError.message }}
</template>


<script>
import { mapState } from "vuex"
export default {
  inject: ["localError"],
  computed: {
    ...mapState({ mappedError: state => state.serverErrors }),
    serverErrorMessage: function() {
      //TODO - dehorrify this thing
      if (this.mappedError.errors) {
        if(this.mappedError.errors.id) {
          return this.mappedError.errors.id[0]
        } else if(this.mappedError.errors.error) {
          return this.mappedError.errors.error
        } else if (this.mappedError.errors.logo) {
          return this.mappedError.errors.logo[0]
        } else if(this.mappedError.message) {
          return this.mappedError.message
        }
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
