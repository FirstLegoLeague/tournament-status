import axios from 'axios'

let ENV_URL = 'http://localhost:3001/environment.json'
if(process.env.DEV){
	ENV_URL = 'http://localhost:3001/environment.json'
}
class Environment {

	load () {
		if(!this._loadingPromise) {
			this._loadingPromise = axios.get(ENV_URL).then(response => {
				Object.assign(this, response.data)
				return this
			})
		}

		return this._loadingPromise
	}

}

export default new Environment()
