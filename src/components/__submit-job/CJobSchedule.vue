<template lang="pug">
  .columns.job-submit-columns
        .column.job-submit-content-box
          .panel
            v-job-header(
              :nextLabel="$t('jobs_submit.job_header_next_label')"
              :onNextClick="() => this.$router.push({ path: '/select-candidates' })"
              :nextEnabled="(showCandidates) ? ['candidates'] : []"
              active="schedule" 
              :onCancelClick="() => this.$router.push({ path: '/' })")
            .panel-block.job-schedule
                .columns(:key="0")
                .job-schedule__content.columns
                  .column.is-3.tab.is-gray
                    header.shifts-header
                      h2.font-semi-bold.ml-5 {{ $t("jobs_submit.shifts_header_time_and_date") }}
                    v-job-create-shift(
                      :from="this.from"
                      :to="this.to"
                      :positions="positions"
                      :onUpdate="updateInitialTimes"
                    )
                    .job-schedule__calendar-wrapper
                      flatpickr(
                        v-for="({ month, minDate, maxDate} , i) in flatpickrMonths"
                        :key="i"
                        ref="flatpickr"
                        :showInternalInput="true"
                        @change="onSelectDates"
                        :options="{...config, minDate, maxDate}"
                        :value="flatpickrSelected[month] && flatpickrSelected[month]"
                      )
                
                  .column.is-4.tab.is-min-width
                    header.shifts-header
                      .checkbox-wrapper
                        base-checkbox.shift-chekbox(:value="selectAll" @input="selectAllShifts")
                      .headline-wrapper   
                        h2.font-semi-bold {{ $t("jobs_submit.shifts_header_shifts") }} ({{getShiftsArray.length}})
                      .sort-wrapper  
                        select.sort-select(v-model="sortBy")
                          option(value="chrono") {{ $t("jobs_submit.sort_by_chrono") }}
                          option(value="recent") {{ $t("jobs_submit.sort_by_recent") }}
                    .shifts-list(v-if="getShiftsArray.length > 0")
                      div.mb-20(v-for="shift in getShiftsArray")
                        h3.font-semi-bold(v-if="!shift.parentId") {{shift.dateTitle}}
                        v-job-create-shift(
                          :shift="shift"
                          :from="shift.from"
                          :to="shift.to"
                          :positions="shift.positions"
                          :disabled="true"
                          :key="shift.date.toString()"
                          :icons="true"
                          :editable="false"
                          :selectable="true"
                          :onSelect="setActiveShift"
                          :bordered="true"
                          :active="(activeShifts.includes(shift.id))"
                          :onSplitClickAction="splitShift"
                          :removeShift="removeShift"
                          )
                  .column.is-4.tab(v-if="activeShifts.length > 0")
                    header.shifts-header
                      h2 {{ $t("jobs_submit.shifts_header_edit_hours") }}   
                    v-job-create-shift(
                          :from="this.editFrom"
                          :to="this.editTo"
                          :positions="this.editPositions"
                          :icons="true"
                          :editable="true"
                          :bordered="true"
                          :onUpdate="updateEditTimes"
                          )
                    base-button.mt-10(@click="saveEdits") {{ $t("jobs_submit.save_edits") }}

</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { getIncrementTimeOptions } from '@/components/submit-job/timeOptions'
import VJobHeader from './VJobHeader'
import VJobToggler from './VJobToggler'
import VJobCreateShift from './VJobCreateShift'
import flatpickr from '@/components/shared/flat-pickr'
import 'flatpickr/dist/flatpickr.css'

import '@/compiled-icons/__submit-job'

export default {
  components: {
    VJobHeader,
    VJobToggler,
    VJobCreateShift,
    flatpickr
  },
  data() {
    return {
      config: {
        mode: 'multiple',
        clickOpens: false,
        inline: true,
        showMonths: 1
      },
      flatpickr: {
        displayMonths: 4,
        currentMonth: new Date().getMonth(),
        currentDate: new Date()
      },
      from: 109,
      to: 205,
      positions: '1',
      activeShifts: [],
      editFrom: 109,
      editTo: 205,
      editPositions: '1',
      selectAll: false,
      times: getIncrementTimeOptions()
    }
  },
  computed: {
    sortBy: {
      get() {
        return this.sortType
      },
      set(value) {
        this.setSortType(value)
      }
    },
    flatpickrMonths() {
      return [...Array(this.flatpickr.displayMonths).keys()]
        .map((it) => {
          const { currentMonth, currentDate } = this.flatpickr
          const month = currentMonth + it
          const monthJs = month > 11 ? month - 12 : month
          const date = new Date()
          date.setMonth(date.getMonth() + it, 1)

          let minDate = new Date(date.setDate(1)).setHours(0, 0, 0)
          const maxDate = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0,
            23,
            59
          )
          // last day of the month
          if (
            currentMonth === maxDate.getMonth() &&
            currentDate.getDate() === maxDate.getDate()
          ) {
            return null
          }

          if (currentMonth === month) {
            let firstDay = currentDate.getDate()
            const currentTime = new Date()
            const currentHours = currentTime.getHours()
            const currentMinutes = currentTime.getMinutes()
            const shiftStarts = this.times.filter(
              ({ id }) => id === this.from
            )[0].label
            const shiftHours = parseInt(shiftStarts.split(':')[0])
            const shiftMinutes = parseInt(shiftStarts.split(':')[1])
            if (
              currentHours > shiftHours ||
              (shiftHours === currentHours && currentMinutes > shiftMinutes)
            ) {
              firstDay += 1
            }
            minDate = new Date(date.setDate(firstDay)).setHours(0, 0, 0)
          }

          return {
            minDate,
            maxDate,
            month: monthJs
          }
        })
        .filter((obj) => obj !== null)
    },
    ...mapState('_submitJob', ['job', 'meta', 'status', 'generatedJobs']),
    ...mapState('_scheduleJob', ['shifts', 'shiftsArray', 'sortType']),
    ...mapGetters('_scheduleJob', [
      'getShiftsArray',
      'flatpickrSelected',
      'showCandidates'
    ])
  },
  watch: {
    getShiftsArray(shifts) {
      if (this.activeShifts.length) {
        let cloneActive = [...this.activeShifts]
          .map((active) => {
            const ids = shifts.map(({ id }) => id)
            if (!ids.includes(active)) return null
            return active
          })
          .filter((id) => id !== null)
        this.activeShifts = cloneActive
      }
    }
  },
  methods: {
    ...mapActions('_submitJob', ['updateFieldValue']),
    ...mapActions('_scheduleJob', [
      'setActiveShifts',
      'editShiftTimes',
      'setSortType',
      'splitShift',
      'removeShift'
    ]),
    onSelectDates(dates, dateStr, instance) {
      this.setActiveShifts({
        dates,
        from: this.from,
        to: this.to,
        positions: this.positions,
        month: instance.currentMonth,
        year: instance.currentYear,
        timeClicked: new Date().getTime()
      })
    },
    setActiveShift(shift, type) {
      if (type === 'add') this.activeShifts.push(shift.id)
      if (type === 'remove')
        this.activeShifts = this.activeShifts.filter((id) => id !== shift.id)
    },
    updateTimes({ from, to, fromName, toName, positions, positionsName }) {
      if (typeof from === 'number') {
        this[fromName] = from
      }
      if (typeof to === 'number') {
        this[toName] = to
      }
      if (positions && positions > 0) this[positionsName] = positions
    },
    updateInitialTimes(item) {
      this.updateTimes({
        ...item,
        fromName: 'from',
        toName: 'to',
        positionsName: 'positions'
      })
    },
    updateEditTimes(item) {
      this.updateTimes({
        ...item,
        fromName: 'editFrom',
        toName: 'editTo',
        positionsName: 'editPositions'
      })
    },
    saveEdits() {
      this.editShiftTimes({
        shifts: this.activeShifts,
        from: this.editFrom,
        to: this.editTo,
        positions: this.editPositions
      })
    },
    selectAllShifts() {
      this.selectAll = !this.selectAll
      if (this.selectAll)
        this.activeShifts = this.getShiftsArray.map(({ id }) => id)
      if (!this.selectAll) this.activeShifts = []
    }
  }
}
</script>
<style lang="stylus">
.ml-5 {
  margin-left: 5px;
  }
.job-schedule {
  background: #ffffff;
  padding: 0!important;
  flex-direction: column;
  .shifts-list {
    padding-top: 10px;
    }
  .is-min-width {
    min-width: 470px;
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mb-10 {
    margin-bottom: 10px
    }
  .mb-20 {
    margin-bottom: 20px
    }
  button {
    margin-left: 12px;
    margin-top: -10px
  }
  .is-center {
    justify-content: center;
  }
  h3 {
    font-size: 19px;
    font-weight: 500;
    line-height: 23px
    margin-bottom: 0px;
  }
  .tab {
    align-self: flex-start;
    &.is-gray {
      background: #F9F9F9;
      border-right: .5px solid #DCDCDC;
      text-align: center;
      justify-content: center;
      max-width: 330px;
      min-width: 330px;
      }
    h2 {
      font-size: 21px;
      line-height: 25px;
      font-weight: 500;
      &.center {
        margin: 0 auto;
      }
    }
    .text-header {
      margin: 20px 0 30px 10px;
    }
    }
  .columns {
    width: 100%;
    margin: 0!important;
  }
   header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 66px;
    border-bottom: .5px solid #DCDCDC;
    .left-align {
      display: flex;
      align-items: center;
      }
    .right-align {
      justify-content: flex-end;
      display: flex;
      align-items: center;
      }
  }
  .btn {
    background: #856ff9;
    }
  .cancel-icon{
    width: 35px;
    height: 35px;
    float: left;
    opacity: .5;
    }
    h1 {
      font-size: 25px;
      line-height: 35px;
    }
  &__content {
      display: flex;
    }
  &__calendar-wrapper {
      display: flex;
      flex-direction: column;
      .flatpickr-calendar {
          overflow: hidden!important;
          position: inherit!important;
          width: 100%;
          box-shadow: none;
          background: inherit;
          .flatpickr-weekday {
            color: #888;
            }
          .flatpickr-current-month {
            left: 0;
            text-align: left;
            }
          .numInputWrapper {
            font-family: Aileron-SemiBold;
            color: #333;
            font-size: 19px;
            input {
              color: inherit;
              font-size: 19px;
            }
            &:hover {
              background: none;
              }
            }
          .arrowUp, .arrowDown {
            display: none;
            }
          .flatpickr-monthDropdown-months {
            font-size: 19px;
            font-family: Aileron-SemiBold;
            -webkit-appearance: none!important;
            cursor: auto;
            &:hover {
              background: none;
              }
          }
          &:before, &:after {
            content: none !important
          }
          .flatpickr-prev-month {
            display: none;
          }
          .flatpickr-next-month {
            display: none;
          }

          .flatpickr-day {
            &.selected {
              background: #856ff9;
              border-color: #856ff9;
              }
            &.today {
              border-color: #856ff9;
              &:hover {
                background: #856ff9;
                }
            }
            }
        .flatpickr-innerContainer {
          justify-content: center;
        }
        }
    }
}
.shifts-header {
    display: flex;
    align-items: center;
    border: none!important;
    height: auto!important;
    margin-top: 25px;
    margin-bottom: 20px;
    .headline-wrapper {
    float: left;
    margin-right: 20px;
  }
  .sort-wrapper {
    .sort-select {
      line-height: 25px;
      font-size: 15px;
      color: #333;
      border: none;
    }
  }
  .checkbox-wrapper{
    margin-right: 10px;
    float: left;
    padding: 9px;
    background: #f2f2f2;
    border-radius: 8px;
    .shift-chekbox {
    border: .5px solid #dcdcdc!important;
    border-radius: 4px;
    background: #fff;
    cursor: pointer
    width: 16px;
    height: 16px;
    &.active {
      background: #856ff9;
    }
  }
  }
  }
</style>
