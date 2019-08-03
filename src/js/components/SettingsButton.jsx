import React, { Component } from 'react'

import Settings from '../services/settings'
import '../../css/components/settings.css'
import { Button, Header, Checkbox, Modal, Input } from 'semantic-ui-react'

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
    const min = setting.metadata.min ? setting.metadata.min : -999
    const max = setting.metadata.max ? setting.metadata.max : 999
    return (
      <div className='setting'>
        <div>{setting.metadata.display}</div>
        <Input fluid type='number' id={setting.key} name={setting.key} value={setting.value}
               onChange={event => Settings.set(setting.key, event.target.value)}
               min={min} max={max}/>
      </div>)
  }

  renderBooleanSetting (setting) {
    return <div className='setting row'>
      <div className='switch'>
        <Checkbox toggle label={setting.metadata.display} className='switch-input' id={setting.key} name={setting.key} checked={setting.value}
               onClick={() => Settings.set(setting.key, !setting.value)}/>
      </div>
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

    const modalTrigger = (<Button primary
                                  onClick={() => this.setState({modalIsOpen: !this.state.modalIsOpen})}>
      Settings
    </Button>)

    return <Modal id='settings-modal'
                  trigger={modalTrigger}
                  open={this.state.modalIsOpen}
                  dimmer='blurring'
                  closeIcon
                  onClose={() => this.setState({modalIsOpen: false})}>
      <Header>Settings</Header>
      <Modal.Content>
        {settings.map(setting => this.renderSetting(setting))}
      </Modal.Content>
    </Modal>

  }
}

export default SettingsButton
