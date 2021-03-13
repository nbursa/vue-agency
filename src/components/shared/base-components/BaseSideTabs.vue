<template lang="pug">
div.tabs--vertical
  .inner
    .side
      ul
        li(
          v-for="tab in tabs"
          :class="[tab.isActive ? 'is-active' : '']"
          )
            a(
              :aria-controls="tab.hash"
              @click.prevent="handle(tab.hash, $event)"
              :href="tab.hash"
              role="tab"
              ) {{ tab.name }}
      |
    .content
      slot
</template>
<script>
import VTabs from "@/components/on-boarding-setup/VTabs"
export default {
  components: { VTabs },
  extends: VTabs
}
</script>

<style lang="stylus" scoped>
.tabs--vertical {
  display: flex;
  margin-top: 4em;
  justify-content: center;

  .inner {
    display: flex;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    overflow: hidden;
  }

  .side {
    // border 1px solid red
    background-color: #fff;

    ul {
      position: relative;
      padding: 60px 70px 60px 30px;

      li {
        position: relative;
        padding-left: 25px;
        margin-bottom: 22px;

        a {
          font-size: 16px;
          color: #838D98;
        }

        &.is-active {
          a {
            font-size: 18px;
            font-weight: bold;
            color: $primary;
          }

          &:before {
            background-color: $primary;
            border-color: transparent;
            top: 6px;
          }
        }

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #838D98;
        }
      }
    }

    .content {
      border: 1px solid red;
    }
  }
}
</style>
