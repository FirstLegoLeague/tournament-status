import EventEmitter from 'event-emitter-es6'

const DEFAULT_SETTINGS = {
  nextupMatchesAmount: 2,
  clock12HoursMode: false,
  showSeconds: false
}
const SETTINGS_KEY = 'settings'

class Settings extends EventEmitter {
  constructor () {
    super()
    this._updateFromlocaStorage()
  }

  get (key) {
    this._updateFromlocaStorage()
    return this.settings[key]
  }

  set (key, value) {
    this.settings[key] = value
    localStorage[SETTINGS_KEY] = JSON.stringify(this.settings)
    this.emit('update')
  }

  clockFormat () {
    const hours = this.settings.clock12HoursMode ? 'h' : 'HH'
    const minutes = ':mm'
    const seconds = this.settings.showSeconds ? ':ss' : ''
    const timeOfDay = this.settings.clock12HoursMode ? ' A' : ''
    return hours + minutes + seconds + timeOfDay
  }

  _updateFromlocaStorage () {
    this.settings = Object.assign(DEFAULT_SETTINGS, localStorage[SETTINGS_KEY] ? JSON.parse(localStorage[SETTINGS_KEY]) : {})
  }
}

export default new Settings()
