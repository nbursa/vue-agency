<template lang="pug">
.sidebar-form_field
    label.sidebar-form_label(:class="[activeLabel ? 'is-active' : '']") {{ label }}
    input.sidebar-form_input.is-fullwidth(
      autocomplete="on"
      ref="autocomplete"
      :value="value"
      type="type"
      @focus="updateVal"
      @blur="activeLabel = false"
      :disabled="disabled"
    )
    //.help.is-danger(v-if="getErrors.hasOwnProperty('name')") {{getErrors.name[0]}}
    .help.is-danger {{error}}
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ""
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    error: {
      type: String
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      activeLabel: false
    }
  },
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    )

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace()
      let ac = place.address_components
      let lat = place.geometry.location.lat()
      let lon = place.geometry.location.lng()
      let city = ac[0]["short_name"]

      console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`)
    })
  },
  methods: {
    updateVal(e) {
      console.log(e)
      this.$emit("input", e.target.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/right-sidebar';
</style>

<style lang="stylus">
@import '~@/assets/styles/global/partials/right-sidebar';
</style>


