<template lang="pug">
  div
    header.shifts-header
      .checkbox-wrapper
        base-checkbox.shift-chekbox(:value="allCandidates" @input="selectAllCandidates")
      .headline-wrapper   
        h2.font-semi-bold {{ title }} ({{candidates.length}})  
      .search-wrapper(v-if="searchEnabled")
        search-input(:onSearch="onSearch")
      .time-send-text(v-if="groupSendTime.length > 0")
        h5 {{ $t('jobs_submit.group_send_time', { time: groupSendTime }) }}
    .shifts-list(v-if="!hideList")
      draggable(class="list-group" v-model="candidatesList" :options="{group: 'candidates'}" group="candidates" draggable=".candidate-item" )
        v-candidate-item.candidate-item(
          v-for="candidate in candidatesList" 
          :key="candidate.id" 
          :user="candidate"
          :selected="selectedCandidates.includes(candidate.id)"
          :onSelect="selectCandidate"
        )
        .add-to-group(
          v-if="candidatesList.length === 0 && !searchEnabled"
          slot="header"
          role="group")
          span {{$t('jobs_submit.select_candidates_empty_group')}}
</template>
<script>
import VCandidateItem from './VCandidateItem'
import SearchInput from './SearchInput'
import draggable from 'vuedraggable'
import { mapActions } from 'vuex'

export default {
  components: {
    VCandidateItem,
    SearchInput,
    draggable
  },
  props: {
    groupSendTime: {
      type: String,
      default: ''
    },
    drag: {
      type: Boolean,
      required: false,
      default: true
    },
    searchEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    onSearch: {
      type: Function,
      required: false,
      default: () => false
    },
    title: {
      type: String,
      required: true
    },
    onSelectCandidate: {
      type: Function,
      required: false,
      default: () => false
    },
    candidates: {
      type: [Object, Array],
      required: true
    },
    hideList: {
      type: Boolean,
      required: false,
      default: false
    },
    group: {
      type: Number,
      required: false,
      default: 0
    },
    selectable: {
      type: Boolean,
      required: false,
      default: true
    },
    overeiideSelectAll: {
      type: Function,
      required: false,
      default: () => false
    },
    preSelectedAll: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      allCandidates: this.preSelectedAll,
      selectedCandidates: []
    }
  },
  computed: {
    candidatesList: {
      get() {
        return this.candidates
      },
      set(value) {
        this.updateGroups({
          candidates: value,
          group: this.group
        })
      }
    }
  },
  watch: {
    preSelectedAll: function (val) {
      if (val === this.allCandidates) {
        this.allCandidates = !val
      }
      this.selectAllCandidates()
    },
    candidates: function (val) {
      this.allCandidates = !this.allCandidates
      this.selectAllCandidates()
    }
  },
  methods: {
    ...mapActions('_submitJob', ['updateGroups']),
    selectAllCandidates() {
      this.allCandidates = !this.allCandidates
      if (!this.selectable) {
        this.overeiideSelectAll(this.allCandidates)
        return
      }

      const type = this.allCandidates ? 'add' : 'remove'

      this.selectedCandidates = this.candidates.map((item) => {
        if (!this.selectedCandidates.includes(item.id) || type === 'remove')
          this.onSelectCandidate(item, type)
        return this.allCandidates ? item.id : null
      })

      if (!this.allCandidates) {
        this.selectedCandidates = []
      }
    },
    selectCandidate(candidate, type) {
      if (!this.selectable) return false
      if (type === 'add') {
        this.selectedCandidates.push(candidate.id)
      }

      if (type === 'remove')
        this.selectedCandidates = this.selectedCandidates.filter(
          (id) => id !== candidate.id
        )
      this.onSelectCandidate(candidate, type)
    }
  }
}
</script>
<style lang="stylus" scoped>
 .search-wrapper {
    margin-left: auto;
    order:2;
  }
.time-send-text {
  margin-left: auto;
  order:2;
  margin0right: 5px
  h5 {
    color: #888;
    font-size: 15px
  }
}
.add-to-group {
  background: #f2f2f2;
  height: 64px;
  align-items: center;
  align-self: center;
  align-content: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  span {
    color: #856ff9;
  }
}
</style>
