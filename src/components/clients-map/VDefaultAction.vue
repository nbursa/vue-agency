<template lang="pug">
  .client-map-sidebar
    .client-map-sidebar__title
      a(@click="onBackClick" v-if="showTitle").client-map-sidebar__title-back-trigger
      h1 {{ getTitle }}
    .client-map-sidebar__breadcrumbs(v-if="profile && profile.name")
      ul.client-map-sidebar__breadcrumbs-list
        li
          span {{ profile.name }}
        li(v-for="item in breadcrumbs")
          span {{ item.name }}

    .client-map-sidebar__menu
      a.client-map-sidebar__menu-item(
        v-for="child in getNode" 
        @click.prevent="onClientSelect(child)"
        :class="{'is-active' : child.id === selectedClient.id}" 
      )
        span.client-map-sidebar__child-count(v-if="child.childrenCount") {{child.childrenCount}}
        | {{ child.name }}

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  data() {
    return {
      selectedClient: {
        id: null
      }
    }
  },
  computed: {
    ...mapState("clients", ["clients"]),
    ...mapState("onboarding/agencySettings", ["profile"]),
    ...mapGetters("clients", ["getChildNodes"]),
    breadcrumbs: function() {
      let id = this.selectedClient.id
      let breadcrumbs = []

      if (!this.isSelected || this.isRoot) {
        return breadcrumbs
      }

      do {
        const node = this.getChildNodes(id)
        breadcrumbs.unshift(node)

        if (node.parentId) {
          id = node.parentId
        } else {
          id = 0
        }
      } while (id > 0)

      return breadcrumbs
    },
    hasChildren: function() {
      return (
        !!this.selectedClient.children &&
        this.selectedClient.children.length > 0
      )
    },
    isSelected: function() {
      return this.selectedClient && this.selectedClient.id
    },
    isRoot: function() {
      return this.selectedClient.id === 0 || this.selectedClient.id === null
    },
    showTitle: function() {
      return this.isSelected && !this.isRoot
    },
    getTitle: function() {
      if (this.isSelected) {
        return this.selectedClient.name
      }

      if (this.isRoot && this.profile && this.profile.name) {
        return this.profile.name
      }
    },
    getNode: function() {
      //TODO add hasChildren flag
      let node = this.getChildNodes(this.selectedClient.id)
      if (node && node.children && node.children.length === 0) {
        node = this.getChildNodes(this.selectedClient.parentId)
      }
      return node && node.children ? node.children : []
    }
  },
  watch: {
    selectedClient: {
      immediate: true,
      handler: "onClientSelect",
      deep: true
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions("clients", ["getClients", "setSelected"]),
    ...mapActions("onboarding/agencySettings", ["getProfile"]),
    onClientSelect(client) {
      if (!client.id || client.id != this.selectedClient.id) {
        this.selectedClient = client
        this.setSelected(client)
        this.getClients(client.id)
      }
    },
    onBackClick() {
      let nodeId
      if (!this.selectedClient.parentId) {
        nodeId = 0
      } else {
        nodeId = this.selectedClient.parentId
      }
      this.onClientSelect(this.getChildNodes(nodeId))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/global/variables';

.client-map-sidebar {
  &__title {
    display: flex;
    align-items: center;
    height: 62px;

    h1 {
      color: #202123;
      font-size: 18px;
      padding-left: 26px;

      @media (max-width: $display-small-desktop) {
        font-size: 15px;
        padding-left: 16px;
        line-height: 18px;
      }
    }
  }

  &__title-back-trigger {
    height: 60px;
    flex: 0 0 50px;
    position: relative;

    &:after {
      position: absolute;
      top: 26px;
      left: 23px;
      height: 8px;
      width: 8px;
      border-width: 0 0 2px 2px;
      border-style: solid;
      border-color: #505050;
      content: '';
      transform: rotate(45deg);
    }

    &:before {
      position: absolute;
      top: 50%;
      right: 0;
      height: 20px;
      width: 1px;
      content: '';
      background: #DFDFDF;
      transform: translateY(-50%);
    }
  }

  &__breadcrumbs {
    border-width: 1px 0 1px;
    border-style: solid;
    border-color: #DFDFDF;
    padding: 7px 25px;
  }

  &__breadcrumbs-list {
    display: flex;
    flex-wrap: wrap;

    li {
      padding: 0 18px 0 0;
      position: relative;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;

        &:after {
          display: none;
        }
      }

      &:after {
        position: absolute;
        margin-top: -1px;
        top: 50%;
        right: 9px;
        height: 6px;
        width: 6px;
        border-width: 1px 1px 0 0;
        border-style: solid;
        border-color: #919BA8;
        content: '';
        transform: rotate(45deg) translateY(-50%);
      }

      span {
        font-size: 13px;
        color: #919BA8;
        transition: color 0.25s ease;
        display: block;
        line-height: 16px;
      }
    }
  }

  &__menu {
    padding: 23px;
  }

  &__menu-item {
    border-radius: 3px;
    border: 1px solid #DFE6EB;
    background: white;
    color: black;
    font-size: 15px;
    padding: 13px 18px;
    display: block;
    margin-bottom: 15px;
    position: relative;

    &.is-active {
      border-color: #856ff9;
    }

    &.has-child {
      &:after {
        position: absolute;
        top: 50%;
        right: 14px;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background: #5577FF;
        content: '';
        transform: translateY(-50%);
      }
    }
  }
  &__child-count {
    position: absolute;
    left: -10px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    margin-right: 10px;
    border-radius: 50px;
    background-color: $primary;
    font-size: 0.75rem;
    color: white;
    width: 20px;
    height: 20px;
    font-weight:bold;
  }
}
</style>
