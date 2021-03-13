<template lang="pug">
  .candidate-item--wrapper.columns(@mouseover="() => this.hover = true" @mouseout="() => this.hover = false" @click="selectUser")
    .column.is-4.name-wrapper
      img.user-image(:src="user.image" v-if="user.image && !selected && !hover" :alt="user.firstName")
      h4.name(:class="{'selected' : selected, 'avatar' : !user.image || hover }") {{user.firstName}} {{user.lastName}}
    .column.is-3
      //- h4 10km
    .column.is-3
      //- h4 20 Dec
    //- .column.is-2
    //-   svgicon.candidate-icon(width="20px" height="16px" name="__submit-job/eye" color="#856FF9" v-if="hover" )
  
</template>
<script>
import '@/compiled-icons/__submit-job'

export default {
  props: {
    user: {
      required: true,
      type: [Object, Array]
    },
    selected: {
      required: false,
      type: Boolean,
      default: false
    },
    onSelect: {
      required: false,
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    selectUser() {
      const type = !this.selected ? 'add' : 'remove'
      this.onSelect(this.user, type)
    }
  }
}
</script>
<style lang="stylus" scoped>
.candidate-item--wrapper {
  height: 64px;
  border-bottom: solid .5px #dcdcdc;
  align-items: center;
  align-content: center
  align-self: center
  cursor: pointer;
  .avatar {
        &:before {
        content: url('../../assets/icons/user.png');
        margin-right: 7px;
        height: 34px;
          }
        }
   &:hover {
    background: #f9f9f9;
    .avatar {
      &:before {
        content: url('../../assets/icons/selected-inverted.png');
        margin-right: 7px;
        height: 34px;
      }
    }
  }
  .name-wrapper {
    display: flex;
    }
  .user-image {
    margin-right: 7px;
    height: 34px;
    border-radius: 50%;
    }
  h4 {
    font-weight: normal;
    font-size: 16px
    display: flex;
    align-items: center;
    &.name {
      font-weight: 600

      &.selected {
        &:before {
        content: url('../../assets/icons/selected.png');
        margin-right: 7px;
        height: 34px;
      }
      }
    }

  }
  .candidate-icon {
    align-self: center;
    margin-right 10px;
  }
}
</style>
