<template lang="pug">
div
  .candidate-table(v-if="tableData.length !== 0")
    .candidate-table__header(:class="{'has-overlay': tableOverlay}")
      .candidate-table__header-item(
        v-for="item in columns"
        :key="item.id"
      ) {{item.label}}
    .candidate-table__body(ref="tableBody")
      VTableItem(v-for="(item, index) in tableData" :item="item" :columns="columns" :key="index")
  .candidate-table__empty(v-else)
      |{{emptyMsg}}
</template>

<script>
import VTableItem from "./VTableItem"

export default {
  components: { VTableItem },
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: [Array, Object],
      required: true,
      default() {
        return []
      }
    },
    emptyMsg: {
      type: String,
      required: false,
      default() {
        return this.$t("global.empty_table_msg")
      }
    }
  },
  data() {
    return {
      tbody: null
    }
  },
  computed: {
    tableOverlay() {
      if (!this.tbody) {
        return null
      }
      return this.tbody.offsetHeight >= 440 ? true : false
    }
  },
  mounted() {
    this.tbody = this.$refs["tableBody"]
  }
}
</script>

<style lang="stylus" scoped>
.candidate-table {
  position: relative;

  &__empty {
    display: flex;
    height: 80px;
    border-radius: 3px;
    background-color: #fff;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
  }

  &__header {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% - 10px);
    padding: 9px 6px 0 20px;
    background-color: white;

    @supports (-ms-ime-align: auto) {
      width: calc(100% - 16px);
    }

    &.has-overlay {
      &:after {
        opacity: 0.7;
        visibility: visible;
      }
    }

    &:after {
      position: absolute;
      top: 32px;
      opacity: 0.7;
      left: 0;
      width: 100%;
      height: 126px;
      content: '';
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
    }
  }

  &__header-item {
    flex: 1;
    font-size: 12px;
    font-weight: 600;
    color: #838D98;
    padding: 0 20px 5px;
  }

  &__body {
    padding: 33px 10px 20px 20px;
    max-height: 440px;
    min-height: 215px;
    overflow-y: scroll;
  }
}
</style>


