/*
 * NOTE: icon file names must conform to the naming convention too
 * so that they can be properly rendered
 * eg. for ConversationMessageNotification, icon filename should be conversation-message
 * so, just strip Notification part from the end and then convert to kebab-case!
 */

export const notificationTypes = [
  "ConversationMessageNotification",
  // "DocumentExpiredNotification",
  "DocumentUploadedNotification",
  // "JobCanceledNotification",
  // "JobPassOnCompletedNotification",
  // "JobSwapCompletedNotification",
  // "JobUpdatedNotification",
  // "SignOffNotification",
  "UserInvitationAcceptedNotification",
  "SickLeaveCancelledNotification",
  "SickLeaveRequestedNotification",
  "HolidayRequestedNotification",
  "HolidayCancelledNotification",
  "JobSignedOffNotification",
  "JobRequestAcceptedNotification"
]
