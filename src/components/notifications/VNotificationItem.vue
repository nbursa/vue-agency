<template lang="pug">
  .notification-card-item(@click="doAction")
    .notification-card-item__new(v-if="!read")
    .notification-card-item__icon-wrapp
        svgicon.icon(:name="`notifications/${item.icon}`" :original="true")
    .notification-card-item__title
        p(v-if="templateProps.length")
          p {{ renderProps(templateProps) }}
    .notification-card-item__text
        p {{ __desc }}
    .notification-card-item__time
        p {{ humanDate }} {{ humanTime }}
    //- .notification-card-item__dropdown-wrapp
    //-   CListDropdown
</template>

<script>
import '@/compiled-icons/notifications'
import { startCase } from 'lodash'
import { DateTime } from 'luxon'
import dateTimeMixin from '@/mixins/dateTime.mixin'
import { parseNotificationType } from '@/utils/general'
import CListDropdown from '@/components/shared/dropdown/CListDropdown'
import { get } from 'lodash'

export default {
  components: {
    CListDropdown
  },
  mixins: [dateTimeMixin],
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      templateProps: [],
      fnProps: []
    }
  },
  computed: {
    __attrs() {
      return this.item.__attrs
    },
    __desc() {
      return this.__attrs.callback
        ? this.__fn
        : this.__attrs.description
          ? this.__attrs.description
          : this.notificationType
    },
    __fn() {
      if (this.__attrs.callback) {
        return this.__attrs.callback.apply(this.item.data, this.fnProps)
      }
      return null
    },
    read() {
      return !!this.item.readAt
    },
    nData: function () {
      return this.item.data
    },
    notificationType: function () {
      return startCase(parseNotificationType(this.item.type))
    }
  },
  mounted() {
    if (this.item.data) {
      this.parseIntoLuxon(this.item.createdAt)
      if (this.__attrs.propMap) {
        const map = this.__attrs.propMap
        Object.keys(map).forEach((type) => {
          /*
           * Collect truthy props per type
           * @type fn || template
           */
          Object.keys(map[type]).forEach((prop) => {
            /*
             * Use only keys where value is 'true', because those are the ones
             * we use in template, others are for callback binding
             */
            if (map[type][prop]) {
              if (Array.isArray(map[type][prop])) {
                map[type][prop].forEach((nestedProp) => {
                  this[`${type}Props`].push(`${prop}.${nestedProp}`)
                })
              } else {
                this[`${type}Props`].push(prop)
              }
            }
          })
        })
      }
    }
  },
  methods: {
    renderProps(props) {
      return props
        .reduce((acc, prop) => {
          /*
           * NOTE prop will be a path, in case of nested properties
           */
          acc.push(get(this.nData, [...prop.split('.')]))
          return acc
        }, [])
        .join(' ')
    },
    doAction() {
      this.$emit('notification-list-item-action', {
        id: this.item.id,
        userId: this.item.data.user ? this.item.data.user.id : '',
        action: this.__attrs.action,
        role: this.nData.role ? this.nData.role.name : null
      })
    }
  }
}
</script>

<style lang="stylus" scoped>


.notification-card-item {
  display: flex;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(black, 0.08);
  background-color: white;
  padding: 15px 20px 15px 0;
  transition: all 0.3s;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 9px 0 rgba(0, 0, 0, 0.14);
  }

  &__new {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 8px;
    width: 8px;
    background-color: #367AE2;
    border-radius: 50%;
  }

  &__icon-wrapp {
    flex: 0 0 73px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 32px;
      height: 32px;
    }
  }

  &__title {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    position: relative;

    &:after {
      position: absolute;
      top: 50%;
      right: 0;
      height: 15px;
      border-right: 2px solid #C7D5DE;
      content: '';
      transform: translateY(-50%);
    }

    p {
      font-weight: 700;
      line-height: 22px;
    }
  }

  &__text {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 14px;

    p {
      line-height: 22px;
    }
  }

  &__time {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0 0 17.7%;

    p {
      font-size: 11px;
      color: #363636;
      opacity: 0.6;
    }
  }

  &__dropdown-wrapp {
    position: relative;
    padding-left: 12px;
    display: flex;
    align-items: center;
    margin-left: 11px;

    &:after {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 10px;
      background-color: #B9B9B9;
      content: '';
    }

    .c-list-dropdown {
      padding: 10px 0;
      width: 16px;
    }
  }
}
</style>
