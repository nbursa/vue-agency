<template lang="pug">
  div.compliance-item( :class="{'compliance-item--checked': isChecked}" @click="viewDocuments")
    div
      div.compliance-item__item-info
        div.compliance-item__checkbox-spacer(@click.stop="")
          svgicon(:name="icon" :original="true" ref="svgicon")
        div.compliance-item__text
          span.compliance-item__label {{item[labelKey]}}
      div.compliance-item__expiry-info(v-if="humanDate")
        span.compliance-item__expiry-info--normal(:class="{'compliance-item__expiry-info--highlight': [3,4].includes(item.status) }") {{ $t("documents_sidebar.expiry_date") }}: {{humanDate}}


</template>

<script>
import "@/compiled-icons/documents-compliance"
import DateTimeUtils from "@/utils/dateUtils.js"


export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    labelKey: {
      type: String,
      required: true
    },
    selected: {
      type: Object,
      default() {
        return {}
      }
    },
    icons: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    humanDate: function() {
      return this.item.expiryDate && DateTimeUtils.getDateFromSQL(this.item.expiryDate)
    },
    isChecked: {
      set() {
        this.$emit("compliance-item:checked", this.item)
      },
      get() {
        return this.selected.id === this.item.id
      }
    },
    icon: function() {
      if (this.$refs.svgicon) this.$refs.svgicon.loaded = true
      return `documents-compliance/${this.icons[this.item.status] !== undefined && this.icons[this.item.status].toLowerCase()}`
    }
  },
  methods: {
    viewDocuments() {
      // this.$emit("compliance-item:checked", this.item)
      this.$emit("compliance-item:view-documents", this.item)
    }
  }
}
</script>

<style lang="stylus" scoped>


.compliance-item {
  cursor: pointer;
  min-height: 70px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    min-width: 16px;
  }

  &__item-info {
    display: flex;
    align-items: center;
  }

  &__expiry-info {
    padding-left: 27px;
    &--normal {
      opacity: 0.5;
      color: #202123;
      font-size: 0.75rem;
    }
    &--highlight {
      color: #2775FF;
      opacity: 1;
      font-size: 0.75rem;
    }
  }

  &__text {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  &__date {
    font-size 0.75rem;
    flex: 1;
    margin-right: 5px;
  }

  &--checked {
    //border: 1px solid #2898FF;
  }

  &__label {
    padding-left: 10px;
    color: $fontDark;
    flex: 2;
  }
}
</style>
