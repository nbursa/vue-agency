<template lang="pug">
transition(name="modal")
  .modal-background
    .modal-container(v-click-outside="closeModal")
      a.close(@click='closeModal')
        svgicon.icon(
          name='global/close'
          :width="'29'"
          :height="'29'"
          :fill='false'
        )
      .audit-list
        h4.audit-list__title {{$t("audit_trail.title")}}
        div.audit-list__loader(v-if="isLoading")
          half-circle-spinner(
            :animation-duration="1500"
            :size="50"
            :color="'#1a394a'"
          )
        div.audit-list__content(v-else)
          div.audit-list__chain
            div.audit-list__item(v-for="item in formatedLogs" v-if="logs.length !== 0")
              span.audit-list__text {{formatChange(item)}}
            div.audit-list__placeholder(v-else) {{$t('audit_trail.placeholder')}}
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { mapGetters, mapActions, mapState } from 'vuex'
import { HalfCircleSpinner } from 'epic-spinners'
import { deepObjectDiff } from '@/utils/general'
import DateTimeUtils from '@/utils/dateUtils'
import { DateTime } from 'luxon'
import { startCase } from 'lodash'

export default {
  components: {
    HalfCircleSpinner
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('modals', ['modalData']),
    ...mapState({
      logs(state, getters) {
        return getters[
          `${this.modalData.namespace}/${this.modalData.getterName}`
        ]
      }
    }),
    formatedLogs() {
      return (
        this.logs &&
        this.logs
          .reduce((acc, item) => {
            let diff
            if (item.differences.length !== 0) {
              diff = Object.keys(item.differences).reduce((results, key) => {
                if (key.indexOf('old_') === -1) {
                  results.push({
                    date: item.date,
                    author: item.author,
                    type: item.type,
                    keyName: key,
                    newVal: item.differences[key],
                    oldVal: item.differences[`old_${key}`]
                  })
                }
                return results
              }, [])
            } else {
              diff = [
                {
                  date: item.date,
                  author: item.author,
                  type: item.type,
                  initialStartTime: item.initialStartTime,
                  initialEndTime: item.initialEndTime
                }
              ]
            }
            acc.push(diff)
            return acc
          }, [])
          .flat()
          .sort((i1, i2) => {
            return DateTime.fromSQL(i2.date) - DateTime.fromSQL(i1.date)
          })
      )
    }
  },
  async mounted() {
    this.isLoading = true
    await this.fetchJobLogs(this.modalData.id)
    this.isLoading = false
  },
  methods: {
    ...mapActions('modals', ['closeModal']),
    ...mapActions('jobManagement', ['fetchJobLogs']),
    ...mapActions({
      fetchModalData(dispatch, payload) {
        return dispatch(
          `${this.modalData.namespace}/${this.modalData.actionName}`,
          payload
        )
      }
    }),
    formatChange(item) {
      if (item.newVal) {
        if (item.oldVal) {
          return `${DateTimeUtils.getDateTimeFromSQL(item.date)} - ${
            item.author
          } ${this.$t('audit_trail.' + item.type)} ${startCase(
            item.keyName
          )} ${this.$t('audit_trail.from')} ${this.parseChangeObj({
            name: item.keyName,
            value: item.oldVal,
            apiBugHelpFlag: 'old_'
          })} ${this.$t('audit_trail.to')} ${this.parseChangeObj({
            name: item.keyName,
            value: item.newVal
          })}`
        }
        return `${DateTimeUtils.getDateTimeFromSQL(item.date)} - ${
          item.author
        } ${this.$t('audit_trail.' + item.type)} ${startCase(
          item.keyName
        )} ${this.$t('audit_trail.to')} ${this.parseChangeObj({
          name: item.keyName,
          value: item.newVal
        })}`
      } else if (item.oldVal) {
        return
      } else {
        return `${DateTimeUtils.getDateTimeFromSQL(item.date)} - ${
          item.author
        } ${this.$t('audit_trail.' + item.type)} ${this.$t(
          'audit_trail.job'
        )} (${DateTimeUtils.getDateTimeFromSQL(
          item.initialStartTime
        )} - ${DateTimeUtils.getDateTimeFromSQL(item.initialEndTime)})`
      }
    },
    parseChangeObj(obj) {
      let { name, value, apiBugHelpFlag } = obj
      const parseActionMap = (type) => {
        const Users = {
          startTime: (val) => {
            return DateTimeUtils.getCalendarFormat(val)
          },
          endTime: (val) => {
            return DateTimeUtils.getCalendarFormat(val)
          },
          status: (val) => {
            return apiBugHelpFlag ? val.old_name : val.name
          },
          user: (val) => {
            return apiBugHelpFlag
              ? `${val.old_firstName} ${val.old_lastName}`
              : `${val.firstName} ${val.lastName}`
          },
          bonuses: (val) => {
            return val
          },
          default: (val) => {
            return val
          }
        }
        return Users[type] ? Users[type](value) : Users.default(value)
      }

      return parseActionMap(name)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';

.audit-list {
  width: 100%;
  min-height: 400px;
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__title {
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    background-color: $highlightGray;
    font-weight: bold;
    padding: 15px 10px;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__content {
    overflow: auto;
    padding: 0 15px;
    height: calc(100% - 75px);
    position: relative;

  }
  &__chain {
    position: relative;
    &:before {
      content: '';
      width: 3px;
      display: block;
      background: $primary
      position: absolute;
      top: 25px;
      left: 6px;
      bottom: 42px;
      z-index: 1;
    }
  }
  &__item {
    padding-top: 10px;
    height: 60px;
    position: relative;
    font-weight: 600;
    &:before {
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: $primary
      z-index: 3;
      position: absolute;
      top: 13px;
    }
  }
  &__text {
    margin-left: 25px;
    display: inline-block;
  }
  &__placeholder {
    margin-top: 50px;
    text-align: center;
  }
}




.modal-container {
  width: 750px;
  max-height: 70vh;
  margin: 0 auto;
  background-color: $white;
  margin-top: 10%;
  border-radius: 9px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.14);
  position: relative;
  display: flex;
  font-weight: 700;

  .close {
    height: 29px;
    width: 29px;
    border-radius: 50px;
    position: absolute;
    right: -15px;
    top: -15px;
    background-color: $white;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.17);

    .icon {
      color: #333;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
</style>
