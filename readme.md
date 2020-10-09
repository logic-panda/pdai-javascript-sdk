[![Build Status](https://img.shields.io/travis/logic-panda/sdk.svg?branch=master&style=flat-square)](https://travis-ci.org/logic-panda/sdk)
[![NPM Version](https://img.shields.io/npm/v/logic-panda/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@logic-panda/sdk)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# LogicPanda AI + Javascript SDK

[logicpanda.app](https://logicpanda.app/)

> Easily create text bots that humans can chat with on their preferred messaging platform.
>
> -- <cite>ai.logicpanda.app</cite>

## Installation

```js
$ npm install @logic-panda/sdk
```

## Integrations

#### Telegraf integration example
  
```js
import Telegraf from 'telegraf';
import { TelegrafPanda } from '@logic-panda/sdk/integrations'

const telegraf = new Telegraf(BOT_TOKEN)
const panda = new TelegrafPanda(APP_KEY)

telegraf.on('text', (ctx) => {
  return panda.getMeaning(ctx.message.text)
    .then((result) => {
      // reply to user with wit result
      return ctx.reply(JSON.stringify(result, null, 2))
    })
})

telegraf.startPolling()

```


There are some other [examples](https://github.com/logic-panda/pdai-javascript-sdk/tree/master/examples).


## Error Handling

To perform custom error-handling, you can set `onError` handler:

```js
panda.on('error', (ctx) => {
  console.error('error', err)
}
```
