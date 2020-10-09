const debug = require('debug')('telegraf:panda-context')

const noop = () => {
  return Promise.resolve()
}

class Context {
  constructor (pandaAi, ctx, handlers) {
    this.pandaAi = pandaAi
    this.ctx = ctx
    this.handlers = handlers
    this.state = Object.assign({}, ctx.session.__panda)
  }

  get session () {
    this.ctx.session._panda = this.ctx.session._panda || {}
    return this.ctx.session._panda
  }

  get context () {
    this.session.context = this.session.context || {}
    return this.session.context
  }

  set context (value) {
    this.session.context = value
  }

  getHandler (action) {
    return this.handlers.get(action) || noop
  }

  handleConversation (sessionId, message, hops) {
    if (hops === 0) {
      console.error('error: Too much hops')
      return this.getHandler('error')(this.ctx)
    }
    return this.pandaAi.converse(sessionId, message, this.context).then((response) => {
      debug('response', hops, JSON.stringify(response, null, 2))
      this.entities = response.entities
      this.confidence = response.confidence
      this.quickReplies = response.quickreplies
      this.message = response.msg
      var action = response.action
      switch (response.type) {
        case 'stop':
          return Promise.resolve()
        case 'error':
          return this.getHandler('error')(this.ctx)
        case 'msg':
          action = 'message'
          break
        case 'merge':
          action = 'merge'
          break
      }
      return this.getHandler(action)(this.ctx).then(() => {
        return this.handleConversation(sessionId, null, hops - 1)
      })
    })
  }
}

module.exports = Context
