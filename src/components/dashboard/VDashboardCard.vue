<template lang="pug">
  .dashboard-card
    .dashboard-card_controls
      slot(name="controls")
    .dashboard-content
      .dashboard-content__title
        h2.has-text-weight-semibold {{title}}
      .dashboard-content__graphs
        slot(name="chart")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.dashboard-card {
  padding-top: 20px;
  margin: 0 auto;
  max-width: 840px;
  width: 100%;

  .dashboard-content {
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);

    &__title {
      border-bottom: 2px solid #EFEFEF;
      padding: 13px 20px;

      h2 {
        font-weight: normal !important;
        color: #202123;
      }
    }

    &__graphs {
      padding: 30px 20px 14px 20px;
      text-align: center;
    }
  }
}
</style>


