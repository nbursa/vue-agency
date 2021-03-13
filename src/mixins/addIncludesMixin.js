import { mapActions } from "vuex"
export const addIncludes = {
  methods: {
    ...mapActions(["setStoreInclude", "removeStoreInclude"]),
    addIncludesFor(path, includes) {
      this.setStoreInclude({
        path,
        includes
      })
    },
    removeIncludesFor(path) {
      this.removeStoreInclude({ path })
    }
  }
}
