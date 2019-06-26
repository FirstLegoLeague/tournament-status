import axios from 'axios'
import Promise from 'bluebird'

import Messenger from '../services/messenger.js'

export default class Resource {
  urlPromise
  url
  mhubTopic
  data
  onReload

  constructor (urlPromise, mhubTopic) {
    this.urlPromise = urlPromise.then(url => { this.url = url })
    this.mhubTopic = mhubTopic
    Messenger.init()
    Messenger.on(this.mhubTopic, this.reload.bind(this))
    this.load()
  }

  load () {
    return this.urlPromise
      .then(() => axios.get(this.url))
      .then(response => {
        this.data = response.data
        if (this.onReload) {
          this.onReload()
        }
        return this.data
      })
  }

  reload (data, msg) {
    throw new Error('reload method not implemented')
  }

  get data () {
    if (this._data) {
      return Promise.resolve(this._data)
    }

    return this.load()
  }

  set data (value) {
    this._data = value
  }
}
