
<template lang="pug">
.right-sidebar-container
    .right-sidebar
      .clear

      form.sidebar-form(v-if="job")
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.sector") }}
          .sidebar-form_clear.is-fullwidth
            | {{ job.agencyId ? job.agencyId.name : "" }}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.job_type") }}
          .sidebar-form_clear.is-fullwidth
            | {{ job.jobTypeId ? job.jobTypeId.name  : ""}}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.client_location") }}
          .sidebar-form_clear.is-fullwidth
            | {{ job.clientId ? job.clientId.name : "" }}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.num_candidates") }}
          .sidebar-form_clear.is-fullwidth
            | {{ job.numberOfCandidates ? job.numberOfCandidates : "" }}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.candidate_attr") }}
        .sidebar-form_field
          .sidebar-form_attributes
            .attribute(v-for="attr in job.attributeValues") {{ attr.value || attr.name }}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.bonuses") }}
        .sidebar-form_field
          .sidebar-form_attributes( v-if="job.bonuses && job.bonuses.length" )
            .attribute(v-for="bonus in job.bonuses") {{ bonus.name }}
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.time_date") }}
        .sidebar-form_field
          .sidebar-form_attributes
            .attribute(v-for="date in job.selectedDates" v-if="job.selectedDates") {{ date }}

        .border-line
        .sidebar-form_field
          label.sidebar-form_label
            | {{ $t("offer_jobs_sidebar.textfield_label") }}
        .sidebar-form_field
          textarea(
            v-model="note"
            :placeholder="$t('offer_jobs_sidebar.textfield_placeholder')"
            class="sidebar-form_text"
          )
        .clear

</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  computed: {
    ...mapState("jobSubmission", ["job"]),
    note: {
      get() {
        return this.job.note
      },
      set(value) {
        this.updateFieldValue({
          note: value
        })
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions("jobSubmission", ["updateFieldValue"])
  }
}
</script>

<style lang="stylus" scoped>

@import '~@/assets/styles/global/partials/right-sidebar';

.right-sidebar {
  .sidebar-form {
    margin-top: 0px;
    margin-bottom: 75px;
    padding-top: 0px;
    .clear {
      clear: both;
    }
  }
}
</style>

