import Resource from './Resource'

export default class MhubResource extends Resource {
  reload (data, msg) {
    this.data = data.data
    if (this.onReload) {
      this.onReload()
    }
  }
}
