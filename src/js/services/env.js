import { createClient } from '@first-lego-league/ms-client'

const ENV_URL = '/environment.json'

class Environment {
  load () {
    if (!this._loadingPromise) {
      this._loadingPromise = createClient().get(ENV_URL).then(response => {
        Object.assign(this, response.data)
        return this
      })
    }

    return this._loadingPromise
  }
}

export default new Environment()
