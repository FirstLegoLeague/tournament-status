import Resource from './Resource'

export default class MhubResource extends Resource {

  constructor (url, mhubTopic) {
    super(url, mhubTopic)
  }

  reload (data, msg) {
    this.data = data.data
    if (this.onReload) {
      this.onReload()
    }
  }
}
