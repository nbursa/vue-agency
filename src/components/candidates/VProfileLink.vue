 <template lang="pug">
 div(@click.prevent="" @click.stop="" @click.self="")
  router-link.profile-link-trigger(:to="{ path: `/candidate-details/${options.id}` }" v-tooltip.bottom-start="$t('candidates.profile_link')")
    svgicon(name="candidates-details/details" :fill="true" ref="svgicon" :original="true")

</template>


<script>
import "@/compiled-icons/candidates-details"
export default {
  props: {
    options: {
      type: [Array, Object],
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {},
  methods: {
 
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
}
</style>
