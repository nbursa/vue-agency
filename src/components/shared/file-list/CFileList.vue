<template lang="pug">
  div.file-list
    div.file-list__file(v-for="file in files")
      a(:href="file.fileUrl" target="_blank")
        span {{ file.fileName || file.fileUrl }}
        //p.file-list__file--details {{$t("documents_sidebar.list_info_1")}} :
      div.action-row(v-if="showDelete")
        span(@click="fireDelete(file)")
          svgicon.icon.file-list__remove-button(name="documents-compliance/delete" :fill="false" :original="true" scale="1" color="#CC2D2D")

</template>

<script>
import "@/compiled-icons/documents-compliance"

export default {
  props: {
    files: {
      type: Array,
      required: true
    },
    showDelete: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    fireDelete(item) {
      this.$emit("file-list:delete", item)
    }
  }
}
</script>

<style lang="stylus" scoped>


.file-list {
  padding: 15px;

  &__remove-button {
    cursor: pointer;
  }

  &__file {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
    margin-bottom: 5px;
    min-height:40px;
    &--details {
      font-size: 0.8125rem;
      color: $fontDark;
      opacity: 0.5;
    }
    &:hover {
      background-color: #F5F5F5;
      cursor: pointer;
    }

    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
      color: $fontDark;
      width: 100%;
      display: flex;
      align-items: center;
      min-height: 40px;

      &:hover {
        color: $fontDark;
      }
    }
  }
}
</style>
