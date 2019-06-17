import Resource from './Resource'

export default class RestResource extends Resource {
  setUrl (url) {
    this.url = url
  }

  reload (data, msg) {
    return super.load()
  }
}
