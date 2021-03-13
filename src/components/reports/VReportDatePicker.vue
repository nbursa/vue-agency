<template lang="pug">
  div#report-datepicker.full-width
    .is-flex.date-search
      flatpickr(:options="config" v-model="dummy", ref="flatpickr", :showInternalInput=false, @change="onDatepickerChange" )
      input.date-search__date-part(type="text" @click="openFlatpickr" v-model="startDate" :placeholder="$t('reporting.from')")
      input.date-search__date-part(type="text" @click="openFlatpickr" v-model="endDate" :placeholder="$t('reporting.to')")
    div.reset-button
      button(@click="resetDate")
        //- font-awesome-icon(:icon="resetIcon")
        svgicon.icon(name="job-schedule/delete-filters-active"  width="15px" height="12px" :fill="false")
</template>

<script>
import { mapActions } from 'vuex'
import flatpickr from '@/components/shared/flat-pickr'
import 'flatpickr/dist/flatpickr.css'
import { format, compareAsc } from 'date-fns'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faReset from '@fortawesome/fontawesome-free-solid/faRedo'

//flatpickr change resulted in this requireing a model refactor

export default {
  components: {
    flatpickr,
    FontAwesomeIcon
  },
  data() {
    return {
      config: {
        mode: 'range',
        dateFormat: this.$localization.flatpickrFormat,
        allowInput: false,
        altInput: false
      },
      dummy: [],
      date: [],
      resetIcon: faReset
    }
  },
  computed: {
    startDate() {
      if (this.date && this.date[0]) {
        return format(this.date[0], this.$localization.dateFormat.toUpperCase())
      } else {
        return null
      }
    },
    endDate() {
      if (this.date && this.date[1]) {
        return format(this.date[1], this.$localization.dateFormat.toUpperCase())
      } else {
        return null
      }
    }
  },
  watch: {
    date: function (e) {
      let dates = this.date.reduce((acc, item, index) => {
        if (index === 0) {
          acc['dateFrom'] = format(this.date[index], 'YYYY-MM-DD')
        }
        if (index === 1) {
          acc['dateTo'] = format(this.date[index], 'YYYY-MM-DD')
        }
        return acc
      }, {})
      this.$emit('change', {
        selectedDates: dates
      })
    }
  },
  methods: {
    ...mapActions('reports/search', ['resetSearchParams']),
    onDatepickerChange(val) {
      this.date = val
    },
    openFlatpickr(e) {
      e.stopImmediatePropagation()
      this.$refs.flatpickr.flatpicker.open()
    },
    resetDate() {
      this.date = []
      this.resetSearchParams()
      this.$emit('control:reset-filters')
    }
  }
}
</script>

<style lang="stylus" scoped>

#report-datepicker {
  position: relative;
  .full-width {
    width: 100%;
    position: relative;
  }

  .date-search {
    padding-right: 0;
    width: calc(100% - 60px);
    margin-top: -5px;
    margin-bottom: -5px;

    flex-wrap: wrap;
    &__date-part {
      flex: 1;
      max-width: 150px;
      min-width: 100px;
      text-align: center;
      height: 32px;
      border: 1px solid $WFdarkGray;
      font-family: Aileron//'Nunito Sans', sans-serif;
      margin: 5px;
      border-radius: 3px;

      &:focus {
        outline: none;
      }
      &::placeholder {
        padding-left: 15px;
        text-align: left;
      }

    }
  }
  .reset-button {
    position: absolute;
    cursor: pointer;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    &:after {
      content: '';
      position: absolute;
      left: -12px;
      top: 5px;
      width: 1px;
      height: 19px;
      background: #d7d7d7;
    }

    button {
      background: transparent;
      border: 0;
      height: 26px;
      width: 26px;
      padding: 0;
      border-radius: 3px;
      background-color: #FFFFFF;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;

      svg {
        margin-right: 1px;
      }
    }
  }
}
</style>
