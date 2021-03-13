<template lang="pug"> 
    .panel-heading
      .job-tabs-header
        .column.is-6.p-0
          ul.predefined-filters
            li(
              @click="navigateHeader(tab.key, tab.link)"
              class="tab-item" 
              :class="{'is-active' : isRouteActive(tab.key), 'is-enabled' : isEnabled(tab.key)}" 
              v-for="(tab, index) in this.tabs"
              :key="tab.key")
              span.tab-item__child-count {{index + 1}}
              h2.font-semi-bold {{tab.text}}
        .column.is-6.p-0
          .submit-header
            v-experience-switcher(
              v-if="active === 'details'"
              :onSubmitAction="() =>$router.push({ path: '/__submit-job' })"
              )
            base-button.font-bold.secondary(@click="onCancelClick") {{previusLabel}}
            base-button.font-bold(:disabled="!nextEnabled.length" @click="onNextClick") {{nextLabel}}
</template>
<script>
import VExperienceSwitcher from '@/components/shared/experience-switcher/VEperienceSwitcher'

export default {
  name: 'VJobHeader',
  components: {
    VExperienceSwitcher
  },
  props: {
    active: {
      type: String,
      required: false,
      default: function () {
        return this.$t('jobs_submit.job_header_active_def')
      }
    },
    nextEnabled: {
      type: [Array, String],
      required: false,
      default: () => ['']
    },
    nextLabel: {
      type: String,
      required: false,
      default: function () {
        return this.$t('jobs_submit.job_header_next_label')
      }
    },
    previusLabel: {
      type: String,
      required: false,
      default: function () {
        return this.$t('jobs_submit.job_header_previus_label')
      }
    },
    previusEnabled: {
      type: [Array, String],
      required: false,
      default: () => ['details']
    },
    onNextClick: {
      type: Function,
      required: false,
      default: () => false
    },
    onCancelClick: {
      type: Function,
      required: false,
      default: () => false
    },
    tabs: {
      type: [Object, Array],
      required: false,
      default: function () {
        return [
          {
            text: this.$t('jobs_submit.job_header_text_details'),

            key: 'details',
            link: '/submit-job'
          },
          {
            text: this.$t('jobs_submit.job_header_text_schedule'),
            key: 'schedule',
            link: 'schedule-job'
          },
          {
            text: this.$t('jobs_submit.job_header_text_candidates'),
            key: 'candidates',
            link: 'select-candidates'
          }
        ]
      }
    }
  },
  methods: {
    isRouteActive(current) {
      if (this.active === current) return true
      return false
    },
    isEnabled(current) {
      if (this.nextEnabled.length > 0 && this.nextEnabled.includes(current))
        return true
      if (
        this.previusEnabled.length > 0 &&
        this.previusEnabled.includes(current)
      )
        return true
    },
    navigateHeader(key, link) {
      if (this.isEnabled(key)) {
        this.$router.push({ path: link })
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.panel-heading {
  background-color: #F9F9F9!important;
  padding 0px 30px!important;
  max-height: 60px;
  .column {
    padding: 0;
    }
  .job-tabs-header {
    display: flex;
    align-items: center;
    max-height: 60px;
    }

  .predefined-filters li {
      padding-bottom: 1.1 rem;
    }
  .tab-item {
    height: 60px;
    align-items: center
    display: flex;
    padding-bottom 0!important
    padding-top: 0!important
    h2 {
      font-weight: 600;
      font-size: 19px;
      color: #AFAFAF;
      line-height: 25px;
    }

    .tab-item__child-count {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      text-align: center;
      margin-right: 10px;
      border-radius: 50px;
      background-color: #AFAFAF;
      font-size: 16px;
      color: #fff;
      width: 25px;
      height: 25px;
      font-weight: bold;
    }

    &:hover {
      border-bottom: none;
      }
    &.is-enabled {
      cursor: pointer
      h2 {
        color: #333333;
      }
      .tab-item__child-count {
        background-color: #333333;
      }
    }
    &.is-active {
    border-bottom: 2px solid #856ff9;
    h2 {
        color: #856ff9;
      }
    .tab-item__child-count {
      background-color: #856ff9;
      }
    }
    }

    .submit-header {
      // background: red;
      display: flex
      justify-content: flex-end;
      font-size: 16px;
      max-height: 60px;
      align-items: center;
      .btn {
        background: #856ff9;
        min-width: 100px;
        box-shadow: none;
        border-radius: 8px;
        height: 35px;
        &.secondary {
          background: #fff;
          margin-right 10px;
          color: #333
          }
        }
      }
}
</style>
