<template lang="pug">
.list__content
  .panel-content(@click="showLocation")
    .panel-content__field.field--id {{(location.id)}}
    .panel-content__field.field--name {{candidate}}
    .panel-content__field.field--jobstart {{startTime | nice-hours}}
    .panel-content__field.field--response-active {{startTime | nice-hours}}
    .panel-content__field.field--distance {{ distance }}
</template>

<script>
import { errorDefaults, successDefaults } from '@/config/notifications'
import { mapState } from 'vuex'

export default {
  filters: {
    distance(meters) {
      let km = meters / 1000
      return km.toFixed(1) + ' km'
    }
  },
  props: ['location'],
  computed: {
    ...mapState('agencies', ['agencies']),
    candidate() {
      if (this.location.user)
        return `${this.location.user.firstName + this.location.user.lastName}`
      return ''
    },
    startTime() {
      if (this.location.geoLocation) return this.location.geoLocation.createdAt
      return ''
    },
    distance() {
      if (this.location.geoLocation && this.agencies[0])
        return `${this.location.geoLocation.distance.toFixed(1)}${
          this.agencies[0].lengthUnit
        } `
      return ''
    }
  },
  methods: {
    showLocation() {
      let location = {
        lat: parseFloat(this.location.user.latitude),
        lng: parseFloat(this.location.user.longitude)
      }

      if (location.lat === null && location.lng === null) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          text: 'Location for this user not found.'
        })
        this.$notify(e)
      }
      this.$emit('location:show', location)
    }
  }
}
</script>

<style lang="stylus">
.panel-content {
  display: flex;
  border-radius: 5px;
  margin: 0.5em 0.2em;
  padding: 0.3em;
  min-height: 40px;

  &:hover {
    background-color: #C8DAE5;
    cursor: pointer;

    .field--id {
      color: #000;
    }
  }

  .panel-content__field {
    flex: auto;
    font-size: 14px;
    min-height: 30px;
    color: #202123;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .field--id {
    color: #989DA2;
    flex: 1;
  }

  .field--name {
    padding-left: 1em;
    flex: 2;
  }

  .field--jobstart {
    flex: 2;
  }

  .field--response {
    flex: 2;
  }

  .field--distance {
    flex: 2;
  }

  .field--response {
    &-active {
      background-color: #BDEEA7;
      border-radius: 3px;
    }

    &-inactive {
      background-color: #D0021B;
      border-radius: 3px;
      color: #fff;
    }
  }
}
</style>
