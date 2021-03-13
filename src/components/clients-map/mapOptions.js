import mapCfg from "@/utils/googleMap.js"

export default {
  options: {
    styles: mapCfg.styles,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    scrollwheel: false,
    zoom: 15,
    mapDataProviders: ""
  },
  defaultCenter: {
    lat: 1,
    lng: 1
  },
  icons: {
    marker_icon: require("@/assets/icons/clients-flag.svg")
  },
  style: "width:100%; height: 100%",
  markerCallback: function(marker) {
    console.log("IV BEEN CALLED YAY", marker)
  }
}
