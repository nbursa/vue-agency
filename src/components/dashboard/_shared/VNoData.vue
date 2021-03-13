<template lang="pug">
  .no-data-wrapp
    .no-data-wrapp__inner
      p {{ $t("dashboard.no_data") }}
</template>


<style lang="stylus" scoped>
.no-data-wrapp {
  min-height: 275px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('~@/assets/static/no-data-info/no-data-bcg.svg'), url('~@/assets/static/no-data-info/no-data-icon.svg');
  background-position: 0 bottom, center 60px;
  background-repeat: no-repeat, no-repeat;
  background-size: 100% auto, auto;

  &__inner {
    p {
      color: #818996;
      margin-top: 107px;
    }
  }
}
</style>

