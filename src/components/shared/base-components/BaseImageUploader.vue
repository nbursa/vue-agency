<template lang="pug">
.uploader
  .uploader-header
    .uploader__pic
      .box(@click="$refs.fileInput.click()")
        img(v-show="previewImage || selectedFile" ref="imgPreview" :src="previewImage")
        svgicon.icon(
          v-show="!previewImage && !selectedFile"
          name="agency-settings/upload-photo" :width="'45'" :height="'36'" :fill="false"
          )
        input(id="imageUpload" type="file" @change="onFileSelected" ref="fileInput" multiple)
  .uploader-footer
    progress.progress.is-small.is-info(v-show="showProgress" max="100" :value="progress")
</template>
<script>
import "@/compiled-icons/agency-settings"
import { mapActions } from "vuex"
import { errorDefaults, successDefaults } from "@/config/notifications"
export default {
  props: {
    /* Expected field name for this file on back-end */
    fieldName: {
      type: String,
      required: false,
      default: "image"
    },
    previewImage: {
      type: String,
      required: false,
      default: ""
    },
    uploadUrl: {
      type: String,
      required: true
    },
    onProgress: {
      type: Function,
      required: false,
      default() {
        return () => {}
      }
    }
    /* Define if progress bar should be visible */
    // hasProgressBar: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      selectedFile: null,
      progress: 0
    }
  },
  computed: {
    fileMeta: function() {
      const { name, size, type } = this.selectedFile || {}
      return name
        ? {
            name,
            size,
            type
          }
        : null
    },
    showProgress() {
      return this.selectedFile !== null ? true : false
    }
  },
  methods: {
    ...mapActions(["uploadFile", "setProfileImage", "setAgencyLogoImage"]),
    ...mapActions("onboarding/agencySettings", ["updateLogo"]),
    onFileSelected(e) {
      this.progress = 0
      // Allow only files of type image
      if (e.target.files.length && !e.target.files[0].type.match("image.*")) {
        this.$notify(
          this.$merge(errorDefaults, {
            group: "foo",
            text: "Wrong file type, only files of type image allowed!"
          })
        )
        return
      }
      let reader = new FileReader()
      reader.onload = e => {
        this.$refs.imgPreview.src = e.target.result
        // console.log("reader.onload: ", e.target)
        // Start file upload immediately
        this.upload(this.selectedFile)
      }
      this.selectedFile = e.target.files[0]
      /* We have to check on null values, because onFileSelected will trigger on any change */
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile)
      }
    },
    onProgressWrapper(progress) {
      this.progress = progress
      this.onProgress(progress)
    },
    upload(selectedFile) {
      if (!selectedFile) {
        this.$notify(
          this.$merge(errorDefaults, {
            group: "foo",
            text: "First select file to upload!"
          })
        )
        return
      }

      let fd = new FormData()

      fd.append(this.fieldName, selectedFile, selectedFile.name)

      this.uploadFile({
        fd: fd,
        url: this.uploadUrl,
        progressHandler: this.onProgressWrapper
      }).then(res => {
        // console.log('res data logo: ', res.data.data)
        this.$emit("base-image-uploader:file-uploaded")
        this.setProfileImage({
          [this.fieldName]: res.data.data[this.fieldName]
        })
        this.selectedFile = null
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
input[type=file] {
  display: none;
}

.uploader {
  .uploader-header {
    display: flex;
  }

  .uploader-footer {
    margin-top: 10px;
    height: 10px;
  }

  min-height: 125px;
  display: flex;
  flex-direction: column;

  .uploader__pic {
    align-items: stretch;

    .box {
      width: 125px;
      height: 125px;
      padding: 0.2em;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 125px;
        height: 100%;
        object-fit: cover;
        display: block;
        margin: 0 auto;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .uploader__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1em;
  }
}
</style>
