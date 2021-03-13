<template lang="pug">
div.tax
  .field.has-addons
    .control
      a.button.is-static(
        :class="inputSize"
        :disabled="isEditing"
        )
        | {{ tax.id }}
    v-tax-input(
      ref="tax"
      :value="tax.name"
      :percent="tax.percent"
      @input="$emit('tax-input:input', $event, tax.id)"
      :input-size="inputSize"
      :isEditing="isEditing"
      @taxInput:action-edit="enterEditMode('save')"
      @blur="isEditing = false"
      @tax-input:after-save="afterSave($event, tax.id)"
      @tax-input:after-cancel="afterCancel($event, tax.id)"
      @keypress.enter="isEditing = false; $emit('tax-input:enter', $event, tax.id)"
      :action="action"
      )
</template>
<script>
import VTaxInput from "./VTaxInput"
export default {
  components: { VTaxInput },
  props: {
    tax: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      action: "save",
      inputSize: "is-large",
      isEditing: false
    }
  },
  methods: {
    afterSave(newValue, id) {
      this.$emit("tax-input:enter", newValue, id)
      this.isEditing = false
    },
    afterCancel({ e }, id) {
      $logger.blue(`canceling record ${id}`)
      this.isEditing = false
    },
    enterEditMode(action, id) {
      /* Enter editing mode */
      this.isEditing = true
      /* Pass action prop, to denote if we are saving or deleting */
      this.action = action

      this.$nextTick(() => {
        this.$children[0].$refs["taxInput"].focus()
      })
    }
  }
}
</script>
