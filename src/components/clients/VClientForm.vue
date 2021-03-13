<template lang="pug">
div
  h2.sidebar-overflow__title(v-if="nodeTitle") {{ nodeTitle }}
  form.sidebar-form
    span.error-from-back(v-if="errorsFromBack.error") City: {{ errorsFromBack.error }}
    .sidebar-form_field(style="overflow:visible;")
      v-area-selector(
        v-model="area",
        :isMultiple="multipleAreas",
        :isClearable="multipleAreas",
        :label="$t('client_locations_sidebar.area')",
        :error="errorsFromBack.areaId ? errorsFromBack.areaId[0] : ''"
      )
    .sidebar-form_field(style="overflow:visible;")
      v-agency-selector(
        :label="$t('candidates.drawer_filter_branch')",
        v-model="selectedAgencies",
        valueConsistsOf="ALL"
        :error="errorsFromBack.agencies ? errorsFromBack.agencies[0] : ''"
      )

    v-sidebar-input(
      v-model.trim="name",
      type="text",
      :label="$t('client_locations_sidebar.name')",
      :error="errorsFromBack.name ? errorsFromBack.name[0] : ''"
    )

    v-sidebar-input(
      v-model.trim="externalClientId",
      type="text",
      :label="$t('client_locations_sidebar.external_client_id')",
      :error="errorsFromBack.external_client_id ? errorsFromBack.external_client_id[0] : ''"
    )

    v-sidebar-input(
      v-model.trim="address_1",
      type="text",
      :label="$t('client_locations_sidebar.address')",
      :error="errorsFromBack.address_1 ? errorsFromBack.address_1[0] : ''"
    )

    v-sidebar-input(
      v-model.trim="city",
      type="text",
      :label="$t('client_locations_sidebar.city')",
      :error="errorsFromBack.city ? errorsFromBack.city[0] : locationError ? locationError : '' || errorsFromBack.latitude ? errorsFromBack.latitude[0] : '' || errorsFromBack.longitude ? errorsFromBack.longitude[0] : ''"
    )

    v-sidebar-input(
      v-model="postCode",
      type="text",
      :label="$t('client_locations_sidebar.postcode')",
      :error="errorsFromBack.postCode ? errorsFromBack.postCode[0] : ''"
    )

    v-sidebar-input(
      v-model="landlineNumber",
      type="number",
      :label="$t('client_locations_sidebar.landline')",
      :error="errorsFromBack.landlineNumber ? errorsFromBack.landlineNumber[0] : ''"
    )

    v-sidebar-input(
      v-model="mobileNumber",
      type="number",
      :label="$t('client_locations_sidebar.mobile')",
      :error="errorsFromBack.mobileNumber ? errorsFromBack.mobileNumber[0] : ''"
    )

    v-sidebar-input(
      v-model="email",
      type="email",
      :label="$t('client_locations_sidebar.email')",
      :error="errorsFromBack.email ? errorsFromBack.email[0] : ''"
    )

    v-sidebar-input(
      v-model="website",
      type="url",
      :label="$t('client_locations_sidebar.website')",
      :error="errorsFromBack.website ? errorsFromBack.website[0] : ''"
    )
    

    //- hourly
    div(v-if="agencyRateDefaults.rateType === 0 || agencyRateDefaults.rateType === 1")
      v-sidebar-input(
        v-model="selectedHourlyRate",
        type="number",
        :placeholder="`${agencyRateDefaults.defaultHourlyRate} (${$t('agency_structure.agency_default')})`"
        :label="$t('agency_structure.hourly_rate')",
        :error="errorsFromBack.hourlyRate ? errorsFromBack.hourlyRate[0] : ''"
      )

      .sidebar-form_field(style="overflow:visible;")
        base-sidebar-tree-select(
          :label="$t('agency_structure.agency_margin_label_hourly')",
          v-model="selectedHourlyMarginType"
          :items="marginTypes"
          :isMultiple="false",
          :isClearable="true",
          :placeholder="`${agencyRateDefaults.defaultHourlyMarginType} (${$t('agency_structure.agency_default')})`"
          :error="errorsFromBack.hourlyMarginType ? errorsFromBack.hourlyMarginType[0] : ''" 
        )

      v-sidebar-input(
        v-model="selectedHourlyMargin",
        type="number",
        :placeholder="`${agencyRateDefaults.defaultHourlyMargin} (${$t('agency_structure.agency_default')})`"
        :label="$t('agency_structure.hourly_margin')",
        :error="errorsFromBack.hourlyMargin ? errorsFromBack.hourlyMargin[0] : ''"
      )

    //- daily
    div(v-if="agencyRateDefaults.rateType === 0 || agencyRateDefaults.rateType === 2")
      v-sidebar-input(
        v-model="selectedDailyRate",
        type="number",
        :placeholder="`${agencyRateDefaults.defaultDailyRate} (${$t('agency_structure.agency_default')})`"
        :label="$t('agency_structure.daily_rate')",
        :error="errorsFromBack.dailyRate ? errorsFromBack.dailyRate[0] : ''"
      )

      .sidebar-form_field(style="overflow:visible;")
        base-sidebar-tree-select(
          :label="$t('agency_structure.agency_margin_label_daily')",
          v-model="selectedDailyMarginType"
          :items="marginTypes"
          :isMultiple="false",
          :isClearable="true",
          :placeholder="`${agencyRateDefaults.defaultDailyMarginType} (${$t('agency_structure.agency_default')})`"
          :error="errorsFromBack.dailyMarginType ? errorsFromBack.dailyMarginType[0] : ''" 
        )

      v-sidebar-input(
        v-model="selectedDailyMargin",
        type="number",
        :placeholder="`${agencyRateDefaults.defaultDailyMargin} (${$t('agency_structure.agency_default')})`"
        :label="$t('agency_structure.daily_margin')",
        :error="errorsFromBack.dailyMargin ? errorsFromBack.dailyMargin[0] : ''"
      )


    v-sidebar-checkbox(
      :label="$t('client_locations_sidebar.enable_send_email_sign_off_confirmation_to_client')",
      :value="signOffConfirmationMethod",
      @input="signOffConfirmationMethodSetter($event, 'emailConfirmations')"
    )
    v-sidebar-checkbox(
      :label="$t('client_locations_sidebar.enable_signoff_pin')",
      :value="notificationMethods.pin",
      @input="notificationMethodSetter($event, 'pin')"
    )
    v-sidebar-checkbox(
      :label="$t('client_locations_sidebar.enable_signoff_signature')",
      :value="notificationMethods.signature",
      @input="notificationMethodSetter($event, 'signature')"
    )
    v-sidebar-checkbox(
      :label="$t('client_locations_sidebar.enable_signoff_notification')",
      :value="notificationMethods.notification",
      @input="notificationMethodSetter($event, 'notification')"
    )

    v-sidebar-checkbox(
      :label="$t('client_locations_sidebar.copy_message')",
      v-model="copyAddress"
    )

    v-sidebar-checkbox(
      v-if="this.client.parentId",
      :label="$t('client_locations_sidebar.copy_message_parent')",
      v-model="copyParent"
    )
    .border-line
    div
      .sidebar-form_field
        label.is-size-5 {{ $t('client_locations_sidebar.billing_address') }}

      v-sidebar-input(
        v-model.trim="billingAddress_1",
        type="text",
        :label="$t('client_locations_sidebar.address')",
        :error="errorsFromBack.hasOwnProperty('billingAddress_1') ? errorsFromBack.billingAddress_1[0] : ''"
      )

      v-sidebar-input(
        v-model.trim="billingCity",
        type="text",
        :label="$t('client_locations_sidebar.city')",
        :error="errorsFromBack.hasOwnProperty('billingCity') ? errorsFromBack.billingCity[0] : ''"
      )

      v-sidebar-input(
        v-model="billingPostcode",
        type="text",
        :label="$t('client_locations_sidebar.postcode')",
        :error="errorsFromBack.hasOwnProperty('billingPostcode') ? errorsFromBack.billingPostcode[0] : ''"
      )

  .sidebar-footer
    span(v-if="$i18n.locale === 'en'") {{ $t(`client_locations_sidebar.${action}`) }} {{ $t('client_locations_sidebar.client') }}?
    span(v-else) {{ $t('client_locations_sidebar.client') }} {{ $t(`client_locations_sidebar.${action}`) }}?
    .is-pulled-right
      a.button.is-cancelled(@click.prevent="onCancel") {{ $t('client_locations_sidebar.button_cancel') }}
      base-button(@click="onSave", customClass="is-small") {{ action === 'edit' ? $t('global.save') : $t(`client_locations_sidebar.${action}`) }}
</template>

<script>
import VSidebarLocationAutocomplete from '@/components/shared/sidebar-form/VSidebarLocationAutocomplete'
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import VSidebarCheckbox from '@/components/shared/sidebar-form/VSidebarCheckbox'
import VSidebarSwitch from '@/components/shared/sidebar-form/VSidebarSwitch'
import VAreaSelector from '@/components/shared/area-selector/VAreaSelector'
import VAgencySelector from '@/components/shared/agency-selector/VAgencySelector'
import { mapActions, mapState, mapGetters } from 'vuex'
import { translateArray } from '@/utils/general'
import staticAgencyTypes from '@/config/staticAgencyTypes'

export default {
  components: {
    VSidebarInput,
    VAreaSelector,
    VSidebarSwitch,
    VSidebarCheckbox,
    VSidebarLocationAutocomplete,
    VAgencySelector
  },
  filters: {
    uppercase: function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  props: {
    client: {
      required: true,
      type: Object
    },
    updateFn: {
      type: Function,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    errorsFromBack: {
      type: Object,
      required: true
    },
    nodeTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      locationError: '',
      multipleAreas: false,
      showBilling: false,
      showLocations: false,
      copyAddress: false,
      copyParent: false,
      marginTypes: translateArray(staticAgencyTypes.marginTypes, 'name'),
      notificationMethodsInternal: {
        pin: false,
        notification: false,
        signature: false
      }
    }
  },
  computed: {
    ...mapGetters('clients/create', ['getErrors']),
    ...mapState('agencies', ['agencies']),

    agencyRateDefaults() {
      if (this.agencies.length) {
        return {
          rateType: this.agencies[0].rateType,
          defaultHourlyMargin: this.agencies[0].hourlyMargin,
          defaultHourlyMarginType: this.marginTypes.find(
            (item) => item.value == this.agencies[0].hourlyMarginType
          ).name,
          defaultDailyMargin: this.agencies[0].dailyMargin,
          defaultDailyMarginType: this.marginTypes.find(
            (item) => item.value == this.agencies[0].dailyMarginType
          ).name,
          defaultHourlyRate: this.agencies[0].hourlyRate,
          defaultDailyRate: this.agencies[0].dailyRate
        }
      }
      return null
    },
    selectedHourlyRate: {
      get() {
        return this.client.hourlyRate
      },
      set(value) {
        this.updateFn({
          name: 'hourlyRate',
          value: value ? Number(value) : null
        })
      }
    },

    selectedHourlyMargin: {
      get() {
        return this.client.hourlyMargin
      },
      set(value) {
        this.updateFn({
          name: 'hourlyMargin',
          value: value ? Number(value) : null
        })
      }
    },

    selectedHourlyMarginType: {
      get() {
        return this.client.hourlyMarginType
          ? this.marginTypes.find(
              (item) => item.value === this.client.hourlyMarginType
            )
          : null
      },
      set(value) {
        this.updateFn({
          name: 'hourlyMarginType',
          value: value ? value.value : null
        })
      }
    },

    selectedDailyRate: {
      get() {
        return this.client.dailyRate
      },
      set(value) {
        this.updateFn({
          name: 'dailyRate',
          value: value ? Number(value) : null
        })
      }
    },

    selectedDailyMargin: {
      get() {
        return this.client.dailyMargin
      },
      set(value) {
        this.updateFn({
          name: 'dailyMargin',
          value: value ? Number(value) : null
        })
      }
    },

    selectedDailyMarginType: {
      get() {
        return this.client.dailyMarginType
          ? this.marginTypes.find(
              (item) => item.value === this.client.dailyMarginType
            )
          : null
      },
      set(value) {
        this.updateFn({
          name: 'dailyMarginType',
          value: value ? value.value : null
        })
      }
    },

    selectedAgencies: {
      get() {
        return this.client.agencies ? this.client.agencies : []
      },
      set(value) {
        this.updateFn({
          name: 'agencies',
          value: value
        })
      }
    },
    name: {
      get() {
        return this.client.name ? this.client.name : ''
      },
      set(value) {
        this.updateFn({
          name: 'name',
          value: value
        })
      }
    },
    area: {
      get() {
        return this.client.area
      },
      set(value) {
        this.updateFn({
          name: 'area',
          value: value
        })

        this.updateFn({
          name: 'areaId',
          value: value.id
        })
      }
    },
    city: {
      get() {
        return this.client.city ? this.client.city : ''
      },
      set(value) {
        this.updateFn({
          name: 'city',
          value: value
        })
      }
    },
    address_1: {
      get() {
        return this.client.address_1 ? this.client.address_1 : ''
      },
      set(value) {
        this.updateFn({
          name: 'address_1',
          value: value
        })
      }
    },
    notificationMethods: {
      get() {
        return this.client.signOffMethods
          ? {
              notification: this.client.signOffMethods.includes(1),
              pin: this.client.signOffMethods.includes(2),
              signature: this.client.signOffMethods.includes(3)
            }
          : this.notificationMethodsInternal
      }
    },

    postCode: {
      get() {
        return this.client.postcode ? this.client.postcode : ''
      },
      set(value) {
        this.updateFn({
          name: 'postcode',
          value: value
        })
      }
    },
    landlineNumber: {
      get() {
        return this.client.landline ? this.client.landline : ''
      },
      set(value) {
        this.updateFn({
          name: 'landline',
          value: value
        })
      }
    },
    mobileNumber: {
      get() {
        return this.client.mobile ? this.client.mobile : ''
      },
      set(value) {
        this.updateFn({
          name: 'mobile',
          value: value
        })
      }
    },
    email: {
      get() {
        return this.client.email ? this.client.email : ''
      },
      set(value) {
        this.updateFn({
          name: 'email',
          value: value
        })
      }
    },
    website: {
      get() {
        return this.client.website ? this.client.website : ''
      },
      set(value) {
        this.updateFn({
          name: 'website',
          value: value
        })
      }
    },
    billingCity: {
      get() {
        return this.client.billingCity ? this.client.billingCity : ''
      },
      set(value) {
        this.updateFn({
          name: 'billingCity',
          value: value
        })
      }
    },
    billingAddress_1: {
      get() {
        return this.client.billingAddress_1 ? this.client.billingAddress_1 : ''
      },
      set(value) {
        this.updateFn({
          name: 'billingAddress_1',
          value: value
        })
      }
    },

    billingPostcode: {
      get() {
        return this.client.billingPostcode ? this.client.billingPostcode : ''
      },
      set(value) {
        this.updateFn({
          name: 'billingPostcode',
          value: value
        })
      }
    },
    latitude: {
      get() {
        return this.client.latitude ? this.client.latitude : 0
      },
      set(value) {
        this.updateFn({
          name: 'latitude',
          value: value
        })
      }
    },
    longitude: {
      get() {
        return this.client.longitude ? this.client.longitude : 0
      },
      set(value) {
        this.updateFn({
          name: 'longitude',
          value: value
        })
      }
    },
    externalClientId: {
      get() {
        return this.client.externalClientId ? this.client.externalClientId : ''
      },
      set(value) {
        this.updateFn({
          name: 'externalClientId',
          value: value
        })
      }
    },
    signOffConfirmationMethod: {
      get() {
        return this.client.isTimesheetNotificationEnabled
          ? this.client.isTimesheetNotificationEnabled
          : false
      }
    }
  },
  watch: {
    client() {
      this.copyAddress = false
      this.copyParent = false
    },
    copyAddress(newVal) {
      if (newVal) {
        this.billingCity = this.city
        this.billingAddress_1 = this.address_1
        // this.billingAddress_2 = this.address_2
        this.billingPostcode = this.postCode
      } else {
        this.billingCity = ''
        this.billingAddress_1 = ''
        // this.billingAddress_2 = ""
        this.billingPostcode = ''
      }
    },
    copyParent(newVal) {
      if (newVal) {
        this.getClientParent(this.client.parentId).then((client) => {
          let {
            address_1,
            // address_2,
            area,
            city,
            name,
            postcode,
            billingAddress_1,
            // billingAddress_2,
            billingCity,
            billingPostcode
          } = client
          this.name = name
          this.address_1 = address_1
          // this.address_2 = address_2
          this.area = area
          this.city = city
          this.postCode = postcode
          this.billingAddress_1 = billingAddress_1
          // this.billingAddress_2 = billingAddress_2
          this.billingCity = billingCity
          this.billingPostcode = billingPostcode
        })
      } else {
        this.name = ''
        this.address_1 = ''
        // this.address_2 = ""
        this.area = ''
        this.city = ''
        this.postCode = ''
        this.billingAddress_1 = ''
        // this.billingAddress_2 = ""
        this.billingCity = ''
        this.billingPostcode = ''
      }
    }
  },
  methods: {
    ...mapActions('clients', ['getClientParent', 'getGeolocation']),
    ...mapActions('clients/create', ['setErrors']),
    onSave() {
      let address = this.address_1 + ',' + this.city + ',' + this.postCode
      this.getGeolocation(address)
        .then((response) => {
          if (response[0].geometry.location.lat) {
            this.updateFn({
              name: 'latitude',
              value: response[0].geometry.location.lat
            })
          }
          if (response[0].geometry.location.lng) {
            this.updateFn({
              name: 'longitude',
              value: response[0].geometry.location.lng
            })
          }
          if (this.longitude != '' && this.latitude != '') {
            this.$emit('form:save')
          }
        })
        .catch(() => {
          this.locationError = this.$t(
            'client_locations_sidebar.toast_error_title'
          )
        })
    },
    notificationMethodSetter(val, name) {
      // 1 - notification
      // 2 - PIN
      // 3 - Signature
      let valMap = {
        notification: 1,
        pin: 2,
        signature: 3
      }
      let oldVal = this.client.signOffMethods || []
      let newVal = val
        ? [...oldVal, valMap[name]]
        : [...oldVal].filter((item) => item !== valMap[name])
      this.updateFn({
        name: 'signOffMethods',
        value: newVal
      })
    },
    onCancel() {
      this.$emit('form:cancel')
    },
    normalizer: (obj) => {
      return {
        id: obj.id,
        label: obj.name,
        abr: obj.abbreviation
      }
    },
    signOffConfirmationMethodSetter(val) {
      this.updateFn({
        name: 'isTimesheetNotificationEnabled',
        value: val
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.sidebar-overflow {
  &__title {
    font-size: 18px;
    color: #202123;
    padding: 0 15px;
    border-bottom: 1px solid #EAEAEA;
    height: 60px;
    display: flex;
    align-items: center;
  }
}

.sidebar-form {
  overflow: visible;
  margin-top: 0;

  .error-from-back {
    color: red;
    position: relative;
    width: 70%;
    height: 15px;
    display: block;
    float: right;
    text-align: right;
    margin: 0 20px 20px 0;
    font-size: 12px;
  }

  &_field .help {
    width: 100%;
  }
}
</style>
