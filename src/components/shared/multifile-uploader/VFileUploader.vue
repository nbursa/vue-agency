<template lang="pug">
  div.multi-uploader
    div.multi-uploader__dropzone(:class="{'disabled': uploaderDisabled}" v-tooltip.auto-start="tooltipMsg")
      form(ref="inputForm")
        input(
          name="files"
          multiple
          type="file"
          ref="fileInput"
          @change="onFilesSelected"
          :disabled="uploaderDisabled"
          title=" "
        )
      svgicon.multi-uploader__centerpiece(name="multifile-uploader/upload" :fill="false" :original="!uploaderDisabled" width="72" height="72" )
      p {{$t("global.uploaderPlaceholder")}}

    div.multi-uploader__listzone
      file-item(v-for="(file, index) in files"
        :file="file"
        :key="index"
      )

</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import "@/compiled-icons/multifile-uploader"
import FileItem from "./VFileUploaderItem"

export default {
  components: {
    FileItem
  },
  props: {
    fieldName: {
      type: String,
      required: false,
      default: "files[]"
    },
    uploaderFiles: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    uploaderUrl: {
      type: String,
      required: true,
      default: ""
    },
    config: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    uploadParam: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    uploadRequireParam: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      files: []
    }
  },
  computed: {
    uploaderDisabled() {
      return this.uploadRequireParam ? this.uploadParam.value === null : this.uploadRequireParam
    },
    tooltipMsg() {
      return this.uploaderDisabled && this.$t('global.uploader_msg')
    }
  },
  watch: {
    files: {
      handler: "stackClear",
      deep: true
    }
  },
  methods: {
    ...mapActions(["uploadFile", "addUploadedItem"]),

    stackClear(stackOld, stackNew) {
      let counter = stackNew.filter(item => {
        return item.done === true
      }).length
      if (counter === this.files.length) {
        this.$refs.fileInput.disabled = false
        this.files = []
      }
    },

    onProgressWrapper(progress, fileIndex) {
      this.files[fileIndex].progress = progress
    },

    statusFiles(file) {
      this.files.push({ name: file, progress: 0, done: false })
    },
    clearInput() {
      this.$refs.inputForm.reset()
    },
    uploader(data, index) {
      return this.uploadFile(data).then(res => {
            this.$emit("multi-file-uploader:file-uploaded")
            //TODO REPLACE WITH PASSED CALLBACK INVOCATION WITH ITS OWN STORE DISPATCH
            setTimeout(() => {
              this.files[index].done = true
              this.addUploadedItem({
                mutationName: this.config.mutationName,
                toCommit: res.data.data[this.config.responseKey] || res.data.data
              })
              return Promise.resolve()
            }, 500)
          })
    },
    async onFilesSelected(e) {
      const fileList = e.target.files
      const fileKeyList = Array.from(Array(fileList.length).keys())

      if (!fileList.length) return

      this.$refs.fileInput.disabled = true

      // populate status tracker for files first
      for (let x of fileKeyList) { 
        this.statusFiles(fileList[x].name)
      }

      //wait for each upload to finish before starting a new one
      for (let x of fileKeyList) { 
        const formData = new FormData()
        formData.append(this.fieldName, fileList[x], fileList[x].name)
        if (this.uploadParam.value !== null) formData.append(this.uploadParam.name, this.uploadParam.value)

        await this.uploader({
          fd: formData,
          url: this.uploaderUrl,
          progressHandler: this.onProgressWrapper,
          fileIndex: x
        }, x)
      }

      this.clearInput()
    }
  }
}
</script>

<style lang="stylus" scoped>
.multi-uploader {
  padding: 10px 15px 0px 15px;

  &__dropzone {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 340px;
    height: 200px;
    background-image: url('~@/assets/static/uploader/papers-bckg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    display: flex;
    justify-content: center;
    &.disabled {
      svg {
          opacity: 0.3;
          path {
            fill: #D2D3DD;
          }
      }
    }
    p {
      color: #202123;
      position: absolute;
      bottom: 40px;
      pointer-events: none;
    }

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
    }
  }

  &__centerpiece {
    position: absolute;
    top: 40%;
    transform: translateY(-40%);
  }
}
</style>
