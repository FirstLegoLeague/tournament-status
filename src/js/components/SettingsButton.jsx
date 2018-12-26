import React, { Component } from 'react'
import Modal from 'react-foundation-modal'
import Settings from '../services/settings'
import '../../css/components/settings.css'

const SETTINGS_METADATA = {
  nextupMatchesAmount: {
    display: 'Number of Next Up matches',
    type: 'number',
    min: 0,
    max: 5
  }
}

class SettingsButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      settings: Settings.settings,
      modalIsOpen: false
    }

    Settings.on('update', () => {
      this.setState({settings: Settings.settings})
    })
  }

  renderSetting (setting) {
    switch (setting.metadata.type) {
      case 'boolean':
        return this.renderBooleanSetting(setting)
      case 'number':
        return this.renderNumberSetting(setting)
      default:
        return ''
    }
  }

  renderNumberSetting (setting) {
    let min = setting.metadata.min ? setting.metadata.min : -999
    let max = setting.metadata.max ? setting.metadata.max : 999
    return (
      <div className="setting grid-x">
        <div>{setting.metadata.display}</div>
        <input type="number" id={setting.key} name={setting.key} value={setting.value}
               onChange={(event) => Settings.set(setting.key, event.target.value)}
               min={min} max={max}/>
      </div>)
  }

  renderBooleanSetting (setting) {
    return <div className="setting grid-x">
      <div className="switch">
        <input className="switch-input" type="checkbox" id={setting.key} name={setting.key} checked={setting.value}
               onClick={() => Settings.set(setting.key, !setting.value)}/>
        <label className="switch-paddle" for={setting.key}></label>
      </div>
      <div>{setting.metadata.display}</div>
    </div>
  }

  render () {
    const settings = Object.keys(this.state.settings).map(key => {
      return {
        key,
        metadata: SETTINGS_METADATA[key],
        value: this.state.settings[key]
      }
    })
    console.log(settings)
    return [
      <div className="settings show-on-hover button"
           onClick={() => this.setState({modalIsOpen: !this.state.modalIsOpen})}>
        Settings
      </div>,

      <Modal id="settings-modal" isModal size="small" open={this.state.modalIsOpen}
             closeModal={() => this.setState({modalIsOpen: false})}>
        <h1>Settings</h1>
        {settings.map(setting => this.renderSetting(setting))}
      </Modal>
    ]
  }

}

export default SettingsButton
