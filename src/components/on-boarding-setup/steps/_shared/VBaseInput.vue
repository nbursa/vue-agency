<template lang="pug">
div.onboarding-input
  input.input.job-type--input(
    @keyup.enter="saveNode"
    @blur="saveNode"
    :class="extendedClass"
    v-model="input"
    ref="newNodeInput"
    :placeholder="placeholder"
  )
</template>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/mixins';

.onboarding-input {
  margin: 1em 0 0 0;

  .input {
    opacity: 0.7;
    height: 60px;
    font-size: 1.1em;
    padding: 0 20px;
    box-shadow: none;
    transition: all 0.3s ease;

    &:hover {
      border-color: #dbdbdb;
    }

    +placeholder() {
      color: #363636;
    }
  }
  .is-small {
    height: 40px;
  }
  .is-padded-right {
    padding-right: 25px;
  }
}
</style>


<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true
    },
    extendedClass: {
      type: String,
      required:false,
      default: ""
    },
    clearOnBlur: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      input: ""
    }
  },
  methods: {
    saveNode: function() {
      this.input.trim()
      if (this.input === "") {
        return
      }
      this.$emit("action:save", this.input)
      if(this.clearOnBlur) this.input = ""
    }
  }
}
</script>

