 <template lang="pug">
 div(@click.prevent="" @click.stop="" @click.self="" style="position: relative; min-height: 20px")
  transition(name="slide-fade" mode="out-in")
    a.profile-link-trigger(@click.prevent="openAuditModal" v-tooltip.bottom-start="$t('jobs.action_audit')")
      svgicon.icon(name="sidebar-menu-new/reporting" :fill="false" ref="svgicon")

</template>


<script>
import { mapActions, mapGetters } from "vuex"
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
      
    }
  },
  computed: {},
  methods: {
    ...mapGetters("modals", ["showModal"]),
    ...mapActions("modals", ["toggleModal", "setModalComponent"]),
    openAuditModal() {
      this.setModalComponent({modalComponent:  "audit" , modalData: {id: this.options.id, namespace: "jobManagement", actionName: "getJobLogs" , getterName: "getJobLogs" }})
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

.icon {
  color: $iconBlue;  
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
