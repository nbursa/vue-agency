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
      .map
        .back(@click.stop="clearMarker", v-if="center !== jobMarkers[0]")
          svgicon.icon(
            name='agency-structure/reset-tool-active'
            :width="'35'"
            :height="'35'"
            :fill='false'
          )
        gmap-map(
          ref='mapRef'
          :options="{styles: style,zoomControl: true,mapTypeControl: false,scaleControl: false,streetViewControl: false, rotateControl: false,fullscreenControl: false,scrollwheel : false,minZoom: 5,maxZoom: 15, mapDataProviders:''}"
          :zoom='5'
          v-if="center.lat"
          :center='center'
          map-type-id='terrain'
          style='width: 100%; height: 455px;'
        )
          gmap-marker(
            v-if="clientMarker"
            :position="{lat: parseFloat(clientMarker.lat), lng: parseFloat(clientMarker.lng)}"
            :opacity="0.8"
            :icon="icon1"
          )
          gmap-marker(
            v-if="jobMarkers.length > 0"
            v-for="(marker, i) in jobMarkers" 
            :key="i"
            :position="{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}"
            :icon="icon2"
          )
      .list
        v-candidates-list(
          :location="jobLocation"
          @show:location="changeMapView"
        )
</template>

<script>
import VCandidatesList from "./VList"
import ClickOutside from "vue-click-outside"
import store from "@/store"
import mapCfg from "@/utils/googleMap.js"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { mapGetters, mapActions } from "vuex"
import { isEmpty } from "lodash"

export default {
  components: {
    VCandidatesList
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      style: mapCfg.styles,
      refresh: false,
      clientMarker: {},
      jobMarkers: [],
      center: {},
      icon1: require("@/assets/icons/mapmarker.svg"),
      icon2: require("@/assets/icons/mapmarker2.svg")
    }
  },
  computed: {
    ...mapGetters("modals", ["modalData"]),
    ...mapGetters("jobManagement", [
      "jobRequest",
      "clientLocations",
      "jobLocation"
    ])
  },
  async mounted() {
    let jobId = this.modalData.id
    let withLocation = true
    await this.fetchJobRequest({ jobId, withLocation })
    this.populateMap()
  },
  methods: {
    ...mapActions("modals", ["closeModal"]),
    ...mapActions("jobManagement", ["fetchJobRequest"]),
    changeMapView(location) {
      if(location.lat && location.lng) {
        this.clientMarker = location
        return this.center = location
      }
      const e = this.$merge(errorDefaults, {
        group: "foo",
        text: "Can't find candidate location!"
      })
      return this.$notify(e)
    },
    populateMap() {
      if (this.clientLocations) {
        if (Array.isArray(this.clientLocations)) {
          if(this.clientLocations.length > 1) {
            this.clientLocations.map(location => {
              this.setJobLocationMarker(location.lat, location.lng)
            })
          }
          this.setJobLocationMarker(this.clientLocations[0].lat, this.clientLocations[0].lng)
        }
        const lat = parseFloat(this.clientLocations.lat)
        const lng = parseFloat(this.clientLocations.lng)
        this.setJobLocationMarker(lat, lng)
      } else if (this.jobLocation && this.jobLocation.geoLocation) {
        this.setJobLocationMarker(this.jobLocation.geoLocation.latitude, this.jobLocation.geoLocation.longitude)
      } else if (this.modalData.geoLocation) {
        this.setJobLocationMarker(this.modalData.geoLocation.latitude, this.modalData.geoLocation.longitude)
      } else {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: "Can't find job location!"
        })
        this.$notify(e)
      }
      return this.center = this.jobMarkers[0]
    },
    setJobLocationMarker(lat, lng) {
      const includesMarker = this.jobMarkers.filter(item => {
        return item.lat === parseFloat(lat) && item.lng === parseFloat(lng)
      }).length > 0
      if (!includesMarker) {
        this.jobMarkers.push({
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        })
      }
    },
    clearMarker() {
      this.clientMarker = {}
      this.center = this.jobMarkers[0]
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~@/assets/styles/global/partials/modal';

.map {
  flex: 1;
  overflow: hidden;
  border-radius: 9px 0 0 9px;
  position: relative;

  .back {
    color: red;
    position: absolute;
    z-index: 100;
    cursor: pointer;

    .icon {
      color: #fff;
    }
  }
}

.list {
  flex: 1;
}

.modal-container {
  width: 822px;
  height: 455px;
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


