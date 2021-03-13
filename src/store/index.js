import Vue from 'vue'
import Vuex from 'vuex'

// Import global actions, getters, mutations
import * as globalActions from './actions'
import * as globalGetters from './getters'
import * as globalMutations from './mutations'

// All modules that we use in application get imported down here
import dashboardModule from './modules/dashboard'
import jobManagementModule from './modules/job-management'
import userManagementModule from './modules/user-management'
import documentsModule from './modules/documents'
import * as onboardingModules from './modules/onboarding'
import shifts from './modules/billing/shifts'
import invoices from './modules/billing/invoices'
import jobTypesModule from './modules/onboarding/job-types'
import candidatesModule from './modules/candidates'
import candidateDocumentsModule from './modules/candidate-documents'
import candidateInactivityModule from './modules/candidate-inactivity'
import candidateWorklogModule from './modules/candidate-worklog'
import candidateActivityModule from './modules/candidate-activity'
import authModule from './modules/auth'
import usersModule from './modules/users'
import rolesModule from './modules/roles'
import jobTypeSelectorModule from './modules/job-type-selector'
import agenciesModule from './modules/agencies'
import clientsModule from './modules/clients'
import locationAdminsModule from './modules/location-admins'
import jobSubmissionModule from './modules/job-submission'
import attributesModule from './modules/attributes'
import gradesModule from './modules/grades'
import areasModule from './modules/areas'
import candidateValidModule from './modules/candidate-valid'
import currenciesModule from './modules/currencies'
import inspectDocuments from './modules/inspect-documents'
import modalsModule from './modules/modals'
import messagesModule from './modules/messages'
import ratesModule from './modules/rates'
import reportsModule from './modules/reports'
import notificationsModule from './modules/notifications'
import userUnavailiabilityModule from './modules/user-unavailability'
import dailyOverview from './modules/daily-overview'
import clientsMapModule from './modules/clients-map'
import candidateDetails from './modules/candidate-details'
import specialMarginsModule from './modules/special-margins'
import bonusesModule from './modules/bonuses'
import teamScheduleModule from './modules/team-schedule'
import clientScheduleModule from './modules/client-schedule'
import notesModule from './modules/notes'
import registrationModule from './modules/registration'
import subdomainsModule from './modules/subdomains'
import timesheetsModule from './modules/timesheets'
import smsRequestModule from './modules/sms-request'
import _scheduleJobMoudle from './modules/_schedule-job'
import _submitJobModule from './modules/_submit-job'
import candidatePoolsModule from './modules/candidate-pools'

import { caslPlugin, ability as appAbility } from './plugins/caslPlugin'
import { chatPlugin } from './plugins/chatPlugin'
import { notifyPlugin } from './plugins/notifyPlugin'
import { switchLangPlugin } from './plugins/switchLangPlugin'
import { notificationActionPlugin } from './plugins/notificationActionPlugin'
import { currencyPlugin } from './plugins/currencyPlugin'
import { localizationPlugin } from './plugins/localizationPlugin'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
Vue.config.debug = true

/* eslint-disable */
const debug = process.env.NODE_ENV !== 'production'
/* eslint-enable */

export const abilities = appAbility

export default new Vuex.Store({
  plugins:
    process.env.NODE_ENV === 'development'
      ? [
          caslPlugin,
          chatPlugin,
          notifyPlugin,
          switchLangPlugin,
          currencyPlugin,
          notificationActionPlugin,
          localizationPlugin
          // createLogger()
        ]
      : [
          caslPlugin,
          chatPlugin,
          notifyPlugin,
          switchLangPlugin,
          currencyPlugin,
          notificationActionPlugin,
          localizationPlugin
        ],
  state: {
    serverErrors: [],
    isLoading: false,
    lastLoadedId: null,
    search: '',
    layout: {},
    tabState: {
      active: {},
      type: null
    },
    storeInclude: {},
    localization: {}
  },

  actions: globalActions,
  getters: globalGetters,
  mutations: globalMutations,

  modules: {
    jobManagement: jobManagementModule,
    userManagement: userManagementModule,
    documents: documentsModule,
    candidateDocuments: candidateDocumentsModule,
    candidateInactivity: candidateInactivityModule,
    candidateActivity: candidateActivityModule,
    candidateWorklog: candidateWorklogModule,
    inspectDocuments: inspectDocuments,
    onboarding: {
      namespaced: true,
      modules: onboardingModules
    },
    candidatePools: candidatePoolsModule,
    candidateDetails: candidateDetails,
    dailyOverview: dailyOverview,
    shifts: shifts,
    invoices: invoices,
    rates: ratesModule,
    bonuses: bonusesModule,
    margins: specialMarginsModule,
    notes: notesModule,
    dashboard: dashboardModule,
    jobTypes: jobTypesModule,
    candidates: candidatesModule,
    auth: authModule,
    users: usersModule,
    roles: rolesModule,
    jobTypeSelector: jobTypeSelectorModule,
    agencies: agenciesModule,
    clients: clientsModule,
    clientsMap: clientsMapModule,
    locationAdmins: locationAdminsModule,
    jobSubmission: jobSubmissionModule,
    attributes: attributesModule,
    grades: gradesModule,
    areas: areasModule,
    modals: modalsModule,
    messages: messagesModule,
    reports: reportsModule,
    notifications: notificationsModule,
    candidateValid: candidateValidModule,
    userUnavailiability: userUnavailiabilityModule,
    currencies: currenciesModule,
    clientSchedule: clientScheduleModule,
    teamSchedule: teamScheduleModule,
    registration: registrationModule,
    subdomains: subdomainsModule,
    timesheets: timesheetsModule,
    smsRequest: smsRequestModule,
    _scheduleJob: _scheduleJobMoudle,
    _submitJob: _submitJobModule
  },
  strict: debug
})
