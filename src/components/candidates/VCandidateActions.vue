 <template lang="pug">
 div(@click.prevent="" @click.stop="" @click.self="" style="position: relative; min-height: 20px")
  transition-group(name="slide-fade" mode="out-in")
    div(v-show="!toDelete" key="1")
      router-link.profile-link-trigger(:to="{ path: `/candidate-details/${options.id}` }" v-tooltip.bottom-start="$t('candidates.profile_link')")
        svgicon(name="candidates-details/details" :fill="true" ref="svgicon" :original="true")
      router-link.profile-link-trigger(:to="{ path: `/candidate-details/${options.id}#documents` }" v-tooltip.bottom-start="$t('candidates_sidebar.documents')")
        svgicon(name="sidebar-menu-new/doc-compliance" :fill="true" ref="svgicon" :original="true")
      a.profile-link-trigger(@click="initMessaging" v-tooltip.bottom-start="$t('candidates_sidebar.message')")
        svgicon(name="notifications/messages-header" :fill="true" ref="svgicon" :original="true" :color="$colorMap.primary" width="14" height="14")
      a.profile-link-trigger(@click="toDelete = true" v-tooltip.bottom-start="$t('global.delete')")
        svgicon(name="temp/delete-normal" :fill="false" ref="svgicon" :original="true" color="#cb1b1b")
    div.delete-conf(v-show="toDelete" key="2")
      a.profile-link-trigger(@click="onDelete" style="color:#cb1b1b; font-weight: bold") {{$t("global.yes")}}
      a.profile-link-trigger(@click="toDelete = false") {{$t("global.no")}}

</template>


<script>
import { mapActions } from "vuex"
import "@/compiled-icons/candidates-details"
export default {
  props: {
    options: {
      type: [Array, Object],
      required: true,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      toDelete: false
    }
  },
  computed: {},
  methods: {
   ...mapActions("messages", [
      "pushConversationToStack",
      "flickerConversation"
    ]),
    ...mapActions("candidates", [
      "deleteCandidate"
    ]),
    async initMessaging() {
      // Open chat-popup for this conversation
      try {
        await this.pushConversationToStack(this.options)
      } catch (e) {
        this.flickerConversation(this.options.id)
        console.log(e)
      }
    },
    onDelete() {
      this.deleteCandidate(this.options.id)
      this.toDelete = false
    }
  }
}
</script>

<style lang="stylus" scoped>

.profile-link-trigger {
  height: 20px;
  width: 34px;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  &:not(:first-child) {
    margin-left: 10px;
  }
}



/* Enter and leave animations can use different */
/* durations and timing functions. */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  top: 0;
  position: absolute;

}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
  top: 0;
  position: absolute;
}
</style>
