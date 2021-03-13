<template lang="pug">
  div.column.job-types#attributes.tree-lines
    v-attribute-item(
      v-for="attribute in attributes"
      :attribute="attribute"
      :key="attribute.id"
      @action:delete-attribute="deleteAttribute"
      @action:update-attribute="updateAttribute"
      @action:delete-attribute-value="deleteAttributeValue"
      @action:update-attribute-value="updateAttributeValue"
      @action:create-attribute-value="saveAttributeValue"
    )

    v-base-input(
      :placeholder="$t('agency_structure.attributes_placeholder')",
      ref="newNodeInput",
      @action:save="createAttribute"
    )
</template>

<style lang="stylus" scoped>
#attributes {
  width: 100%;
  max-width: 625px;
  margin: 0 auto;
}

.job-type {
  margin: 1em 0;
}

.pull-right {
  padding-left: 30px;
  margin-bottom: 15px;
}
</style>


<script>
import { mapActions, mapState } from "vuex"
import VAttributeItem from "./VAttributeItem.vue"
import VBaseInput from "../_shared/VBaseInput"

export default {
  name: "CAttributes",
  components: {
    VAttributeItem,
    VBaseInput
  },
  data() {
    return {
      newAttribute: {
        name: ""
      }
    }
  },
  computed: {
    ...mapState("onboarding/attributes", ["attributes"])
  },
  created() {
    this.getAll()
  },
  methods: {
    ...mapActions("onboarding/attributes", [
      "getAll",
      "saveAttribute",
      "deleteAttribute",
      "updateAttribute",
      "saveAttributeValue",
      "updateAttributeValue",
      "deleteAttributeValue"
    ]),
    createAttribute(value) {
      this.newAttribute.name = value
      this.saveAttribute(this.newAttribute)
      this.newAttribute = {
        name: ""
      }
    }
  }
}
</script>
