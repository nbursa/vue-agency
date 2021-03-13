<template lang="pug">
.all
  draggable.draggable-container#draggable-container(
    ref="drag-container"
    v-model="iterations"
    :options="options"
    @start="drag=true"
    @end="drag=false"
    @update="getTaxesFromDraggable"
    )
    v-tax(
      v-for="(tax, index) in iterations"
      :key="index"
      :tax="tax"
      :showHandle="showGrabHandle"
      @tax-input:enter="update"
      @tax-input:delete="remove"
    )
    CErrorValidation
    div.tax-cont
      div.tax
        v-base-input.tax__name(
          :placeholder="$t('agency_structure.taxes_placeholder')",
          ref="newNodeInput",
          :clearOnBlur="false"
          @action:save="create({name: $event})"
        )
        .tax__percent
          v-base-input.no-margin(
            placeholder=""
            ref="newNodeInputPercent",
            @action:save="create({percent: $event})"
            :clearOnBlur="false"
            extendedClass="is-small is-padded-right is-marginless"
          )
</template>
<script>
import draggable from "vuedraggable"
import VTax from "./VTax"
import VBaseInput from "../_shared/VBaseInput"
import CErrorValidation from "../_shared/CErrorValidation.vue"
import { mapState, mapActions } from "vuex"

function getNewTaxModel() {
  return {
    name: "",
    level: 0,
    percent: 0,
    id: 0
  }
}
export default {
  components: { draggable, VTax, VBaseInput, CErrorValidation },
  containerClasses: ["column", "is-10", "is-offset-1"],
  data() {
    return {
      newTaxModel: getNewTaxModel(),
      iterations: [],
      options: {
        animation: 150,
        handle: ".handle"
      }
    }
  },
  computed: {
    ...mapState("onboarding/taxes", ["taxes"]),
    /*
    * This is what gets sent, after levels are being updated by index
    */
    showGrabHandle: function() {
      return this.iterations.length > 1
    }
  },
  mounted() {
    this.$options.containerClasses.map(cls => {
      this.$refs["drag-container"].$el.classList.add(cls)
    })
  },
  created() {
    this.getTaxes().then(() => {
      this.iterations = this.taxes
    })
  },
  methods: {
    ...mapActions("onboarding/taxes", [
      "getTaxes",
      "createTax",
      "updateTax",
      "deleteTax",
      "updateLevels"
    ]),

    updateNewTaxModel(e, id) {
      this.$set(this.newTaxModel, "name", e)
    },

    async create(payload) {
      const { name, percent } = payload
      this.newTaxModel.name = name || this.newTaxModel.name
      this.newTaxModel.percent = percent || this.newTaxModel.percent

      this.newTaxModel.level = this.taxes.length ? this.taxes[this.taxes.length - 1].level + 1 : 1

      if(this.newTaxModel.name.length && this.newTaxModel.percent !== 0) {
        this.$refs["newNodeInput"].input = ""
        this.$refs["newNodeInputPercent"].input = ""
        const data = await this.createTax(this.newTaxModel)
        this.runGetter()
        this.newTaxModel = getNewTaxModel()
      }
    },

    async update({name, percent}, id) {
      /*
      * Dispatch action to save/edit v-tax input value
      */
      // let value = e.target ? e.target.value : e
      await this.updateTax({
        percent,
        name,
        id
      })
      this.runGetter()
    },
    /*
     * Dispatch action to delete v-tax from collection
     */
    async remove(id) {
      await this.deleteTax({ id })
      this.runGetter()
    },

    async getTaxesFromDraggable(e) {
      let value = this.$refs["drag-container"].value
      const taxList = value.reduce((acc, tax) => {
        acc.push(tax)
        return acc
      }, [])
      const levels = taxList.map((tax, index) => {
        let { id, level, name, percent } = tax
        return {
          level: index + 1,
          id,
          name,
          percent
        }
      })
      await this.updateLevels({
        taxes: levels
      })
      this.runGetter()
    },

    async runGetter() {
      await this.getTaxes()
      this.iterations = this.taxes
    }
  }
}
</script>
<style lang="stylus">


.draggable-container {
  width: 100%;
  max-width: 625px;
  margin: 0 auto !important;

  .sortable-ghost {
    background: $lightGray;
    min-height: 45px;

    .field {
      display: none;
    }
  }

  .control {
    .tax-save-cancel {
      input {
        height: 60px;
        font-size: 18px;

        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .tax-cont {
    .tax {
      position: relative;
      &__name {
        input {
          padding-right: 40%;
        }
      }
      &__percent {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: calc(20% + 8px);
        height: 40px;
        width: 90px;
        border-radius: 3px !important;
        text-align: right;
        &:after {
          content: "%"
          position: absolute;
          top: 8px;
          right: 5px;
        }
      }
    }
    .no-margin {
      margin: 0;
    }
  }
}
</style>
