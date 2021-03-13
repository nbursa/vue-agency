const rateTypes = [
  {
    id: 0,
    name: 'agency_structure.rate_type_0',
    value: 0
  },
  {
    id: 1,
    name: 'agency_structure.rate_type_1',
    value: 1
  },
  {
    id: 2,
    name: 'agency_structure.rate_type_2',
    value: 2
  }
]

const marginTypes = [
  {
    id: 0,
    name: 'agency_structure.currency',
    value: 1
  },
  {
    id: 1,
    name: 'agency_structure.percentage',
    value: 2
  }
]

const dateFormats = [
  {
    id: 0,
    name: 'US (MM/DD/YYYY)',
    value: 'MM/dd/yyyy'
  },
  {
    id: 1,
    name: 'EU (DD.MM.YYYY.)',
    value: 'dd.MM.yyyy.'
  }
]

const timeFormats = [
  {
    id: 0,
    name: 'AM/PM',
    value: '12h'
  },
  {
    id: 1,
    name: 'agency_structure.time',
    value: '24h'
  }
]

export default {
  rateTypes,
  marginTypes,
  dateFormats,
  timeFormats
}
