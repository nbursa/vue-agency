<template lang="pug">
div
  span(:style="{fontSize: size + 'px'}") Listing users as instances of a User class
  input(:value="size" @input="$emit('update:size', $event.target.value)")
</template>
<script>
export default {
  props: ["size"],
  data() {
    return {}
  }
}
</script>
