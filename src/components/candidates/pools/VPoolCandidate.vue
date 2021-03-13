<template lang="pug">
  div.pool-candidate
    div.pool-candidate__details
        div.name
          img(:src="candidate.image" v-if="candidate.image")
          p.placeholder(v-if="!candidate.image && candidate") {{ `${candidate.firstName.charAt(0) }${ candidate.lastName.charAt(0) }` }}
          p
            span 
              span {{ `${candidate.firstName } ${ candidate.lastName }` }}
              span {{candidate.email}}


        a.cancel(@click.prevent="remove" v-if="action === 'remove'") {{$t('global.remove')}}
        a.add(@click.prevent="add" v-if="action === 'add'") {{$t('global.add')}}

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
    },
    action: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    remove() {
      this.$emit('pool-candidate:remove', this.candidate)
    },
    add() {
      this.$emit('pool-candidate:add', this.candidate)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/global/colors';

.pool-candidate {
  margin-bottom: 15px;
  min-height: 50px;
  background-color: #fff;
  border-radius: 7px;
  border: 1px solid #dfe6eb;

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
    .add {
      color: $primary
      cursor: pointer;
    }
  }
}
</style>
