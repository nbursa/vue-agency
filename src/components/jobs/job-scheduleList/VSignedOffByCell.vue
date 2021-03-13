
<template functional lang="pug">
div
  span(v-if="props.options && props.options.signOff && props.options.signOff.user")
    | {{ props.options.signOff.user.firstName }} {{ props.options.signOff.user.lastName }}
  span(v-else) --
</template>


