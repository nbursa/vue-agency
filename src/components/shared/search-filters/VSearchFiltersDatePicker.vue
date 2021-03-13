<template lang="pug">
  div.column.is-flex.date-search(:class="backgroundColor")
    div.date-search__search-dropdown
      c-dropdown.jump-to-date(:data="dropdownOptions" v-model="selectedDateInterval" @input="onDateSelect" :placeholder="options.placeholder ? $t(options.placeholder) : $t('global.date_interval')")
    div.row
      flatpickr(:options="config", v-model="date", @close="formatDate", ref="flatpickr", :showInternalInput=false, @change="onDatepickerChange")
      input.date-search__date-part(type="text" @click="openFlatpickr" v-model="startDate" :placeholder="datePlaceholder.from")
      input.date-search__date-part(type="text" @click="openFlatpickr" v-model="endDate" :placeholder="datePlaceholder.to")
</template>

<script>
import flatpickr from "@/components/shared/flat-pickr"
import "flatpickr/dist/flatpickr.css"
import CDropdown from "@/components/shared/dropdown/CDropdown.vue"
import { searchMixins } from "@/mixins/search.mixin"
import { format } from "date-fns"
import DateTimeUtils from "@/utils/dateUtils.js"

export default {
  components: {
    flatpickr,
    CDropdown
  },
  mixins: [searchMixins],
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: "is-gray"
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      resultTime: [],
      config: {
        mode: "range"
      },
      selected: "",
      dropdownOptions: this.options,
      clearDropdown: true,
      datePlaceholder: {
        from: this.$t("jobs.date_from"),
        to: this.$t("jobs.date_to")
      }
    }
  },
  computed: {
    startDate() {
      if (this.searchParams.dateFrom) {
        return DateTimeUtils.getDateFromSQL(this.searchParams.dateFrom)
      } else {
        return null
      }
    },
    endDate() {
      if (this.searchParams.dateTo) {
        return DateTimeUtils.getDateFromSQL(this.searchParams.dateTo)
      } else {
        return null
      }
    },
    date: {
      get() {
        return [this.searchParams.dateFrom, this.searchParams.dateTo]
      },
      set(val) {
        if (!Array.isArray(val)) {
          return
        }
        let startDate = val[0]
        let endDate = val[1]

        if (startDate && endDate) {
          this.updateSearch([
            {
              dateFrom: format(startDate, "YYYY-MM-DD")
            },
            {
              dateTo: format(endDate, "YYYY-MM-DD")
            },
            {
              dateInterval: this.selected
            }
          ])
        }
      }
    },
    selectedDateInterval: {
      get() {
        return this.searchParams.dateInterval
      },
      set(val) {
        this.selected = val
      }
    }
  },
  watch: {
    date: function(e) {
      if (this.clearDropdown === true) {
        this.selected = ""
      }
      this.clearDropdown = true
    }
  },
  methods: {
    onDateSelect() {
      let x = this.dropdownOptions.find(item => item.label === this.selected)
      this.clearDropdown = false
      let selectedDate = x.getDate()
      this.date = selectedDate
    },
    onDatepickerChange(val) {
      this.clearDropdown = true
      this.date = val
    },
    openFlatpickr(e) {
      e.stopImmediatePropagation() // After years of working , for some reason the input click event propagation triggers flatpicker's close event now, so we kill the propagation
      this.$refs.flatpickr.flatpicker.open()
    },
    formatDate(date, instance) {
      if (date.length === 2) {
        const tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
        const startTime = new Date(date[0] - tzoffset)
          .toISOString()
          .slice(0, 10)
        const endTime = new Date(date[1] - tzoffset).toISOString().slice(0, 10)
        this.resultTime = [startTime, endTime]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>


.date-search {
  justify-content: flex-end;
  align-items: center;
  padding-right: 0;
  &.is-gray {
    .date-search__date-part {
      background-color: #f2f4f5;
    }
  }
  &__date-part {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    width: 100px;
    height: 32px;
    border: 1px solid $WFdarkGray;
    font: 400 13.3333px Arial;

    &:focus {
      outline: none;
    }

    &:nth-child(2) {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border: 0;
    }

    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      margin-right: 48px;
      border-right: 0px;
      border-top: 0px;
      border-bottom: 0px;
    }
  }

  &__search-dropdown {
    max-width: 150px;
    width: 100%;
    margin-right: 10px;
  }
}
</style>
