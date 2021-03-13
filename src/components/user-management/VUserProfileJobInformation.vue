<template lang="pug">
div.column.is-8.is-offset-2
  form
    .card-content
      input.input.is-medium(placeholder="Enter something" v-model="exampleInput")
</template>
<script>
export default {
  name: "UserProfileJobInformation",
  data() {
    return {
      exampleInput: ""
    }
  },
  methods: {
    submit() {
      this.$parent.$emit("child-save", {
        context: this.$options.name,
        data: this.exampleInput
      })
    }
  }
}
</script>
