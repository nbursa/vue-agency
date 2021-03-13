<template lang="pug">
  div
    .sidebar-form
      note(
        v-for="(note, index) in sortedNotes" 
        :key="index"
        :note="note"       
        @note:delete="removeNote"
      )
      .sidebar-form__loader(
        v-if="status"
      )
        half-circle-spinner.spinner(
          class="spinner"
          :animation-duration="1800"
          :size="60"
          color="#507DFF"
        )
    notes-submit(
      @note-submit:send="sendNote"
    )
 
</template>
<script>
import { mapActions, mapState } from "vuex"
import Note from "./VNote"
import NotesSubmit from "./VNotesSubmit"
import { HalfCircleSpinner } from "epic-spinners"

export default {
  components: {
    Note,
    NotesSubmit,
    HalfCircleSpinner
  },
  props: {
    subject: {
      type: Object,
      required: true,
      default() {
        return []
      }
    },
    updateRoute: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    ...mapState("notes", ["status"]),
    sortedNotes() {
      return this.subject.notes ? [...this.subject.notes].reverse() : []
    }
  },
  methods: {
    ...mapActions("notes", ["createNote", "deleteNote"]),
    async sendNote(note) {
      if (status) return false
      await this.createNote({
        id: this.subject.id,
        note: note,
        route: this.updateRoute
      })
      this.$emit("notes:created")
    },
    async removeNote(note) {
      await this.deleteNote(note)
      this.$emit("notes:deleted")
    }
  }
}
</script>
<style lang="stylus" scoped>
.sidebar-form {
  overflow: visible;

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(white, 0.75);
  }

  .spinner {
    position: absolute;
    top: 45%;
    transform: translateY(-45%);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>