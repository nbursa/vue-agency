<template lang="pug">
  .content
    .tools
      .tools__manipulate
        .tools__manipulate--label {{ $t("agency_structure.wheel_tools") }}
        button.button.tools__button(v-tooltip.bottom-start="$t('agency_structure.wheel_tooltip_cut')" @click.prevent="triggerTool('split')" :class="{'tools__button--active': split === 'active' }")
          img(:src="splitIcon")
        button.button.tools__button(v-tooltip.bottom-start="$t('agency_structure.wheel_tooltip_move')" @click.prevent="triggerTool('move')" :class="{'tools__button--active': move === 'active' }")
          img(:src="moveIcon")
        button.button.tools__button(v-tooltip.bottom-start="$t('agency_structure.wheel_tooltip_merge')" @click.prevent="triggerTool('merge')" :class="{'tools__button--active': merge === 'active' }")
          img(:src="mergeIcon")
      .tools__reset
        .tools__reset--label {{ $t("agency_structure.wheel_reset") }}
        button.button.tools__button.no-margin(@click.prevent="triggerReset('reset')")
          img(:src="resetIcon")
</template>

<script>
export default {
  data() {
    return {
      merge: 'normal',
      split: 'normal',
      move: 'active',
      reset: 'normal'
    }
  },
  computed: {
    mergeIcon: function () {
      return require(`@/assets/static/agency-setup/job-times/merge-tool-${this.merge}.svg`)
    },
    splitIcon: function () {
      return require(`@/assets/static/agency-setup/job-times/cut-tool-${this.split}.svg`)
    },
    moveIcon: function () {
      return require(`@/assets/static/agency-setup/job-times/move-tool-${this.move}.svg`)
    },
    resetIcon: function () {
      return require(`@/assets/static/agency-setup/job-times/reset-tool-${this.reset}.svg`)
    }
  },
  methods: {
    triggerTool(tool) {
      Object.keys(this.$data).forEach((key) => {
        this.$data[key] = 'normal'
        if (tool === key) {
          this.$data[key] = 'active'
        }
      })
      this.$emit('timetool:action', tool)
    },
    triggerReset(tool) {
      this.$emit('timetool:action', tool)
    }
  }
}
</script>

<style lang="stylus" scoped>


.tools {
  display: flex;

  &__button {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 4px;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    border: 0;

    &:focus {
      box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
    }

    &:last-child {
      margin-right: 0;
    }

    &--active {
      background-color: $primary;
    }

    img {
      width: 22px;
    }
  }

  &__manipulate {
    flex: 1;

    &--label {
      font-size: 0.8125rem;
      margin-bottom: 9px;
      width: 100%;
      color: $fontGray;
    }
  }

  &__reset {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    &--label {
      font-size: 0.8125rem;
      width: 100%;
      text-align: right;
      color: $fontGray;
      margin-bottom: 5px;
    }
  }
}
</style>
