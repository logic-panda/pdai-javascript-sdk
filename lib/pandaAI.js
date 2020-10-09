const debug = require('debug')('panda-api')
const fetch = require('node-fetch')
const qs = require('qs')

class PandaAI {
  constructor (key, opts) {
    this.key = key
    this.opts = Object.assign({
      apiRoot: 'http://localhost:5000', // 'https://ai.logicpanda.app',
      apiVersion: 'v1'
    }, opts)
  }

  meaning (message, msgId, threadId, context) {
    const params = {
      q: message,
      msg_id: msgId,
      thread_id: threadId,
      key: this.key,
      context: JSON.stringify(context || {})
    }
    const url = `${this.opts.apiRoot}/${this.apiVersion}/message?${qs.stringify(params)}`
    debug('meaning call', url)
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
  }

  converse (sessionId, message, context) {
    const params = {
      session_id: sessionId,
      key: this.key,
      q: message
    }
    const url = `${this.opts.apiRoot}/${this.apiVersion}/converse?${qs.stringify(params)}`
    debug('converse call', url)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context || {})
    }).then((response) => response.json())
  }
}

module.exports = PandaAI
