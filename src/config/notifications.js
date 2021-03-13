import i18n from "@/lang/lang"

export const successDefaults = {
  title: "Success",
  type: "success",
  duration: 5000
}

export const errorDefaults = {
  title: "Error",
  type: "error",
  duration: 5000
}


export const nOtherOptions = {
  /*
   * Register here all other notification types you want to show
   * except for ConversationMessage type
   *
   * You can map an object with special attributes to each one of them
   * propMap will define which props/fields are important for that specific type of notification
   * @prop propMap.fn defines api props that should be available in a callback function as arguments
   * being received
   * @prop propMap.template defines api props that will be available in
   * template literally, but previously
   * collected into an array of template props
   */
  DocumentExpired: {
    action: "action-document-expired",
    description: `${i18n.t('notifications.document_expired_desc')}`,
    callback: function(tempName) {
      let temp = this[tempName] || "[tempName(missing)]"
      return `${temp} ${i18n.t('notifications.document_expired_msg')}`
    },
    propMap: {
      fn: {
        tempName: true
      },
      template: {
        name: true
      }
    }
  },
  DocumentUploaded: {
    action: "action-document-uploaded",
    description: `${i18n.t('notifications.document_uploaded_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${user.lastName} ${i18n.t('notifications.document_uploaded_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  },
  JobCancelled: {
    action: "action-job-cancelled",
    description: `${i18n.t('notifications.job_cancelled_desc')}`,
    callback: function(clientName) {
      let client = this[clientName] || "[clientName(missing)]"
      return `${i18n.t('notifications.job_cancelled_msg')[0]} ${client} ${i18n.t('notifications.job_cancelled_desc')[1]}`
    },
    propMap: {
      fn: {
        clientName: true
      }
    }
  },
  JobPassOnCompleted: {
    action: "action-job-pass-on-completed",
    description: `${i18n.t('notifications.job_passon_completed_desc')}`
  },
  JobSwapCompleted: {
    action: "action-job-swap-completed",
    description: `${i18n.t('notifications.job_swap_completed_desc')}`
  },
  JobUpdated: {
    action: "action-job-updated",
    callback: function(clientName) {
      let client = this[clientName] || "[clientName(missing)]"
      return `${i18n.t('notifications.job_updated_msg')[0]} ${client} ${i18n.t('notifications.job_updated_msg')[1]}`
    },
    propMap: {
      fn: {
        clientName: true
      }
    }
  },
  UserInvitationAccepted: {
    action: "action-user-invitation-accepted",
    description: `${i18n.t('notifications.user_invitation_accepted_desc')}`,
    callback: function(firstName, lastName) {
      return `${this[firstName]} ${this[lastName]} ${i18n.t('notifications.user_invitation_accepted_msg')}`
    },
    propMap: {
      fn: {
        firstName: true,
        lastName: true
      },
      template: {
        firstName: true,
        lastName: true
      }
    }
  },
  SickLeaveCancelled: {
    action: "action-sick-leave-cancelled",
    description: `${i18n.t('notifications.sick_leave_cancelled_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${
          user.lastName
        } ${i18n.t('notifications.sick_leave_cancelled_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  },
  SickLeaveRequested: {
    action: "action-sick-leave-requested",
    description: `${i18n.t('notifications.sick_leave_requested_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${user.lastName} ${i18n.t('notifications.sick_leave_requested_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  },
  HolidayRequested: {
    action: "action-holiday-requested",
    description: `${i18n.t('notifications.holiday_requested_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${user.lastName} ${i18n.t('notifications.holiday_requested_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  },
  HolidayCancelled: {
    action: "action-holiday-cancelled",
    description: `${i18n.t('notifications.holiday_cancelled_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${user.lastName} ${i18n.t('notifications.holiday_cancelled_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  },
  JobSignedOff: {
    action: "action-job-signed-off",
    description: `${i18n.t('notifications.job_signed_off_desc')}`,
    callback: function(client) {
      if ((client = this[client])) {
        return `${i18n.t('notifications.job_signed_off_msg')[0]} ${client.name} ${i18n.t('notifications.job_signed_off_msg')[0]}`
      }
    },
    propMap: {
      fn: {
        client: true
      },
      template: {
        user: ["firstName"]
      }
    }
  },
  JobRequestAccepted: {
    action: "action-job-request-accepted",
    description: `${i18n.t('notifications.job_request_accepted_desc')}`,
    callback: function(user) {
      if ((user = this[user])) {
        return `${user.firstName} ${user.lastName} ${i18n.t('notifications.job_request_accepted_msg')}`
      }
    },
    propMap: {
      fn: {
        user: true
      },
      template: {
        user: ["firstName", "lastName"]
      }
    }
  }
}

/*
 * Define here all redirects for each notification type
 * Applies to a list of notifications (/notifications)
 *
 * Optional params object can be used to filter things after redirect has been completed
 * Logic has not been implemented yet though! ;(
 */
export const notificationRedirects = {
  "action-document-uploaded": {
    route: "/inspect-uploaded-documents",
    params: {
      param1: "param1",
      param2: "param2"
      // ....more of them
    }
  },

  "action-user-invitation-accepted": {
    generateRoute: function(role) {
      return role === "temp" ? "/candidates" : "/users"
    },
    route: '',
    params: {
      role: ""
      // ....more of them
    }
  },
  "action-sick-leave-cancelled": {
    generateRoute: function(id) {
      return `/candidate-details/${id}#overview`
    },
    route: '',
    params: {
      userId: ""
      // ....more of them
    }
  },
  "action-sick-leave-requested": {
    route: "/requests",
    params: {
      type: "sick-leave"
      // ....more of them
    }
  },
  "action-holiday-requested": {
    route: "/requests",
    params: {
      type: "holiday"
      // ....more of them
    }
  },
  "action-holiday-cancelled": {
    generateRoute: function(id) {
      return `/candidate-details/${id}#overview`
    },
    route:'',
    params: {
      userId: ""
      // ....more of them
    }
  },
  "action-job-signed-off": {
    route: "/jobs",
    params: {
      param1: "param1",
      param2: "param2"
      // ....more of them
    }
  },
  "action-job-request-accepted": {
    route: "/jobs",
    params: {
      param1: "param1",
      param2: "param2"
      // ....more of them
    }
  }
}
