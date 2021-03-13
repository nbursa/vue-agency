<template lang="pug">
  div.toggler--wrapper
    .toggler--wrapper__btn(v-for="tab in this.tabs" :key="tab.key")
      button.toggler--btn(@click="changeActiveTab(tab.key)" :class="acitveTab === tab.key && 'active'") {{tab.text}}
    
</template>
<script>
export default {
  props: {
    active: {
      type: Number,
      required: false,
      default: 0
    },
    tabs: {
      type: [Object, Array],
      required: false,
      default: function () {
        return [
          {
            text: this.$t('jobs_submit.job_toggler_txt_basic'),
            key: 0
            //onTabClick: () => console.log('tab 1')
          },
          {
            text: this.$t('jobs_submit.job_toggler_txt_advanced'),
            key: 1
            //onTabClick: () => console.log('tab 2')
          }
        ]
      }
    }
  },
  data() {
    return {
      acitveTab: this.active
    }
  },
  methods: {
    changeActiveTab(tab) {
      this.acitveTab = tab
      this.tabs[tab].onTabClick()
    }
  }
}
</script>
<style lang="stylus" scoped>
.toggler {
  &--wrapper {
    display: flex;
    text-align: center;
    flex: 1;
    border-radius: 8px;
    background: #F2F2F2;
    font-size: 16px;
    align-self: center;
    color: #888888;
    &__btn {
      width: 50%;
      padding: 3px;
    }
  }
  &--btn {
    border: none;
    color: inherit;
    font-size: inherit;
    width: 100%;
    line-height: 29px;
    cursor: pointer;
    font-family: Aileron-SemiBold;
    &.active {
      color: #856FF9;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
