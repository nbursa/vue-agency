<template lang="pug">
  .radio-options
    h2.font-semi-bold {{title}}
    form()
    .input-section(
      v-for="option in options" 
      :key="option.value" 
      :class="{'disabled': option.disabled, 'selected': option.value === initSelected, 'font-semi-bold' : option.value === initSelected}")
      .input-container
        input(type="radio" :value="option.value" :name="option.label" v-model="initSelected" :disabled="option.disabled")
        span.checkmark
      .label-section(@click="!option.disabled && $emit('input', option.value)")
        label(:for="option.label") {{option.label}}
        p(v-if="option.value === initSelected") {{option.description}}
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: function () {
        return this.$t('jobs_submit.radio_options_title_default')
      }
    },
    options: {
      type: [Object, Array],
      required: false,
      default: function () {
        return [
          {
            label: this.$t('jobs_submit.radio_options_label_assign'),
            value: 'assign',
            disabled: false,
            description: this.$t('jobs_submit.radio_options_description_assign')
          },
          {
            label: this.$t('jobs_submit.radio_options_label_offer'),
            value: 'offer',
            disabled: false,
            description: this.$t('jobs_submit.radio_options_description_offer')
          }
        ]
      }
    },
    // eslint-disable-next-line vue/require-prop-types
    selected: {
      required: true,
      default: 'offer'
    }
  },
  computed: {
    initSelected: {
      get() {
        return this.selected
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.radio-options {
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  h2 {
    margin-bottom: 30px;
  }
  .input-section {
    display flex;
    align-items: flex-start
    margin-bottom: 10px;
    cursor: pointer;
     label {
      margin-left: 10px;
      font-size: 16px;
      color: #333333
      cursor: pointer
    }
    p {
      margin-left: 10px;
      font-size: 14px;
      color: #888888;
      max-width: 338px;
      cursor: pointer
    }
    &.selected {
      label {
         color: #856ff9;
      }
    }
    &.disabled {
      label {
        color: rgba(51,51,51, .4)
      }
    }

    .input-container {
      display: flex;
      cursor: pointer;
      font-size: 22px;
      height: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .checkmark {
        display: flex;
        align-self: center;
        height: 16px;
        width: 16px;
        background-color: #eee;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        &:after {
          content: "";
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
        }
      }
      input {
        height: 16px;
        width: 16px;
        z-index: 1;
        position: absolute;
        opacity: 0;
        cursor: pointer;
        &:checked ~ .checkmark {
          background-color: #856ff9;
        }
        &:checked ~ .checkmark:after {
          display block;
        }
      }

      &:hover input ~ .checkmark {
        background-color: #ccc;
      }
    }
  }
}
</style>
