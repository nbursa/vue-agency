<template lang="pug">
  div.pool-form
    div
      form.sidebar-form(@submit.prevent="")
        .pool-form__pool-list-margin
        p.title {{$t('candidate_pool.selected_pool')}}
        .pool-form__pool-name
          v-sidebar-input.clear(
            v-model="name"
            :label="$t('candidate_pool.filter_pool_name')"
            :error="errorsFromBack.hasOwnProperty('name') ? errorsFromBack.firstName[0] : ''"
          )
          div(style="clear:both")

        div.pool-form__pool-list
        p.title {{$t('candidate_pool.filter_candidates')}}
        .pool-form__pool-name
            
          .sidebar-form_field(style="overflow:visible;")
            agency-selector(
              :label="$t('candidates.drawer_filter_branch')"
              v-model="agencies"
              :isMultiple="false"
              :isClearable="true"
            )

          .sidebar-form_field(style="overflow:visible;")
            v-attribute-selector(
              v-model="attributes"
              :isMultiple="false"
              :isClearable="true"
              :label="$t('candidates_sidebar.attributes')"
            )
          
          .sidebar-form_field(style="overflow:visible;")
            v-job-selector(
              v-model="jobType"
              :disableBranchNodes="false"
              :isMultiple="false"
              :isClearable="true"
              :label="$t('candidates.drawer_filter_job')"
            )
          
          .sidebar-form_field(style="overflow:visible;")
            grade-selector(
              :value="selectedGrade"
              @input="gradeSelect"
              :isMultiple="false"
              :isClearable="true"
              :label="$t('candidate_pool.drawer_filter_grade')"
            )

          .sidebar-form_field(style="overflow:visible;")
            div
              label.search-name-label(for="candidateName") {{$t('candidate_pool.candidate_name')}}
              input#candidateName.search-name-input(
                v-model="candidateName"
                @keyup.enter="filterCandidates"
              )

          div(style="clear:both")
          .pool-form__filter
              base-button.is-fullwidth.space-top(@click="filterCandidates")
                span {{ $t("candidate_pool.find_candidates") }}
                half-circle-spinner.spinner(
                  v-show="status"
                  class="spinner"
                  :animation-duration="1800"
                  :size="30"
                  color="#ffffff"
                )
                div(style="clear:both")
          

              p.text {{$t('candidate_pool.candidates_search_results')}} {{candidates.length}}
          div(style="clear:both")
          .pool-form__candidate-list
            div(v-if="filteredCandidates" v-for="candidate in filteredCandidates")
              v-pool-candidate(
                :candidate="candidate"
                @pool-candidate:add="addCandidate"
              )

          div(style="clear:both")

          .pool-form__pool-list
            p.title {{$t('candidate_pool.candidates_in_this_pool')}}
            p.text {{$t('candidate_pool.number_of_candidates')}} {{pool.users.length}}
            div(v-for="user in pool.users")
              v-pool-candidate(
                :candidate="user"
                @pool-candidate:remove="removeCandidate"
                action="remove"
              )

          .sidebar-footer
            span {{ $t(`global.${action}`) }} {{ $t("candidate_pool.pool") }}
            .is-pulled-right
              a.button.is-cancelled(@click.prevent="onCancel") {{ $t("global.cancel") }}
              base-button(@click="onSave" customClass="is-small" v-enableSubmit="{ formItem: pool, toCheck: ['name'] }") {{$t("global.save") }}
</template>
<script>
import formValidator from '@/directives/formValidator.js'
import VPoolCandidate from './VPoolCandidate'
import {
  VAttributeSelector,
  VJobSelector,
  AgencySelector,
  CandidateSelector
} from '@/components/shared/selectors'
import { mapActions, mapState } from 'vuex'
import { getCandidates } from '@/store/modules/candidates/actions'
import { HalfCircleSpinner } from 'epic-spinners'
import VSidebarInput from '@/components/shared/sidebar-form/VSidebarInput'
import GradeSelector from '@/components/shared/selectors/grade-selector/VGradeSelector'

export default {
  $_veeValidate: {
    validator: 'new',
    events: ''
  },
  directives: {
    enableSubmit: formValidator
  },
  components: {
    AgencySelector,
    VAttributeSelector,
    VJobSelector,
    GradeSelector,
    VPoolCandidate,
    HalfCircleSpinner,
    VSidebarInput,
    CandidateSelector
  },
  props: {
    pool: {
      required: true,
      type: Object
    },
    action: {
      type: String,
      required: true
    },
    updateFn: {
      type: Function,
      required: true
    },
    errorsFromBack: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      candidateQuery: {
        jobTypeId: null,
        agencyId: null,
        attributeValues: [{ id: null }],
        name: null,
        gradeId: null
      },
      grade: null
    }
  },
  computed: {
    ...mapState('grades', ['grades']),
    ...mapState('candidates', ['candidates', 'status']),
    filteredCandidates() {
      if (this.pool && this.pool.users) {
        let poolUsers = this.pool.users.map((user) => user.id)
        return this.candidates.filter(
          (candidate) => !poolUsers.includes(candidate.id)
        )
      }
      return this.candidates
    },
    agencies: {
      get() {
        return this.candidateQuery.agencyId
      },
      set(val) {
        this.candidateQuery.agencyId = val
      }
    },
    attributes: {
      get() {
        return this.candidateQuery.attributeValues[0].id
      },
      set(val) {
        this.candidateQuery.attributeValues[0].id = val
      }
    },
    jobType: {
      get() {
        return this.candidateQuery.jobTypeId
      },
      set(val) {
        this.candidateQuery.jobTypeId = val
      }
    },
    selectedGrade: {
      get() {
        return this.grade
      },
      set(value) {
        if (value) {
          this.grade = value
          this.candidateQuery.gradeId = value.id
        } else {
          this.grade = null
          this.candidateQuery.gradeId = null
        }
      }
    },
    candidateName: {
      get() {
        return this.candidateQuery.name || ''
      },
      set(val) {
        this.candidateQuery.name = val
      }
    },
    name: {
      get() {
        return this.pool.name
      },
      set(val) {
        this.updateFn({
          name: 'name',
          value: val
        })
      }
    }
  },
  watch: {
    pool: {
      immediate: true,
      handler: function () {
        this.clearCandidates()
      }
    }
  },
  methods: {
    ...mapActions('candidates', ['getCandidates', 'clearCandidates']),
    onSave() {
      this.$validator
        .validateAll({
          name: this.name
        })
        .then((valid) => {
          if (!valid) {
            return
          } else {
            this.$emit('form:save')
          }
        })
    },
    filterCandidates() {
      let attributeValuesMimic = { ...this.candidateQuery.attributeValues[0] }

      if (attributeValuesMimic.id === null) {
        let newCandidateQuery = { ...this.candidateQuery }
        delete newCandidateQuery.attributeValues

        let query = Object.assign({}, newCandidateQuery)
        Object.keys(query).forEach(
          (key) =>
            [null, '', undefined].includes(query[key]) && delete query[key]
        )
        if (Object.keys(query).length) {
          Object.assign(query, { responseType: 'all' })
          return this.getCandidates(query)
        }
        return this.clearCandidates()
      } else {
        let query = Object.assign({}, this.candidateQuery)
        Object.keys(query).forEach(
          (key) =>
            [null, '', undefined].includes(query[key]) && delete query[key]
        )
        if (Object.keys(query).length) {
          Object.assign(query, { responseType: 'all' })
          return this.getCandidates(query)
        }
        return this.clearCandidates()
      }
    },
    removeCandidate(candidate) {
      this.$emit('form:remove-candidate', candidate)
    },
    addCandidate(candidate) {
      this.$emit('form:add-candidate', candidate)
    },
    onCancel() {
      this.$emit('form:cancel')
    },
    gradeSelect(value) {
      this.selectedGrade = value
    }
  }
}
</script>
<style lang="stylus" scoped>
.pool-form
  &__filter
    margin 30px 16px 10px 16px
  &__candidate-list
    margin 30px 16px 10px 16px
    max-height: 315px;
    overflow-y: auto;
  &__pool-list
    border-top 1px solid rgba(151, 151, 151, 0.2)
    margin 20px 16px 10px 16px
  &__pool-list-margin
    margin 20px 10px 10px 10px
  &__pool-name
    margin 15px 0px 20px 0px
  .spinner
    margin-left 20px
  .search-name-input
    width: 100%;
    font-size: 14px;
    height: 40px;
    justify-content: flex-end;
    border-radius: 3px;
    border: 1px solid #dfe6eb;
    float: right;
    padding: 0.5em;
    font-size: 16px;
    transition: 0.4s;
    position: relative;
    margin-bottom 20px;
    &:focus
      outlane: none;
      border: 1px solid #2898ff;
      transition: 0.4s
  .search-name-label
    float: left;
    font-size: 13px;
    color: #999;
    padding-top: 0.7em;
    transition: 0.4s;
  .text
    font-size: 13px;
    color: #999;
    transition: 0.4s;
    margin 30px 0px 10px 0px
    width: 100%;
  .title
    font-size: 15px;
    color: #999;
    transition: 0.4s;
    margin 30px 10px 10px 10px
    width: 100%;
    text-align center
</style>
