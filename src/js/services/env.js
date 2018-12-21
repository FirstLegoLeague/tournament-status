import axios from 'axios'

let ENV_URL = 'https://d7db94c7-7bc9-43c8-b4e7-e41b0b42364d.mock.pstmn.io/environment.json'

class Environment {

	load() {
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
