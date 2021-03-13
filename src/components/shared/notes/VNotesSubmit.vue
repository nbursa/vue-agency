<template lang="pug">
    div.notes-submit 
      //- a.notes-submit__upload
      //-   svgicon.icon(name="candidates/upload-csv" :fill="false")
      textarea.notes-submit__textarea(
        ref="ta"
        :placeholder="$t('notes_edit.note_placeholder')"
        @keydown.enter.prevent="send"
        v-model="message"
        @focus.once="clear"
      )
      a.notes-submit__send(@click="send")
        svgicon.icon(name="messages-page/send")
</template>
<script>
export default {
  data() {
    return {
      message: ""
    }
  },
  methods: {
    send(e) {
      if (!this.message) return
      if (e.shiftKey) return
      this.$emit("note-submit:send", { note: this.message } )
      this.clear()
    },
    clear() {
      this.message = ""
    }
  }
}
</script>
<style lang="stylus" scoped>
.notes-submit
  position absolute 
  bottom 0px
  left 0
  width 100%
  height 130px
  box-shadow 0 -2px 4px 0 rgba(0,0,0,0.08);
  background-color white


  &__textarea
    margin-top 15px
    width 100%
    border none
    box-shadow none
    border-radius 0
    resize none
    color #2C4B5C
    font-size 14px
    line-height 17px
    padding-right 45px
    padding-left 45px
    max-height 75px
    height 100%
  &__send,
  &__upload
    position absolute
    top 20px
    transform translateY(-50%)
    .icon
      width 20px
      height 18px
      fill #128AFF
      transition fill 0.25s ease
    &:hover
      .icon
        fill #0876dd
  &__send 
    right 20px
  &__upload
    left 20px
</style>