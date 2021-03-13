import { mapActions, mapGetters } from 'vuex'

export const subdomainsMixin = {
  computed: {
    ...mapGetters('subdomains', ['getSubdomainProfile'])
  },
  data() {
    return {
      subdomain: null
    }
  },
  mounted: function () {
    if (window.location.host) {
      this.subdomain = !['localhost:8080', 'portaldv', 'portal'].includes(
        window.location.host.split('.')[0]
      )
        ? window.location.host.split('.')[0]
        : null
      if (this.subdomain) this.checkSubdomain(this.subdomain)
      if (this.subdomain === 'constructiv') {
        const theme = {
          backgroundColor: '#00F0B4',
          accentColor: '#031862',
          buttonHoverColor: '#ffffff'
        }
        this.setSubdomainTheme(theme)
      }
      return
    }
  },
  methods: {
    ...mapActions('subdomains', ['checkSubdomain', 'setSubdomainTheme'])
  }
}
