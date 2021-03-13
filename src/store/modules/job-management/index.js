import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import CalendarModule from './calendar'
import SidebarModule from '@/store/modules/sidebar/'
import TableModule from '@/store/modules/table/'
import FormModule from '@/store/modules/form/'
import SearchModule from '@/store/modules/search'

const state = {
  jobs: [],
  // jobRequest: [],
  // jobRequestId: null,
  meta: {},
  status: false,
  jobLocation: [],
  jobLog: null,
  clientLocations: [],
  reports: {
    data: [
      {
        job_id: 29,
        job_start_time: '2021-01-28 02:57:01',
        job_end_time: '2021-01-28 06:57:01',
        generation_date: '2021-03-11 12:04:32',
        external_ref: null,
        worker_name: 'Lourdes Von',
        client_name: 'Blick-Jerde',
        job_name: 'Technical Specialist',
        minutes: 240,
        payment_type: 1,
        unit: 'Hour',
        earnings: '71.16',
        margin: '153.20',
        bonus: '0.00',
        bonus_margin: '0.00',
        segments: [
          {
            day_time: 'Prva',
            date: '2021-03-05',
            hours: 2,
            rate: 10,
            margin: 0,
            earnings: 20
          },
          {
            day_time: 'Druga',
            date: '2021-03-05',
            hours: 24,
            rate: 0,
            margin: 0,
            earnings: 0
          }
        ]
      },
      {
        job_id: 30,
        job_start_time: '2021-01-27 21:57:01',
        job_end_time: '2021-01-28 08:57:01',
        generation_date: '2021-03-11 12:04:54',
        external_ref: null,
        worker_name: 'Lourdes Von',
        client_name: 'Blick-Jerde',
        job_name: 'Technical Specialist',
        minutes: 659,
        payment_type: 2,
        unit: 'Day',
        earnings: '195.39',
        margin: '420.67',
        bonus: '0.00',
        bonus_margin: '0.00',
        segments: [
          {
            day_time: '2021-03-05',
            date: '2021-03-05',
            hours: 24,
            rate: 0,
            margin: 0,
            earnings: 0
          }
        ]
      }
    ],
    meta: {
      pagination: {
        total: 2,
        count: 2,
        per_page: 15,
        current_page: 1,
        total_pages: 1,
        links: {}
      }
    },
    status_code: 200,
    errors: [],
    message: ''
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    sidebar: SidebarModule,
    calendar: CalendarModule,
    create: FormModule,
    edit: FormModule,
    table: TableModule,
    search: SearchModule
  }
}
