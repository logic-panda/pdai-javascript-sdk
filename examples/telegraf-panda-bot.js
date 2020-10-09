const Telegraf = require('telegraf')
const { TelegrafPanda } = require('../lib/integrations')

const app = new Telegraf(process.env.PANDA_APP_KEY)
const panda = new TelegrafPanda(process.env.PANDA_APP_KEY)

app.use(Telegraf.memorySession())
app.use(panda.middleware())

// Message handlers
panda.on('message', (ctx) => {
  if (ctx.panda.confidence > 0.01) {
    return ctx.reply(ctx.panda.message)
  }
})

// Action handlers
panda.on('getRoomTemperature', (ctx) => {
  ctx.panda.context.room = firstEntityValue(ctx.panda.entities, 'room')
  ctx.panda.context.roomInfo = `Temperature in ${ctx.panda.context.room} - As usual :)`
})

app.startPolling(30)

function firstEntityValue (entities, entity) {
  const val = entities && entities[entity] &&
  Array.isArray(entities[entity]) &&
  entities[entity].length > 0 &&
  entities[entity][0].value
  if (!val) {
    return null
  }
  return typeof val === 'object' ? val.value : val
}
