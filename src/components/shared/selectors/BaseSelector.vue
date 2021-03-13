
<script>
import { mapActions, mapState } from "vuex"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import Treeselect from "@riophae/vue-treeselect"

export default {
  components: {
    Treeselect
  },
  data() {
    return {
      selectedNode: null
    }
  }
}
</script>

<style lang="stylus">



.vue-treeselect {
  &__single-value {
    line-height: 38px;
  }
}

.vue-treeselect__control {
  border-radius: 0 3px 3px 0px;
  border: 1px solid $WFdarkGray;
  height: 40px;
}

.agency-selector {
  &__label {
    float: left;
    width: 40%;
    font-size: 13px;
    color: #999;
    padding-top: 0.7em;
    transition: 0.4s;
  }
}

.has-label {
  float: right;
  width: 60%;
}
</style>
