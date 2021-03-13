import * as jobTypesRepository from "./repository.js"
import Vue from "vue"
import * as CacheTimer from "./fetchingTimer"

export const addSiblingNode = function({ commit }, id) {
  commit("ADD_SIBLING_NODE", id)
}

export const destroyNode = function({ commit }, node) {
  jobTypesRepository
    .destroy(node.id)
    .then(res => {
      commit("DESTROY_NODE", node)
    })
    .catch(e => {
      if (e.data.errors.error) {
        alert(e.data.errors.error)
      } else {
        console.log(e.data)
      }
    })
}

export const getJobTypesWithChildren = ({ commit }) => {
  commit("FETCHING_START")
  return jobTypesRepository
    .getAllWithChildren()
    .then(jobTypes => {
      commit("FETCHING_END")
      commit("SET_JOB_TYPES", jobTypes)
    })
    .catch(e => {
      commit("FETCHING_END")
      console.log(e)
    })
}

export const getJobTypes = ({ commit }, parentId) => {
  commit("FETCHING_START")
  if (!parentId) {
    CacheTimer.reset()
  }

  if (CacheTimer.hasCache(parentId)) {
    commit("FETCHING_END")
    return
  }

  return jobTypesRepository
    .getAll(parentId)
    .then(jobTypes => {
      CacheTimer.addItem(parentId)
      if (parentId) {
        commit("CHILD_NODES_UPDATED", {
          parentId: parentId,
          children: jobTypes.children
        })
      } else {
        commit("JOB_TYPES_CREATED", jobTypes)
      }
      commit("FETCHING_END")
    })
    .catch(errData => {
      commit("FETCHING_END")
      if (errData.message) {
        $logger.darkgoldenrod(`Server message: ${errData.message}`, {
          groupAs: "Repo (getJobTypes)"
        })
      }
    })
}

export const clearCache = () => {
  CacheTimer.reset()
}

export const saveJobType = ({ commit }, jobType) => {
  if (jobType.name === "") {
    return
  }

  if (jobType.parentId == -1 || jobType.parentId == 0) {
    Vue.delete(jobType, "parentId")
  }

  jobTypesRepository
    .save(jobType)
    .then(res => {
      commit("ADD_CHILD_NODE", res.data.data)
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateNode = ({ commit }, node) => {
  jobTypesRepository
    .update(node)
    .then(response => {
      commit("NODE_UPDATED", {
        id: node.id,
        name: node.name
      })
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateLevels = async ({ commit }, payload) => {
  // console.log('payload updateLevels', payload)
  try {
    await jobTypesRepository.bulkUpdate(payload)
    commit("BULK_UPDATE_LIST", payload.nodes)
  } catch (e) {
    logError("Jobs levels failed to update.", e)
  }
}
