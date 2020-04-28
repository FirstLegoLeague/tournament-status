import { CollectionClient } from '@first-lego-league/synced-resources'

import Environment from '../env'
import { Table } from '../../resources/table'

const createTablesClient = () => {
  return Environment.load()
    .then(env => new CollectionClient(Table, `${env.moduleTournamentUrl}/tables`, { messengerOptions: { mhubURI: env.mhubUri } }))
    .then(tablesClient => tablesClient.init().then(() => tablesClient))
}

export default createTablesClient
