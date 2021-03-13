<template lang="pug">
  .c-list-dropdown(@click="open = !open" v-click-outside="closeTopDropdown")
    slot(name="trigger")
      svgicon.icon.icon-more(name="messages-page/more")

    transition(name="dropdown-animation")
      .c-list-dropdown__content(v-show="open")
        slot(name="list-content")
          ul
            li
              button Delete message
            li
              button Mute notifications
            li
              button Archive
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives:{
    ClickOutside
  },
  data(){
    return{
      open: false
    }
  },
  methods:{
    closeTopDropdown(){
      this.open = false
    }
  },
}
</script>

<style lang="stylus" scoped>
.dropdown-animation-enter-active,
.dropdown-animation-leave-active {
  transition: all .3s ease;
}

.dropdown-animation-enter, .dropdown-animation-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

.c-list-dropdown{
  cursor pointer
  display flex
  position relative
  align-items center
  svg{
    fill #B9B9B9
    transition fill .25s ease
    &.icon-more{
      width 21px
      height 5px
    }
  }
  &:hover{
    svg{
      fill #969090
    }
  }

  &__content{
    background white
    border-radius 3px
    box-shadow 0 2px 10px 0 rgba(0,0,0,0.09)
    padding 11px 10px
    position absolute
    right 0
    top 25px
    width 180px
    z-index 3
    ul{
      li{
        button{
          color black
          padding 6px 4px
          border-radius: 5px;
          border 0
          font-size 16px
          width: 100%
          text-align left
          transition background-color .25s ease
          margin 1px 0
          cursor pointer
          //user-select: none;
          &:hover, &:focus{
            background-color #C8DAE5
            outline none
          }
        }
      }
    }
  }
}



</style>
