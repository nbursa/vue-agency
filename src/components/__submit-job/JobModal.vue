<template lang="pug">
transition(name="modal")
  .modal-background(v-show="isVisible")
    .modal-container( v-if="isVisible")
      header
        h1 {{title}}
      .content
        <slot></slot>  
      footer
        base-button.secondary(@click="onCloseClick") {{ $t("jobs_submit.job_modal_base_button_cancel") }}
        base-button(@click="onClickSubmit" :class="{'remove' : type === 'remove'}") {{submitText}}

</template>
<script>
// import ClickOutside from 'vue-click-outside'
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'success'
    },
    title: {
      type: String,
      required: true
    },
    submitText: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    onClickSubmit: {
      type: Function,
      required: true
    },
    onCloseClick: {
      type: Function,
      required: true
    }
  },
  methods: {}
}
</script>
<style scoped lang="stylus">
.modal-container {
  width: 377px;
  height: 213px;
  display: flex
  flex-direction: column
  header {
    width: 100%;
    height: 52px;
    background-color: #f9f9f9;
    text-align: center
    border-bottom: solid 0.5px #dcdcdc;
    border-radius 15px 15px 0 0
    h1 {
      font-size: 21px;
      font-weight: 500;
      font-stretch: normal;
      padding-top: 13px;
      padding-bottom: 13px;
    }
  }
  .content {
    padding: 20px
    min-height: 109px;
    p {
      font-size: 16px;
      font-weight: normal
      color: #333
      text-align: center
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal
    }
  }
  footer {
    height: 52px;
    background-color: #f9f9f9;
    text-align: center
    border-top: solid 0.5px #dcdcdc;
    border-radius: 0 0 15px 15px
    display: flex
    justify-content: flex-end
    align-items: center;
    padding 8px;
    .btn {
        background: #856ff9;
        &.remove {
          background: #FD4C6C
          }
        &.secondary {
          background: #fff;
          margin-right 20px;
          color: #333
          }
        }
  }
}
</style>
