import Vue from 'vue'
import App from './layouts/default.vue'
import router from './router'
import store from './store'
import i18n from '@/lang/lang'
import { beforeEachHook } from './hooks/beforeEach'
import './components/shared/base-components/globals'
import { addIncludes } from '@/mixins/addIncludesMixin'

import { abilitiesPlugin } from '@casl/vue'
import { abilities } from './store'
import { Can } from '@casl/vue'

import { GeneralHelpers } from '@/plugins'

import VueIntercom from 'vue-intercom'
Vue.use(VueIntercom, { appId: 'bbw9tmmo' })

Vue.use(GeneralHelpers)

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCoi6y8Spx9tdJN6l3vmfDNCrF2M0DPZhg',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

Vue.mixin(addIncludes)

import Vuebar from 'vuebar'
Vue.use(Vuebar)

import { log } from './utils/debugging'

import Notifications from 'vue-notification'
Vue.use(Notifications)

import { VueExtendLayout, layout } from 'vue-extend-layout'
Vue.use(VueExtendLayout)

import VTooltip from 'v-tooltip'
require('./assets/styles/global/tooltip.scss')
const vTooltipOptions = { defaultTrigger: 'hover' }
VTooltip.enabled = window.screen.width > 1030
Vue.use(VTooltip)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  inject: false,
  events: 'change'
})
/*
 * Expose $logger on instance and globally
 * console.log() on steroids
 */
Vue.prototype.$logger = log
window.$logger = log

/*
 * Global language map
 */
Vue.prototype.$langMap = {
  en: {
    name: 'English',
    locale: 'en-GB'
  },
  de: {
    name: 'German',
    locale: 'de-De'
  }
}

Vue.prototype.$colorMap = {
  "primary": '#856ff9',
  "sideNav": '#ffffff',
  "iconGray": '#888888'
}

Vue.prototype.$currency = {}

Vue.prototype.$localization = {}

router.beforeEach(beforeEachHook)

/* Custom filter set */
import { CustomFilters } from './filters'
Vue.use(CustomFilters)

/* Svg icon map loader */
import VueSVGIcon from 'vue-svgicon'
Vue.use(VueSVGIcon)

/* Vue select2 */
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

/* Vue CASL integration */
Vue.use(abilitiesPlugin, abilities)
Vue.component('Can', Can)

const app = new Vue({
  router,
  store,
  i18n,
  ...layout,
  render: (h) => h(App)
}).$mount('#app')

export { app }
