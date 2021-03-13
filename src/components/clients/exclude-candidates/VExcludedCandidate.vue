<template lang="pug">
  div.excluded-candidate
    div.excluded-candidate__details
        div.name
          img(:src="candidate.image" v-if="candidate.image")
          p.placeholder(v-if="!candidate.image && candidate") {{ `${candidate.firstName.charAt(0) }${ candidate.lastName.charAt(0) }` }}
          p
            span 
              span {{ `${candidate.firstName } ${ candidate.lastName }` }}
              span {{candidate.email}}


        a.cancel(@click.prevent="remove") {{$t('global.remove')}}
         

</template>
<script>
export default {
  props: {
    candidate: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  methods: {
    remove() {
      this.$emit('excluded-candidate:remove', this.candidate.id)
    }
  }
}
</script>
<style lang="stylus" scoped>


.excluded-candidate {
  margin-top: 15px;
  min-height: 50px;
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.08);

  &__details {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.name {
      display: flex;
      align-items: center;
      flex: 0 0 60%;

      .placeholder {
        margin-right: 10px;
        font-size: 1em;
        background-color: #f2f4f7;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        border-radius: 50%;
        height: 45px;
        width: 45px;
        max-width: 45px;
      }

      img {
        width: 45px;
        max-width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        display: block;

        &:first-child {
          color: #444444;
          font-size: 1em;
        }

        &:last-child {
          color: #9B9B9B;
          font-size: 0.875em;
          line-height: 1.188em;
        }
      }
   
    }

    .cancel {
      color: $red;
      cursor: pointer;
    }
  }
}
</style>