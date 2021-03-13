<template lang="pug">
div.yn-wrapper
  a.yn(@click="no.handler" tabindex="0" :class="no.label") {{ no.label }}
  a.yn(@click="yes.handler" tabindex="0" class="save") {{ yes.label }}
</template>
<script>
export default {
  props: {
    /*
    * yes && no props
    * Object: {
    *  @label prop, at the same time is action as well
    *  @handler prop, function callback to invoke on click
    * }
    */
    yes: {
      type: Object,
      required: true
    },
    no: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="stylus">
.yn-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0 7px;
  display: flex;
}

.yn {
  display: flex;
  align-items: center;
  right: 50px;
  z-index: 100;
  padding: 0 4px;
  font-size: 12px;
  color: #2F3439;
  transition: color 0.3s ease;

  &:last-child {
    right: 4px;
    color: #856ff9;
  }

  &:last-child:hover {
    color: #3a5dd0;
  }
}
</style>
