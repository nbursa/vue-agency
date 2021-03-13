export const rowFilter = (item) => {
    if (item && item.trim) {
      item = item.trim()
    }

    if (item === "" || item === null) {
      item = "--"
    }

    if (typeof item === 'object') {
      return item.name
    }

    return item
  }