/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js')

const myId = new URL(location).searchParams.get('messagingSenderId')

const config = {
  apiKey: "AIzaSyBdQN2ERYEo1P-xh6JpRWyBErpCxGbyvzM",
  projectId: "realday-io",
  messagingSenderId: "513316494119",
  appId: "1:513316494119:web:479c8295b8ad1dbca4a702"
};

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {
  // console.log('[worker] Received push notification: ', payload)
  return self.registration.showNotification(payload.title, payload)
})

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})
