<template lang="pug">
  div.map__full-height-cont
    gmap-map(
      ref='mapRef'
      :options="mapConfig.options"
      :center="mapConfig.defaultCenter"
      :style='mapConfig.style'
    )
      gmap-info-window(:options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false")
        div
          p
            span
              strong Name:
              | {{infoContent.name}}
          p(v-for="(adr, i) in infoContent.address" v-if="adr !== ''" style="margin-top: 5px")
            span
              strong Address {{i + 1}}:
              | {{ adr }}
      gmap-marker(
        v-if="mapData.length > 0"
        v-for="(marker, index) in mapData"
        :key="index"
        :position="marker.position",
        :clickable="true"
        @click="toggleInfoWindow(marker,index)"
        :icon="setMarkerIcon(mapConfig.icons.marker_icon)"
      )

</template>

<script>
import mapCfg from "@/utils/googleMap.js"
import { gmapApi } from "vue2-google-maps"

import markerWithLabel from "./VMarkerWithLabel"

export default {
  components: {
    markerWithLabel
  },
  props: {
    mapConfig: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    selected: {
      type: [Number, Object],
      reqired: false,
      default() {
        return null
      }
    },
    mapData: {
      type: [Array, Object],
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      style: mapCfg.styles,
      infoContent: "",
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  computed: {
    gmapApi: gmapApi
  },
  watch: {
    mapData: {
      handler: "fitMarkersToBounds"
    },
    selected: {
      handler: function(newValue) {
        if (newValue === null) {
          return
        }
        this.panToMarker(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.fitMarkersToBounds(this.mapData)
  },
  methods: {
    fitMarkersToBounds(arr) {

      //skip bounding map when only one marker present
      if(arr.length <= 1) return

      this.infoWinOpen = false
      this.$refs.mapRef.$mapPromise.then(map => {
        const bounds = new this.gmapApi.maps.LatLngBounds()
        const markers = arr
        markers.forEach(marker => {
          bounds.extend(marker.position)
        })
        map.fitBounds(bounds)
      })
    },
    panToMarker(marker) {
      console.log("thisthing", marker)
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(marker.position)
        map.setZoom(15)
        map.zoom = 15
        console.log(map)
      })
    },
    setMarkerIcon(url) {
      return { url: url, labelOrigin: new this.gmapApi.maps.Point(0, -20) }
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = { name: marker.name, address: marker.address }
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.map__full-height-cont
  height 100%

</style>
