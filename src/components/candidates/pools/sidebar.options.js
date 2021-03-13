import VDefaultAction from './VDefaultAction'
import VEditPool from './VEditPool'
import VCreatePool from './VCreatePool'

let options = [
  {
    label: 'edit',
    component: VEditPool
  },
  {
    label: 'default',
    component: VDefaultAction
  },
  {
    label: 'create',
    component: VCreatePool
  }
]

export default options
