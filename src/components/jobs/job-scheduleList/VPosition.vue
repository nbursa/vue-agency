<template lang="pug">
span
  span(v-if="!hasGeolocation && !isInProgress" style="margin: 0 auto") --

  a.location(@click.stop="openLocationModal(options)" v-else-if="isAccepted")
    svgicon(name="position/position-accepted" style="margin: 0 10px 2px 0" :fill="true" ref="svgicon" :original="true")
    | {{ options.geoLocation.updatedAt | nice-hours }} {{ distance }}

  span.location(@click.stop="" v-else-if="isRejected")
    svgicon(name="position/position-rejected" style="margin: 0 10px 2px 0" :fill="true" ref="svgicon" :original="true")
    | {{ options.geoLocation.updatedAt | nice-hours }} {{ distance }}

  span(@click.stop="" v-else)
    svgicon(name="position/position-pending" style="margin: 0 10px 2px 0" :fill="true" ref="svgicon" :original="true")
    | --
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import '@/compiled-icons/position'
import DateTimeUtils from '@/utils/dateUtils'

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('agencies', ['agencies']),
    hasGeolocation: function () {
      return this.options.geoLocation ? true : false
    },
    isAccepted: function () {
      return this.options.geoLocation &&
        this.options.geoLocation.isRejected === false
        ? true
        : false
    },
    isRejected: function () {
      return this.options.geoLocation && this.options.geoLocation.isRejected
        ? true
        : false
    },
    isInProgress: function () {
      return this.options.status.id === 5 ? true : false
    },
    distance: function () {
      return this.hasGeolocation && this.agencies[0].lengthUnit
        ? `${this.options.geoLocation.distance.toFixed(1)}${
            this.agencies[0].lengthUnit
          }`
        : ''
    }
  },
  methods: {
    ...mapGetters('modals', ['showModal']),
    ...mapActions('modals', ['toggleModal', 'setModalComponent']),
    openLocationModal(options) {
      this.setModalComponent({
        modalComponent: 'location',
        modalData: { ...options }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.location
  display flex
  align-items center
</style>
