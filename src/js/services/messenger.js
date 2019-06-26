import Promise from 'bluebird'

import Environment from './env.js'

const MESSAGE_TYPES = {
  SUBSCRIBE: 'subscribe',
  LOGIN: 'login',
  PUBLISH: 'publish'
}
const NODE = 'protected'
const IDENTITY_TOKEN_KEY = 'client-id'
const RETRY_TIMEOUT = 1000 // second

class Messenger {
  init () {
    const self = this

    if (!this._openingPromsie) {
      this._openingPromsie = Environment.load().then(env => {
        this.ws = new WebSocket(env.mhubUri)
        this.open = false
        this.headers = {}
        this.headers[IDENTITY_TOKEN_KEY] = parseInt(Math.floor(0x100000 * (Math.random())), 16)
        this.listeners = this.listeners || []

        let node = NODE

        if (env.mhubNode) {
          node = env.mhubNode
        }

        return new Promise((resolve, reject) => {
          self.ws.onopen = function () {
            self.ws.send(JSON.stringify({
              type: MESSAGE_TYPES.SUBSCRIBE,
              node: node
            }))

            self.open = true
            console.log('Connected to mhub')
            resolve(self.ws)
          }

          self.ws.onerror = function (e) {
            console.warn(e)
          }

          self.ws.onclose = function () {
            self.open = false
            console.log('Disonnected from mhub')
            setTimeout(() => {
              console.log('Retrying mhub connection')
              self._openingPromsie = null
              self.init()
            }, RETRY_TIMEOUT)
          }

          self.ws.onmessage = function (msg) {
            const data = JSON.parse(msg.data)
            const headers = data.headers
            const topic = data.topic

            msg.from = headers[IDENTITY_TOKEN_KEY]
            msg.fromMe = (msg.from === self.token)

            self.listeners.filter(listener => {
              return (typeof (listener.topic) === 'string' && topic === listener.topic) ||
                (listener.topic instanceof RegExp && topic.upcomingMatches(listener.topic))
            }).forEach(listener => listener.handler(data, msg))
          }
        })
      })
    }

    return this._openingPromsie
  }

  on (topic, handler, ignoreSelfMessages) {
    return this.init()
      .then(() => {
        this.listeners.push({
          topic: topic,
          handler: (data, msg) => {
            if (!(msg.fromMe && ignoreSelfMessages)) { handler(data, msg) }
          }
        })
      })
  }

  send (topic, data) {
    return this.init().then(ws => {
      ws.send(JSON.stringify({
        type: MESSAGE_TYPES.PUBLISH,
        node: NODE,
        topic: topic,
        data: data || {},
        headers: this.headers
      }))
    })
  }
}

export default new Messenger()
