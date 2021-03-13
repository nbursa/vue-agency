/*
 * All domain based imports should be listed here (1 domain only for now)
 */
import onBoardingSetupRoutes from '@/components/on-boarding-setup/routes'
import agencySettingsRoutes from '@/components/on-boarding-setup/steps/agency-settings/routes'
import jobManagementRoutes from '@/components/jobs/routes'
import userAuthorizationRoutes from '@/components/user-authorization/routes'
import userManagementRoutes from '@/components/user-management/routes'
import mainViewRoutes from '@/components/shared/routes'
import documentsRoutes from '@/components/documents/routes'
import candidatesRoutes from '@/components/candidates/routes'
import usersRoutes from '@/components/users/routes'
import locationAdminRouters from '@/components/location-admins/routes'
import clientsRoutes from '@/components/clients/routes'
import submitJobRoutes from '@/components/submit-job/routes'
import candidateDocuments from '@/components/candidate-documents/routes'
import inspectDocuments from '@/components/inspect-documents/routes'
import billing from '@/components/billing/routes'
import dashboard from '@/components/dashboard/routes'
import rates from '@/components/rates/routes'
import reports from '@/components/reports/routes'
import notificationRoutes from '@/components/notifications/routes'
import chatRoutes from '@/components/chat/standalone/routes'
import clientsMap from '@/components/clients-map/routes'
import registrationRoutes from '@/components/agency-registration/routes'
import acceptJobsRoute from '@/components/accept-jobs/routes'

//ABSENCE ROUTES - TO BE REMOVED
import absencesOverview from '@/components/absences-overview/routes'

//TMP NEW SUBMIT JOB
import __submitJobRoutes from '@/components/__submit-job/routes'

/*
 * Do not forget to export all that you have imported above
 */
export default [
  ...absencesOverview,
  ...onBoardingSetupRoutes,
  ...jobManagementRoutes,
  ...userAuthorizationRoutes,
  ...userManagementRoutes,
  ...mainViewRoutes,
  ...documentsRoutes,
  ...candidatesRoutes,
  ...usersRoutes,
  ...agencySettingsRoutes,
  ...locationAdminRouters,
  ...clientsRoutes,
  ...submitJobRoutes,
  ...candidateDocuments,
  ...inspectDocuments,
  ...billing,
  ...dashboard,
  ...rates,
  ...reports,
  ...notificationRoutes,
  ...chatRoutes,
  ...clientsMap,
  ...registrationRoutes,
  ...acceptJobsRoute,
  ...__submitJobRoutes
]
