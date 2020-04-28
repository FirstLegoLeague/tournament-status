import { EntityClient } from '@first-lego-league/synced-resources'

import Environment from '../env'
import { Settings } from '../../resources/settings'

const createSettingsClient = () => {
  return Environment.load()
    .then(env => new EntityClient(Settings, `${env.moduleTournamentUrl}/settings`, { messengerOptions: { mhubURI: env.mhubUri } }))
    .then(settingsClient => settingsClient.init().then(() => settingsClient))
}

export default createSettingsClient
