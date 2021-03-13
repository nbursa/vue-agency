<template lang="pug">
div.star-container
  div.star-btn__wrapper
    button.star-btn(
      v-tooltip.left-start="$t('global.experience_switcher_tooltip')"
      :class="{'star-btn--active': modalVisible}"
      @click="modalVisible = !modalVisible"
      )
      svgicon.candidate-icon(name="global/star" :color="iconColor" )
  transition(name="modal")
        .modal-container( v-if="modalVisible")
          header
            h1 {{title}}
            span BETA
          .content
            p {{contentText}}
          footer
            span {{footerText}}
            base-button(@click="onSubmitAction") {{submitText}}

</template>
<script>
import '@/compiled-icons/global'
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.experience_switcher_title')
      }
    },
    contentText: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.experience_switcher_content')
      }
    },
    submitText: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.experience_switcher_submit')
      }
    },
    footerText: {
      type: String,
      required: false,
      default: function () {
        return this.$t('global.experience_switcher_footer')
      }
    },
    onSubmitAction: {
      type: Function,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      modalVisible: false
    }
  },
  computed: {
    iconColor() {
      return !this.modalVisible ? '#F8A87D' : '#FFF'
    }
  }
}
</script>
<style lang="stylus" scoped>
.star-container {
  max-width: 50px;
  max-height: 60px;
  }
.star-btn {
  height: 35px;
  width: 35px;
  border: none;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  &--active {
    background: #F8A87D;
  }
  &:focus, :active {
    outline: none
  }
  &__wrapper {
    display flex;
    align-content: center;
    height: 60px;
    margin-right: 15px;
    align-items: center;
  }
}
.modal-container {
  width: 477px;
  height: 191px;
  display: flex
  flex-direction: column
  position relative
  left -437px;
  z-index: 9;
  margin-top: 0;
  top: -5px;
  padding: 15px;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    span {
      margin-left: auto;
      font-family: Aileron-Bold;
      padding: 5px 10px;
      font-size: 13px;
      background: rgba(248, 168, 125, 0.1)
      border-radius: 8px;
      color: #f8a87d
    }
    h1 {
      font-size: 19px;
      font-family: Aileron-SemiBold;
      line-height: 22px;
      max-width: 60%;
    }
  }
  .content {
    margin-top: 30px
    p {
      font-size: 16px;
      font-weight: normal
      color: #333
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal
    }
  }
  footer {
    display: flex
    align-items: center;
    margin-top: auto;
    .btn {
        background: #856ff9;
        height: 35px;
        margin-left: auto;
        font-family: Aileron-Bold;
        }
    span {
      font-size: 13px;
      color: #888;
    }
  }
}
</style>
