
<template functional lang="pug">
div
  span(v-if="props.options && props.options.user")
    | {{ props.options.user.firstName }} {{ props.options.user.lastName }}
  span(v-else) --
</template>


