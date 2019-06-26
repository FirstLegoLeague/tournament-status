import axios from 'axios'

const ENV_URL = '/environment.json'

class Environment {
  load () {
    if (!this._loadingPromise) {
      this._loadingPromise = axios.get(ENV_URL).then(response => {
        Object.assign(this, response.data)
        return this
      })
    }

    return this._loadingPromise
  }
}

export default new Environment()
