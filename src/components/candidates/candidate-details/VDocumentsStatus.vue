
<template lang="pug">
 div.documents-status(@click.prevent="")
  svgicon.icon(v-if="options.status" :name="documentStatusIcon" :original="true" )
  span {{documentStatusTitle}}
</template>


<script>
import "@/compiled-icons/documents-compliance"

export default {
  props: {
    options: {
      type: [Array, Object],
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      documentStatus: {
        1: this.$t("candidate_details.document_status_1"),
        2: this.$t("candidate_details.document_status_2"),
        3: this.$t("candidate_details.document_status_3"),
        4: this.$t("candidate_details.document_status_4"),
        5: this.$t("candidate_details.document_status_5")
      },
      iconsName: {
        1: "uploaded",
        2: "approved",
        3: "expiringsoon",
        4: "expired",
        5: "rejected"
      }
    }
  },
  computed: {
    documentStatusIcon() {
      return `documents-compliance/${
        this.iconsName[this.options.status]
      }`.replace(/\s/g, "")
    },
    documentStatusTitle() {
      return this.options.status === undefined
        ? "--"
        : this.documentStatus[this.options.status]
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>

.documents-status {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 5px;
  }
}
</style>
