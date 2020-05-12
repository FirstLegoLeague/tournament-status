import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import msClient from '@first-lego-league/ms-client'

import environment from '../../src/services/env.js'

chai.use(sinonChai)

const { expect } = chai

console.log('-------------------------------------------------------')

describe('Environment adapter', () => {
  let mockClient

  beforeEach(() => {
    mockClient = { get: () => Promise.resolve(ENV_VARS) }
    sandbox = sinon.createSandbox()

    sandbox.stub(msClient, 'createClient').returns(mockClient)
    sandbox.stub(mockClient, 'get')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('calls ms-client get environment when loading on first time', () => {
    return environment.load()
      .then(() => {
        expect(mockClient.get).to.have.been.calledWith('/environment.json')
      })
  })

  it('does not calls ms-client get environment when loading on second time', () => {
    return environment.load()
      .then(() => environment.load())
      .then(() => {
        expect(mockClient.get).to.have.been.called.once()
      })
  })
})
