import { errorDefaults, successDefaults } from '@/config/notifications'
import { app } from '../main.js'

export const formMessages = {
  watch: {
    getErrors: function (errors) {
      if (Object.keys(errors).length !== 0) {
        const e = this.$merge(errorDefaults, {
          group: 'foo',
          title: app.$t('global.toast_title_error'),
          text: this.errorMessage || this.errorParser(errors)
        })
        this.$notify(e)
      }
    },
    itemSaved: function (value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: 'foo',
          title: app.$t('global.toast_title_success'),
          text: this.successMessage
        })
        this.$notify(e)
        if (!this.preventSidebarCancel) this.$emit('sidebar:navigate', 'cancel')
      }
    },
    itemDeleted: function (value) {
      if (value) {
        const e = this.$merge(successDefaults, {
          group: 'foo',
          title: app.$t('global.toast_title_success'),
          text: this.deleteMessage || app.$t('global.toast_text_deleted')
        })
        this.$notify(e)
        this.$emit('sidebar:navigate', 'cancel')
      }
    }
  }
}
