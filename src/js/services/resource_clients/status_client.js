import { EntityClient } from '@first-lego-league/synced-resources'

import Environment from '../env'
import { Status } from '../../resources/status'
import { Match } from '../../resources/match'

const createStatusClient = () => {
  return Environment.load()
    .then(env => new EntityClient(Status, `${env.moduleTournamentUrl}/status`, { messengerOptions: { mhubURI: env.mhubUri } }))
    .then(statusClient => statusClient.init().then(() => statusClient))
    .then(statusClient => {
      statusClient.getNextMatches = (limit, filters) => {
        const url = `${statusClient._resourceServerUrl}/next?filters=${filters || ''}` + (limit ? `&limit=${limit}` : '')
        return statusClient._client.get(url)
          .then(({ data }) => data.map(datum => new Match(datum)))
      }
      return statusClient
    })
}

export default createStatusClient
