export default class ReportFile {
  static from({file, config}) {
    try {
      let blobFile = new Blob([file], { type: config.fileType });
      return new ReportFile({blobFile, config})
    } catch (_) {
      return null
    }
  }
  constructor({
    blobFile,
    config
  }) {
    this.file = blobFile
    this.URL = window.URL || window.webkitURL
    this.download = null
  }

  generate() {
    this.download = this.URL.createObjectURL(this.file)
  }

  revoke() {
    setTimeout(() => {
      this.URL.revokeObjectURL(this.download)
      this.download = null
    }, 100)
  }

  get fileUrl() {
    this.generate()
    return this.download
  }

}
