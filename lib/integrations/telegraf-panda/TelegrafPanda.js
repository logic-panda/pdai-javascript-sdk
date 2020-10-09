const { mount, compose } = require('telegraf')
const Context = require('./context')
const PandaAI = require('../../pandaAI')

class TelegrafPanda {
  constructor (key, opts) {
    this.opts = Object.assign({maxHops: 20}, opts)
    this.pandaAI = new PandaAI(key, this.opts)
    this.hadlers = new Map()
    this.on('error', () => {
      console.error('error: Check your "action" and "merge" handlers')
    })
    this.on('clear-context', (ctx) => {
      ctx.panda.context = null
    })
  }

  on (action, ...fns) {
    this.hadlers.set(action, compose(fns))
    return this
  }

  meaning (...args) {
    return this.pandaAI.meaning(...args)
  }

  middleware () {
    return mount('text', (ctx, next) => {
      if (!ctx.session) {
        throw new Error("Can't find session")
      }
      ctx.panda = new Context(this.pandaAI, ctx, this.hadlers)
      return ctx.panda.handleConversation(`${ctx.message.chat.id}-${ctx.message.from.id}`, ctx.message.text, this.opts.maxHops)
    })
  }
}

module.exports = TelegrafPanda
