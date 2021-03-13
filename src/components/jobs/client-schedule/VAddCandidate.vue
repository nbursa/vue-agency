<template lang="pug">
  div.add-candidate-modal
    header
      h2 {{ $t("jobs_sidebar.modalTitle") }}
    section.add-candidate-modal__candidate-list
      v-error-strip.add-candidate-modal__error-strip(
        v-show="localError.message"
        :localError="localError"
      )
      div.add-candidate-modal__title-bar(v-show="currentCandidate || candidates.length")
        .spacer-left
        p {{ $t('jobs_sidebar.booked') }}
        p {{ $t('jobs_sidebar.from') }}
        .spacer-right
      div.add-candidate-modal__candidate(v-if="currentCandidate")
        div.name
          img(:src="currentCandidate.image" v-if="currentCandidate.image")
          p.placeholder(v-if="!currentCandidate.image && currentCandidate") {{ `${currentCandidate.firstName.charAt(0) }${ currentCandidate.lastName.charAt(0) }` }}
          p
            span {{ `${currentCandidate.firstName } ${ currentCandidate.lastName }` }}
        div.time
          span {{hoursWorked(currentCandidate.hoursWorked)}}
          span h
        div.time
          span {{hoursTotal(currentCandidate)}}
          span h
        div.active

      div.add-candidate-modal__container(v-bar="{}")
          ul
            li(v-for="candidate in orderedCandidates")
              div.add-candidate-modal__candidate(v-show="currentCandidate.id !== candidate.id")
                div.name
                  img(:src="candidate.image" v-if="candidate.image")
                  p.placeholder(v-if="!candidate.image && candidate") {{ `${candidate.firstName.charAt(0) }${ candidate.lastName.charAt(0) }` }}
                  p
                    span {{ `${candidate.firstName } ${ candidate.lastName }` }}
                div.time
                  span {{hoursWorked(candidate.hoursWorked)}}
                  span h
                div.time
                  span {{hoursTotal(candidate)}}
                  span h
                a(@click.prevent="update(candidate)")
                  svgicon(name="user-roles/Add" :fill="false" :color="$colorMap.primary" width="32" height="32")
      div.add-candidate-modal__loader(v-if="loadingStatus")
        half-circle-spinner.spinner(
          :animation-duration="800"
          :size="50"
          :color="$colorMap.primary"
        )

</template>

<script>
import { mapActions, mapState } from "vuex"
import DateTimeUtils from "@/utils/dateUtils.js"
import { HalfCircleSpinner } from "epic-spinners"
import VErrorStrip from "@/components/shared/error-strip/VErrorStrip"

export default {
  components: {
    VErrorStrip,
    HalfCircleSpinner
  },
  inject: ["options"],
  data() {
    return {
      localCandidate: null
    }
  },
  computed: {
    ...mapState("clientSchedule", [
      "candidates",
      "candidateStatus",
      "candidateError"
    ]),
    ...mapState("clientSchedule/scheduler", ["interval"]),
    currentCandidate() {
      return this.localCandidate || this.options.modalData.currentCandidate
    },
    jobId() {
      return this.options.modalData.jobId
    },
    loadingStatus() {
      return this.candidateStatus
    },
    localError() {
      return {
        message: this.candidateError.error
      }
    },
    orderedCandidates() {
      return _.orderBy(this.candidates, "firstName", "lastName")
    }
  },
  mounted() {
    this.clearCandidates()
    this.getCandidates({ jobId: this.jobId, query: {} })
  },
  methods: {
    ...mapActions("clientSchedule", [
      "getCandidates",
      "updateJobCandidate",
      "clearCandidates"
    ]),
    async update(candidate) {
      try {
        const updatedCandidate = await this.updateJobCandidate({
          jobId: this.jobId,
          userId: candidate.id
        })
        let hours = updatedCandidate.data.user.hoursWorked
        this.localCandidate = Object.assign({}, candidate, {
          hoursWorked: hours
        })
      } catch (e) {
        console.log("error", e)
      }
    },
    hoursWorked(time) {
      return DateTimeUtils.getMinifiedTime(time)
    },
    hoursTotal(candidate) {
      let totalHours =
        this.interval === "week"
          ? candidate.weeklyHours
          : candidate.monthlyHours === "0" || candidate.monthlyHours === null
          ? candidate.weeklyHours * 4
          : candidate.monthlyHours
      return totalHours
    }
  }
}
</script>


<style lang="stylus" scoped>
$sectionPadding = 20px;
$modalHeight = 415px;

.add-candidate-modal {
  width: 100%;

  &__error-strip {
    padding-bottom: 25px;
  }

  &__title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px 10px 0px;

    >.spacer-left {
      flex: 0 0 40%;
    }

    >.spacer-right {
      flex: 0 0 5%;
    }

    >p {
      flex: 0 0 13%;
    }
  }

  header {
    padding: 20px;
    border-bottom: 1px solid #dfe2e3;

    h2 {
      color: #444444;
    }
  }

  section {
    padding-left: $sectionPadding;
    position: relative;
    height: 100%;

    ul {
      overflow-y: auto;
    }
  }

  &__loader {
    position: absolute;
    width: 100%;
    height: $modalHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.6);

    .spinner {
      margin: 0 auto;
      margin-top: -25px;
    }
  }

  &__container {
    height: 290px;
  }

  &__candidate {
    padding-bottom: 15px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.active {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #21DC12;
      margin-right: 9px;
      margin-left: 7px;
    }

    >.name {
      display: flex;
      align-items: center;
      flex: 0 0 40%;

      .placeholder {
        margin-right: 10px;
        font-size: 1em;
        background-color: #f2f4f7;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        max-width: 45px;
      }

      img {
        width: 45px;
        max-width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        display: block;

        &:first-child {
          color: #444444;
          font-size: 1em;
        }

        &:last-child {
          color: #9B9B9B;
          font-size: 0.875em;
          line-height: 1.188em;
        }
      }
    }

    >.time {
      span {
        &:first-child {
          display: inline-block;
          margin-right: 10px;
          border-radius: 7px;
          background: #F8F8F8;
          padding: 5px 15px;
        }
      }
    }
  }
}
</style>
