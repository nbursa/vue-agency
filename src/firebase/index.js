import firebase from 'firebase/app'
import 'firebase/messaging'
import { api } from '@/axios'
import store from '@/store'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};


let currentToken = null
let hasPermissions = false
let hasServiceWorker = false
let hasMessaging = false

const sendTokenToServer = (token) => {
  api
    .post('/users/device', {
      oldToken: currentToken,
      newToken: token
    })
    .then((e) => {
      // eslint-disable-next-line no-console
      console.log(e)
    })
}

const messageHandler = function (payload) {
  store.dispatch('notifications/addPushNotification', payload)
}

const tokenRefreshHandler = function () {
  messaging
    .getToken()
    .then(function (refreshedToken) {
      sendTokenToServer(refreshedToken)
    })
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log('Unable to retrieve refreshed token ', err)
    })
}

const saveTokenOnServer = (token) => {
  currentToken = token
  api.post('/devices', {
    token: token,
    type: 'web'
  })
}

let getMessaging = function () {
  try {
    const messaging = firebase.messaging()
    return messaging
  } catch (err) {
    return false
  }
}

firebase.initializeApp(firebaseConfig)
const messaging = getMessaging()
export const getFirebaseToken = () => {
  if (hasServiceWorker || !messaging) {
    return
  }

  if (!hasMessaging) {

    messaging.onMessage(messageHandler)
    messaging.onTokenRefresh(tokenRefreshHandler)
    hasMessaging = true
  }

  if (hasPermissions) {
    messaging.getToken().then(saveTokenOnServer)
  } else {
    navigator.serviceWorker
      .register(
        `/firebase-messaging-sw.js?messagingSenderId=${firebaseConfig.messagingSenderId}`
      )
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              // skip wait
              installingWorker.postMessage('skipWaiting')
            }
          }
        }
        hasServiceWorker = true
        messaging.useServiceWorker(registration)

        messaging
          .requestPermission()
          .then(() => {
            return messaging.getToken()
          })
          .then((token) => {
            hasPermissions = true
            saveTokenOnServer(token)
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log('Permission errors', { err })
            return Promise.reject()
          })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('sw errors', { e })
      })
  }
}

export const invalidateToken = () => {
  let payload = {
    ...(currentToken !== null && {
      device_token: currentToken,
      device_type: 'web'
    })
  }

  return api
    .post('/auth/logout', payload)
    .then(() => {
      return messaging.deleteToken(currentToken).then(function () {
        hasServiceWorker = false
        currentToken = null
        return
      })
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log({ e })
      return Promise.resolve()
    })
}
