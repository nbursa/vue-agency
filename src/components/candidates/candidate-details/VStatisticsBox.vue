<template lang="pug">
div.statistics-box-wrapp
  template(v-for="statisticsBox in statisticsBoxes")
    .statistics-box 
      .statistics-box__inner
        .statistics-box__title
          svgicon.icon(:name="`candidates-details/${statisticsBox.icon}`" :fill="false" )
          span {{statisticsBox.title}}
        .statistics-box__value
          span {{statisticsBox.value}}
        .statistics-box__info
          span {{statisticsBox.text}}

</template>

<script>
import "@/compiled-icons/candidates-details"

export default {
  props: {
    statisticsBoxes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.statistics-box-wrapp {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.statistics-box {
  box-shadow: 0 2px 25px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 14px 11px 4px 11px;

  &__title {
    display: flex;
    margin-bottom: 11px;
    align-items: center;

    svg {
      color: #6876AA;
      margin-right: 8px;
    }

    span {
      color: #202123;
      font-size: 13px;
      display: block;
      line-height: 13px;
    }
  }

  &__value {
    margin-bottom: 5px;

    span {
      font-size: 20px;
      color: #202123;
    }
  }

  &__info {
    border-top: 1px solid #E4EAEE;
    padding-top: 4px;

    span {
      font-size: 10px;
      color: rgba(black, 0.4);
      display: block;
    }
  }
}
</style>


