<template lang="pug">
div.login__layout(:style="profileThemeBg")
  transition-group(name="base-slide-out")
    div.login__error-strip(key="1")
      slot(name="errors")
    div.login__info-strip(key="2")
      slot(name="info")
  section.section
    .container
      .columns
        .column.is-12.is-10-desktop.is-offset-1-desktop
          .header__box
            .header__logo
              svgicon.icon(
                v-if="!subdomainProfile.logo"
                name="global/realday-logo-small"
                :fill="true"
                :color="$colorMap.primary"
              )
              img.subdomain-logo(
                v-if="subdomainProfile.logo"
                :src="subdomainProfile.logo"
                alt="Logo"
              )
            .header__menu
              //- ul
              //-   li
              //-     a {{$t("authorization.aboutus")}}
              //-   li
              //-     a {{$t("authorization.terms")}}
              //-   li
              //-     a {{$t("authorization.faq")}}
              //-   li
              //-     a {{$t("authorization.help")}}
    .container.custom
      .columns
        .column.is-12.is-10-desktop.is-offset-1-desktop
          .columns.is-gapless
            .column
                .login__wrapper(v-show="title")
                  h2.title(v-if="subdomainProfile.name") {{ subdomainWellcome }}
                  h2.title(v-if="!subdomainProfile.name") {{titleText}}
                  //- h4.subtitle(v-if="!subdomainProfile.name")
                  //-   | {{$t("authorization.subtitle")}}
                |
                slot
            //- .column.is-6
            //-   .section.has-t-gradient
            //-     .logo
            //-       img(v-if="subdomainProfile.logo" :src="subdomainProfile.logo")
            //-       img(v-if="!subdomainProfile.logo" src="~@/assets/icons/authlogo.svg")
  slot(name="modal")

  
</template>

<script>
import '@/compiled-icons/login'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import { subdomainsMixin } from '@/mixins/subdomainsMixin'

export default {
  mixins: [subdomainsMixin],
  props: {
    title: {
      type: Boolean,
      required: false,
      default: true
    },
    titleText: {
      type: String,
      required: false,
      default: 'Sign in to Realday'
    }
  },
  computed: {
    ...mapState('subdomains', ['subdomainProfile', 'subdomainTheme']),
    subdomainWellcome: function () {
      return `Sign in to ${this.subdomainProfile.name}`
    },
    profileThemeBg: function () {
      return {
        backgroundColor: this.subdomainTheme.backgroundColor
          ? this.subdomainTheme.backgroundColor
          : ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$errorColor = lighten(#FE5B78, 20%);
$successColor = lighten(#22CB87, 20%);

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;

  img {
    width: 200px;
  }
}

.login {
  &__layout {
    padding-top: 7.3125rem;
    height: 100vh;
  }
  &__error-strip,
  &__info-strip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  &__error-strip {
    background: linear-gradient(135deg, $errorPrimary 0%, $errorColor 60%)
  }
  &__info-strip {
    background: linear-gradient(135deg, $successPrimary 0%, $successColor 60%)
  }
}

.has-t-white, .has-t-gradient {
  min-height: 488px;
}

.has-t-white {
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.has-t-gradient {
  color: white;
  background: linear-gradient(270deg, #264A5E 0%, #395A6D 100%);
  height: 100%;
}

.header__menu {
  ul li {
    display: inline-block;

    a {
      padding: 0.4em 0.6em;
      color: #2C4F63;
    }
  }
}

form {
  .field:not(:last-child) {
    margin-bottom: 1.5em;
  }

  label.label {
    margin-bottom: 0;
    color: #A1A1A1;
    font-weight: normal;
    font-size: 12px;
  }

  input {
    padding-left: 0;
    border: 0;
    box-shadow: none;
    border-bottom: 1px solid #D4D4D4;
  }

  p.forgot {
    color: #4785F9;
    font-size: 14px;
    font-weight: 600;
    margin-top: 34px;
  }
}

.header__box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  svg {
    width: 80px;
    height: auto;
  }
}

.container.custom {

}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


.columns.shadow {
  border-radius: 5px;
  box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.is-tmpst-info {
  height: 40px;
  min-width: 140px;
  border-radius: 3px;
  background: linear-gradient(225deg, $primary 0%, $secondary 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 22.5px;
  margin-top: 57.6px;
  border: 0;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
  }
}

.login__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 21px;
    font-weight: bold;
    padding-top: 20px;
    width: 290px;
    text-align: center;
  }

  .subtitle {
    color: #A1A1A1;
    font-size: 14px;
  }
}

.title:not(.is-spaced) + .subtitle {
  margin-top: -1rem;
}
</style>
