<template lang="pug">
div.message-wrapper
  div.message__thread
    .chat-part
      .card
        .card-content
          .media
            .media-left.back
              a(@click="$emit('go-back')")
                svgicon.icon.separator(name="candidates/back" :width="'26'" :height="'20'" :fill="false")
            .media-left
              figure.image.is-48x48
                img(src='https://bulma.io/images/placeholders/96x96.png', alt='Placeholder image')
            |
            .media-content
              p.title.is-4.is-size-6 {{ recipient.fullName }}
              //- p.subtitle.is-6.is-size-6 {{ recipient.email }}
      .section.message__list(ref="message-thread")
          template(v-if="isLoading && conversation.length > 15")
            half-circle-spinner.spinner(
              class="spinner"
              :animation-duration="1800"
              :size="30"
              color="#507DFF"
              )
          template(v-if="conversation.length > 0")
            template(v-for="dateField in groups")
              .card-header
                .message-date {{ dateField }}
              v-message(
                v-for="message in conversationIndexedByDate(recipient.id)[dateField]"
                :message="message"
                :key="message.id")
          template(v-if="!conversation.length && !isLoading")
            .card-header No messages
          template(v-if="isLoading")
            half-circle-spinner.spinner(
              class="spinner"
              :animation-duration="1800"
              :size="30"
              color="#507DFF"
              )
    .section.is-still
      div.message-send
        // p.help.is-danger(v-if="serverErrors.length" v-html="serverErrors.join('')")
        span.message-note.is-pulled-right Hold Shift + Enter for newline
        textarea.textarea(
          :placeholder="$t('message_board.message_placeholder')"
          @keydown.enter="send"
          v-model="message"
          )
</template>
<script>
import VMessage from "./VMessage"
import { HalfCircleSpinner } from "epic-spinners"
import { DateTime } from "luxon"
import { mapState, mapActions, mapGetters } from "vuex"
import { readServerMessages } from "@/mixins/validationMixin"
import { errorDefaults, successDefaults } from "@/config/notifications"
import { parseValidationMessages } from "@/utils/errorParser"
import { debounce } from "lodash"
import easyScroll from "easy-scroll"
export default {
  components: { VMessage, HalfCircleSpinner },
  mixins: [readServerMessages],
  props: {
    recipient: {
      type: Object,
      required: true
    },
    conversation: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    totalPages: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      refEl: null,
      message: ""
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.refEl = this.$refs["message-thread"]
      this.refEl.addEventListener(
        "scroll",
        debounce(this.lazyLoadMoreMessages, 100)
      )
    })
  },
  methods: {
    ...mapActions("messages", ["sendMessage", "incrementCurrentPage"]),
    async send(e) {
      if (e.shiftKey) return
      e.preventDefault()
      try {
        const sent = await this.sendMessage({
          id: this.recipient.id,
          body: this.message
        })
        this.message = ""
        this.scrollMessagesToEnd()
      } catch (_) {
        const e = this.$merge(errorDefaults, {
          group: "foo",
          text: this.serverErrors.join("")
        })
        this.$notify(e)
      }
    },
    scrollMessagesToEnd() {
      this.scrollMessagesToPoint()
    },
    scrollMessagesToPoint(amount = null) {
      const withAmount = {}
      if (amount) {
        withAmount.scrollAmount = amount
      }
      this.easyScroll({
        scrollableDomEle: this.refEl,
        direction: "bottom",
        duration: 600,
        easingPreset: "easeInQuad",
        ...withAmount
      })
    },
    lazyLoadMoreMessages() {
      if (this.refEl.scrollTop === 0) {
        this.incrementCurrentPage({ conversationId: this.recipient.id })
          .then(currentPage => {
            this.$emit(
              "lazy-load",
              { done: this.scrollMessagesToPoint, currentPage: currentPage },
              200
            )
          })
          .catch(_ => {})
      }
    },
    easyScroll
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapGetters("messages", [
      "conversationIndexedByDate",
      "conversationGroups"
    ]),
    groups() {
      return this.conversationGroups(this.recipient.id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.card
  box-shadow 1px 2px 4px 0 rgba(0,0,0,0.08)
.card-content
  padding 0.8em
.back
  margin-top 1em
  .separator
    border-right 1px solid #ddd
    padding-right 15px

.section.is-still
  position relative
  bottom 0
.message__thread
  display flex
  flex-direction column
  .chat-part
    height calc(100vh - 260px)
  .message__list
    overflow-y scroll
    max-height calc(100vh - 350px)
    display flex
    padding-bottom 60px
    flex-direction column
    .card-header
      padding-top 0.5em
      box-shadow none
      min-height 30px
    .spinner
      align-self center
      flex 1 0 100%
.media-left
  img
    margin-left 0.8em
    margin-top 0.5em
    border-radius 50px
.message-date
  padding-bottom .4em
  font-size 12px
  color #80939D
  margin 0 auto
.message-note
  font-size 8px
  color rgba( #2C2C2C, 44% )
.message__send
  position relative
  bottom 0

.section
  padding-top 1.5em
.media-content
  overflow hidden
  .title
    margin-top 1.4em
    margin-left 0.5em
    font-weight 300
</style>
