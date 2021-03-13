import { startCase, snakeCase } from "lodash"
import { app } from "../../../main.js"


const labelSet = workers => {
  const labels = Object.keys(workers).reduce( (acc, key) => {
    if(key !== "total") {
      acc.push(app.$t( `dashboard.${snakeCase(key)}` ))
    }
    return acc
  },[])
  return labels
}

const chartDataSet = workers => {
  const data = Object.keys(workers).reduce( (acc , key) => {
    acc.push(workers[key])
    return acc
  },[])
  return data
}


export const getFormattedWorkers = state => {
  const labels = labelSet(state.workers)
  const data = chartDataSet(state.workers)

  const dataCollection = {
    totalCount: 100,
    labels: labels,
      datasets: [{
        backgroundColor: ["#2045C1", "#8A91B1", "#FB986C", "#6DCD6D", "#DC143C"],
        data: data
      }
    ]
  }

  return dataCollection
}

export const getFormattedClientWorkers = state => {
  const labels = [labelSet(state.workers)[0]]
  const data = [chartDataSet(state.workers)[0]]


  const dataCollection = {
    totalCount: 100,
    labels: labels,
      datasets: [{
        backgroundColor: ["#FB986C"],
        data: data
      }
    ]
  }

  return dataCollection
}