<template lang="pug">
  button.btn(
    @click="$emit('click')"
    :class="{'is-disabled' : disabled}"
    type="button"
  )
    slot {{ 'Submit' }}
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    customClass: {
      type: String,
      required: false,
      default: ""
    }
  }

}
</script>

<style scoped lang="stylus">

@import '~@/assets/styles/global/base/_button'

.btn {
    &.is-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    &.is-cancel {
      background: white;
      border:1px solid $primary;
      span {
        color: $primary;
      }
    }
    &.is-cancel-text-only {
      border: none;
      background-color: transparent;
      box-shadow: none;
      background-image: none;
      text-align: left;
      padding: 10px;
      color: white;  
      >span {
        color: white;
      }
    }
    &.is-cancel-text-only {
      border: none;
      background-color: transparent;
      box-shadow: none;
      background-image: none;
      text-align: left;
      padding: 10px;
      color: white;  
      >span {
        color: white;
      }
    }
    &.is-small {
      height: 28px;
    }
    &.is-flex-1 {
      flex: 1;
      margin: 5px 5px;
    }
    &.is-fullwidth {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>
