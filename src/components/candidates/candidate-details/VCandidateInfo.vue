<template lang="pug">
  .candidate-info
    .candidate-info__intro
      .candidate-info__image
        img(:src="candidate.image ? candidate.image : placeholderAvatar")

      .candidate-info__data
        .candidate-info__data-inner
          ul
            li
              span.info-title {{ $t("candidate_details.candidate_info_name") }}
              span.info-text {{candidate.firstName }}
            li
              span.info-title {{ $t("candidate_details.candidate_info_surname") }}
              span.info-text {{ candidate.lastName }}
            li
              span.info-title {{ $t("candidate_details.candidate_info_mobile") }}
              span.info-text {{ candidate.mobilePhone }}
            li
              span.info-title {{ $t("candidate_details.candidate_info_home_phone") }}
              span.info-text {{ candidate.homePhone }}
    .candidate-info__other
      p
        span {{ $t("candidate_details.candidate_info_job_type") }}
        span.candidate-info__legend
          span.candidate-info__green {{ $t("candidate_details.candidate_compliant")  }}
          span.candidate-info__red {{ $t("candidate_details.candidate_notcompliant")  }}
      ul
        li(v-for="{ name, isCompliant } in candidate.jobTypes" :class="{ 'candidate-info__green': isCompliant, 'candidate-info__red': !isCompliant }") {{ name }}
    .candidate-info__other
      p {{ $t("candidate_details.candidate_info_applicable_attributes") }}
      ul
        li(v-for="attribute in candidate.attributeValues") {{ attribute.value }}
</template>

<script>
export default {
  props: {
    candidate: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      placeholderAvatar: require("@/assets/static/avatar/avatar.png")
    }
  }
}
</script>

<style lang="stylus" scoped>
.candidate-info {
  padding: 32px 30px 12px 40px;
  border-bottom: 2px solid #F4F4F4;
  display: flex;
  flex-direction: column;

  &__legend {
    display: inline-block;
    span {
      padding-left: 15px;
      margin-left: 5px;
    }
  }
  &__intro {
    display: flex;
    margin-bottom: 20px;
  }

  &__green, &__red {
    position: relative;
    &:before {
      background-color: #7ED321;
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      content: '';
      height: 10px;
      width: 5px;
      border-radius: 2px;
    }
  }
  &__red {
    &:before {
      background-color: #CF0009;
    }
  }

  &__other {

    p {
      font-size: 13px;
      color: rgba(black, 0.4);
      display: flex;
      justify-content: space-between
      margin-bottom: 5px;
    }

    ul {
      border: 1px solid #DFE6EB;
      border-radius: 3px;
      float: left;
      width: 100%;
      padding: 0 3px 6px 3px;
      margin-bottom: 10px;
      min-height: 40px;

      li {
        position: relative;
        margin: 6px 3px 0 3px;
        border-radius: 3px;
        background-color: #F2F4F7;
        font-size: 12px;
        color: #202123;
        text-align: center;
        float: left;
        padding: 4px 18px;
        &.candidate-info {
          &__red, &__green {
            &:before {
              height: 20px;
            }
          }
        }
      }
    }
  }

  &__image {
    flex: 0 0 140px;
    height: 140px;
    border-radius: 4px;
    border: 1px solid #DFE6EB;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__data {
    flex: 0 0 52%;

    ul {
      li {
        display: flex;
        align-items: center;
        margin-bottom: 2px;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          flex: 1;

          &.info-title {
            font-size: 13px;
            color: rgba(black, 0.4);
          }

          &.info-text {
            color: #202123;
          }
        }

        .info-column {
          flex-wrap: wrap;
          flex: 1;
          display: flex;

          .info-card {
            margin: 2px 0px;
            font-size: 12px;
            padding: 5px 10px;
            margin-right: 5px;
            background-color: #EDEFF3;
            border-radius: 3px;
            min-height: 26px;
          }
        }
      }
    }
  }

  &__data-inner {
    padding: 0 30px 0 40px;
  }

  &__status {
    flex: 0 0 28.9%;
  }

  &__status-inner {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__status-title {
    font-size: 14px;
    color: rgba(black, 0.4);
    padding-right: 10px;
  }

  &__status-type {
    font-size: 14px;
    border-radius: 4px;
    padding: 3px 10px;
    color: #202123;

    &--compliant {
      background-color: #B8E986;
    }

    &--not-compliant {
      background-color: #FF4823;
    }
  }
}
</style>

