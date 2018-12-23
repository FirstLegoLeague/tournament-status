import React, { Component } from 'react'
import Modal from 'react-foundation-modal'
import Settings from '../services/settings'
import '../../css/components/settings.css'

const SETTINGS_METADATA = {
  nextupMatchesAmount: {
    display: 'Number of Next Up matches',
    type: 'number'
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
    switch (SETTINGS_METADATA[setting.key].type) {
      case 'boolean':
        return this.renderBooleanSetting(setting)
      case 'number':
        return this.renderNumberSetting(setting)
      default:
        return ''
    }
  }

  renderNumberSetting (setting) {
    return (
      <div className="setting grid-x">
          <div>{setting.title}</div>
          <input type="number" id={setting.key} name={setting.key} value={setting.value}
                 onChange={(event) => Settings.set(setting.key, event.target.value)}/>
      </div>)
  }

  renderBooleanSetting (setting) {
    return <div className="setting grid-x">
      <div className="switch">
        <input className="switch-input" type="checkbox" id={setting.key} name={setting.key} checked={setting.value}
               onClick={() => Settings.set(setting.key, !setting.value)}/>
        <label className="switch-paddle" for={setting.key}></label>
      </div>
      <div>{setting.title}</div>
    </div>
  }

  render () {
    const settings = Object.entries(this.state.settings).map(([key, value]) => ({
      key,
      value,
      title: SETTINGS_METADATA[key].display
    }))
    return [<div className="settings show-on-hover button"
                 onClick={() => this.setState({modalIsOpen: !this.state.modalIsOpen})}>
      Settings
    </div>,
      <Modal id="settings-modal" isModal size="small" open={this.state.modalIsOpen}
             closeModal={() => this.setState({modalIsOpen: false})}>
        <h1>Settings</h1>
        {settings.map(setting => this.renderSetting(setting))}
      </Modal>]
  }

}

export default SettingsButton
