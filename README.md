# Papyrus <--> Skyrim Platform Bridge

> Communicate _easily_ between Papyrus and Skyrim Platform

# 🌉

Skyrim Platform is lovely.

But communication between Papyrus and Skyrim Platform is not easy.

This makes it really easy!

- [Download](#-download)
- [Setup](#%EF%B8%8F-setup)
- [Quick Start](#-quick-start)
- [Skyrim Platform Interface](#)
  - [`getConnection`](#)
  - [`onConnected`](#)
  - [`onEvent`](#)
  - [`onRequest`](#)
  - [`send`](#)
  - [`request`](#)
- [Papyrus Interface](#)
  - [`OnSetup`](#)
  - [`OnConnected`](#)
  - [`OnEvent`](#)
  - [`OnRequest`](#)
  - [`Reply`](#)
  - [`Send`](#)
  - [`Request`](#)
  - [`SkyrimPlatformBridge`](#)
    - [`SendEvent`](#)
    - [`Reply`](#)
    - [`ListenForEvents`](#)

# 💾 Download

x `TODO`

# ⚙️ Setup

x

# 🎓 Quick Start

## Hello, world!

A common use-case nowadays for using Papyrus alongside Skyrim Platform is:

- Using Papyrus to capture Papyrus events.

In this example, we'll capture a keyboard event and send it to Skyrim Platform.

> 💡 As of 2021, Skyrim Platform supports [listening for Papyrus Events](https://github.com/skyrim-multiplayer/skymp/blob/main/docs/skyrim_platform/events.md) triggered on objects in the game, but it is very slow and not recommended at this time.

### I. Create a Skyrim Mod (.esp)

Name it something like `HelloBridge.esp`

### II. Setup a Reference Alias for PlayerRef

I'm assuming you know how to create a new Quest and setup a Quest Alias pointing to the PlayerRef.

If not, see this video: [Attaching Skyrim scripts to player events](https://www.youtube.com/watch?v=zqaef3ETChU&list=PLektTyeQhBZdV_qI4uQcbOSBJ_QemyhsR&index=6)

### III. Create Your Papyrus Script

Add an attached script to the PlayerRef alias, e.g. `HelloBridge`

### IV. Edit Script

We'll be using `SkyrimPlatformConnection` which is a base script used to simplify communication between _your mod's_ Papyrus and _your mod's_ TypeScript.

Later, we'll look at using the `SkyrimPlatformBridge` Papyrus script which can be used globally from any Papyrus Script.

Update `HelloBridge.psc` with the following code:

```psc
scriptName HelloBridge extends SkyrimPlatformConnection

; Let's say we will do something when you press
; Left Shift + B
int LEFT_SHIFT_KEY = 42
int B_KEY = 48

event OnSetup()
    ; The 'Connection Name' is used to establish a connection
    ; between Papyrus and Skyrim Platform
    ConnectionName = 'HelloBridge'
endEvent

event OnConnected()
    ; Do something when connection to Skyrim Platform is established
    RegisterForKey(B_KEY)
endEvent

event OnKeyDown(int keyCode)
    if keyCode == B_KEY && Input.IsKeyPressed(LEFT_SHIFT_KEY)
        ; Tell Skyrim Platform about the key press
        Send('Keyboard Shortcut Pressed')
    endIf
endEvent
```

### V: Create Skyrim Platform Script

Add the following to a new or existing `.ts` script in your plugin:

```ts
import { getConnection } from 'papyrusBridge'
import { once, Debug } from 'skyrimPlatform'

// Get a connection to your Papyrus code.
// The connection name should be the same here as in Papyrus.
const connection = getConnection('HelloBridge')

connection.onEvent((event) => {
  // NOTE! Event names from papyrus.onEvent are ALWAYS LOWERCASE
  if (event.eventName == 'keyboard shortcut pressed') {
    // Note: onEvent can be called in contexts where `Debug.messageBox` does not work.
    // You can use `once('update')` to be able to `Debug.messageBox`
    once('update', () => {
      Debug.messageBox('The keyboard shortcut was pressed!')
    })
  }
})
```

> 💡 If `'papyrusBridge'` does not autocomplete or your script does not compile, copy the `Platform\Modules\papyrusBridge.ts` file from the downloaded mod to `Skyrim Special Edition\Data\Platform\Modules\`

### VI: Run the Game!

Run the game and press Left Shift + B

You should see the messagebox:

```
The keyboard shortcut was pressed!
```

# Skyrim Platform Interface

## `getConnection`

Use `getConnection` to get an instance of `PapyrusBridge` which is configured to communicate with an instance of `SkyrimPlatformConnection` on the Papyrus side of things.

```ts
// TODO
```

## `onConnected`

Event triggered when the Papyrus connection successfully connects with the Skyrim Platform connection

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')

connection.onConnected(() => {
  // Do something
})
```

## `onEvent`

Received events send by Papyrus via `Send()`.

Events contain `eventName` and `data` properties.

> ❗ IMPORTANT: The `eventName` will ALWAYS BE IN LOWERCASE.

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')

connection.onEvent((event) => {
  switch (event.eventName) {
    case 'myEvent': {
      // do something with event.data
      break
    }
  }
})
```

## `onRequest`

Received requests send by Papryrus via `Request()`

You should `reply()` to these requests!

Events contain `query` and `data` properties.

> ❗ IMPORTANT: The `query` will ALWAYS BE IN LOWERCASE.

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')

connection.onRequest((request, reply) => {
  switch (event.query) {
    case 'playerName': {
      // optionally do something with event.data
      once('update', () => {
          reply(Game.getPlayer()?.getBaseObject()?.getName())
      })
      break
    }
  }
})
```


## `send`

Sends an event to Papyrus.

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')

connection.onConnected(() => {
    connection.send('someEventName', '[optional data]')
})
```

> To receive a `send()` event on Papyrus side:
>
> ```psc
> ;
> ```

## `request`

Makes an asynchronous request to Papyrus to get a response.

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')

connection.onConnected(async () => {
    const response = await connection.request('some/query', '[optional data]')
    // optionally do something with response.data
    once('update', () => {
        Debug.messageBox(`Response for some/query: ${response.data}`)
    })
})
```

> To response to a `request()` on Papyrus side:
>
> ```psc
> ;
> ```

# Papyrus Interface

## `OnSetup`

## `OnConnected`

## `OnEvent`

## `OnRequest`

## `Reply`

## `Send`

## `Request`
