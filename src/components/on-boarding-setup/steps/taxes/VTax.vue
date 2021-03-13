<template lang="pug">
div.tax
  .field.has-addons
    .control
      a.button.is-static.tax-level(
        :class="inputSize"
        :disabled="isEditing"
        )
        | {{ tax.level }}
    v-tax-input(
      ref="tax"
      :name="tax.name || ''"
      :percent="tax.percent || 0"
      @input="$emit('tax-input:input', $event, tax.id)"
      :input-size="inputSize"
      :isEditing="isEditing"
      @taxInput:action-edit="enterEditMode('save')"
      @taxInput:action-delete="enterEditMode('delete')"
      @tax-input:after-save="afterSave($event, tax.id)"
      @tax-input:after-remove="afterRemove($event, tax.id)"
      @tax-input:after-cancel="afterCancel($event, tax.id)"
      @keypress:enter="isEditing = false; $emit('tax-input:enter', $event, tax.id )"
      :action="action"
      )
    .control.handle-control(
      :class="{'handle': showHandle}"
    )
      a.button.is-static.is-handle(
        :class="inputSize"
        )
        svgicon.icon(name="temp/drag-normal" )
</template>
<script>
import VTaxInput from "./VTaxInput"
export default {
  components: { VTaxInput },
  props: {
    tax: {
      type: Object,
      required: true
    },
    showHandle: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      action: "save", // default to save until changed
      inputSize: "is-large",
      isEditing: false,
      taxInputElement: null
    }
  },
  mounted() {
    if (this.$children[0].$refs["taxInput"]) {
      this.taxInputElement = this.$children[0].$refs["taxInput"].focus()
    }
  },
  methods: {
    afterSave(newValue, id) {
      this.$emit("tax-input:enter", newValue, id)
      this.isEditing = false
    },

    afterRemove({ e }, id) {
      $logger.blue(`removing record id ${id}`)
      this.deleteTaxes(id)
      this.isEditing = false
    },

    afterCancel({ e }, id) {
      $logger.blue(`canceling record id ${id}`)
      this.isEditing = false
    },

    enterEditMode(action, id) {
      /* Enter editing mode */
      this.isEditing = true
      /* Pass action prop, to denote if we are saving or deleting */
      this.action = action

      this.$nextTick(() => {
        if (this.taxInputElement) {
          this.taxInputElement.focus()
        }
      })
    },

    deleteTaxes(id) {
      this.$emit("tax-input:delete", id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.handle-control {
   a {
    width: 26px;

    svg {
      width: 24px;
      color: #D3D9DE;
      opacity: 0.5;
    }
  }
}

.handle {
  cursor: pointer;

  a {
    width: 26px;

    svg {
      opacity: 1;
      width: 24px;
      color: #D3D9DE;
    }
  }
}

.tax {
  margin: 1em 0;
  user-select: none;
  height: 60px;
  transition: background-color 0.3s ease;

  &.sortable-chosen {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: #F4F7F9;

    .tax-box {
      background-color: #F4F7F9;
    }
  }

  .field {
    height: 100%;

    .button {
      height: 100%;
      background-color: transparent;

      &.tax-level {
        font-size: 18px;
        width: 60px;
        color: #2F3439;
      }
    }

    .control {
      font-size: 18px;
    }
  }
}

.is-static.is-handle {
  padding: 0 0.3em;
}
</style>
