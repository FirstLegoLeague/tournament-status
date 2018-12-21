import Resource from './Resource'

export default class RestResource extends Resource {

  constructor (url, mhubTopic) {
    super(url, mhubTopic)
  }

  setUrl(url){
    this.url = url
  }

  reload (data, msg) {
    const promise = super.load()
    return promise
  }
}
