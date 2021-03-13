<template lang="pug">
div.container
  .section.content
    .box
      h4 Testing translations
      p <strong>{{ $t('whenlandedonsectors.if_you_have') }}</strong>
  .section.content
    h4 Listing users as instances of a User class
    .columns.is-multiline
      .column.is-half-desktop(v-for="user in users")
        pre(v-if="$can('view', user)") {{ user }}
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("userManagement", ["users", "profile"])
  },
  created() {
    this.getUsers()
  },
  methods: {
    ...mapActions("userManagement", ["getUsers"])
  }
}
</script>
