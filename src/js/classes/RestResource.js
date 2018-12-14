import Resource from './Resource'

export default class RestResource extends Resource {

  constructor (url, mhubTopic) {
    super(url, mhubTopic)
  }

  reload (data, msg) {
    const promise = super.load()
    return promise
  }
}
