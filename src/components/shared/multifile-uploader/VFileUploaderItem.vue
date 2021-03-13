<template lang="pug">
  div.upload-item(v-if="!file.done")
    span.upload-item__name
      | {{file.name}}
    span.upload-item__message--success(v-if="file.progress === 100") {{ $t("global.upload_status.success") }}
    progress.progress.is-small.is-info(v-if="showProgress" max="100" :value="file.progress")

</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    showProgress() {
      return this.file.progress && this.file.progress !== 100
    }
  }
}
</script>

<style lang="stylus">
.upload-item {
  padding: 0px 10px 10px 10px;
  display: flex;
  justify-content: space-between
  align-items: center;
  span {
    max-width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  progress {
    max-width: 30%
  }
  &__message {
    &--success {
      font-size: 	0.875rem;
      font-weight: 600;
  	  color: #71BC1F;
    }
  }
}
</style>
