import localforage from "localforage"

localforage.config({
  name: "Realday",
  driver: localforage.LOCALSTORAGE
})

export { localforage }
