<template lang="pug">
  form.sidebar-uploader(
    enctype="multipart/form-data"
    ref="fileForm"
    )
    .sidebar-uploader--icon
      svgicon(name="candidates/upload-csv" :fill="true" ref="svgicon" :original="true")
    input.input-file(
      name="file"
      type="file"
      accept=".csv"
      ref="fileIinput"
      @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
    )
    span {{ $t("candidates_sidebar.upload_csv") }}
</template>


<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: 'VSidebarUploader',
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      uploaded: false,
      file: [],
      uploadFieldName: 'csv'
    }
  },
  methods: {
    filesChange(fieldName, fileList) {

        const formData = new FormData();
        if (!fileList.length) return;

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
          this.$emit('upload', formData)

        this.$refs.fileForm.reset()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sidebar-uploader
    text-align center
    height 40px
    display flex
    justify-content center
    &:hover
      color #000
    &--icon
      width 50px
      margin-top 0.4em
    span
      top 0.4em
      position relative
    .input-file
      position absolute
      left 0
      width 100%
      opacity 0
      height 50px
      z-index 2
      &:hover
        cursor pointer
</style>


