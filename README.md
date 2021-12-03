# Papyrus <--> Skyrim Platform Bridge

> Communicate _easily_ between Papyrus and Skyrim Platform

# 🌉

Skyrim Platform is lovely.

But communication between Papyrus and Skyrim Platform is not easy.

This makes it really easy!

- [Download](#-download)
- [Setup](#%EF%B8%8F-setup)
- [Quick Start](#-quick-start)
- [Events and Requests](#events-and-requests)
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
    - [`Request`](#)

# 💾 Download

Download the `SkyrimPlatformPapyrusBridge` using your favorite mod manager:

## https://nexus...

> Optionally, download the example mod to get started!

# ⚙️ Setup

After downloading the mod, go ahead and open the directory where it was installed to.

You will find a `PapyrusBridge` folder containing a `papyrusBridge.ts` file.

This is the module you will be using to talk to Papyrus from Skyrim Platform.

If you have a custom modules setup, point to this module from your `tsconfig.json`

If you are using the typical Skyrim Platform plugin setup, copy this file into:

`<Your Skyrim Special Edition Folder>\Data\Platform\Modules\`

This will allow you to use it from your Skyrim Platform scripts.

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
    ; between Papyrus and Skyrim Platform.
    ;
    ; Manually configuring this is optional.
    ; Default: Name of the Papyrus script, e.g. HelloBridge
    ConnectionName = "HelloBridge"
endEvent

event OnConnected()
    ; Do something when connection to Skyrim Platform is established
    RegisterForKey(B_KEY)
endEvent

event OnKeyDown(int keyCode)
    if keyCode == B_KEY && Input.IsKeyPressed(LEFT_SHIFT_KEY)
        ; Tell Skyrim Platform about the key press
        ;
        ; This sends an event.
        ; You can provide an event name and optionally an additional string of data.
        ; By default the event is sent to the "HelloBridge" connection,
        ; but you can specify a target parameter to target a different connection.
        Send("Keyboard Shortcut Pressed")

        ; In addition to 'Send' events (which do not return a response)
        ; you can use 'Request' to actually get a response from SkyrimPlatform
        ; e.g. Request("Name of some query")
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

// Example of replying to Request() calls from Papyrus:
// connection.onRequest((request, reply) => {
//   if (request.query == 'this will be lowercase')
//     reply("Something")
//   else
//     reply("Something else")
// })
```

> 💡 If `'papyrusBridge'` does not autocomplete or your script does not compile, copy the `Platform\Modules\papyrusBridge.ts` file from the downloaded mod to `Skyrim Special Edition\Data\Platform\Modules\`

### VI: Run the Game!

Run the game and press Left Shift + B

You should see the messagebox:

```
The keyboard shortcut was pressed!
```

# Events and Requests

`SkyrimPlatformPapyrusBridge` has 2 main concepts for communication:

- **Events**: _Fire & Forget! These send off a message from SP <--> Papyrus_
- **Requests**: _Get a response! These allow you to get responses from SP <--> Papyrus_

You'll see in the documentation below that both Skyrim Platform and Papyrus provide similar functions for sending/receiving Events and Requests.

# Lower-Case Events / Queries

All event names and request queries **will be lowercase** when read by Skyrim Platform.

This is because Papyrus is case insensitive and _sometimes sends inconsistently-cased event names and request queries_.

# Skyrim Platform Interface

## `getConnection`

Use `getConnection` to get an instance of `PapyrusBridge` which is configured to communicate with an instance of `SkyrimPlatformConnection` on the Papyrus side of things.

```ts
import { getConnection } from 'papyrusBridge'

const connection = getConnection('MyMod')
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
    default {
      reply('You should always reply with something')
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
> event OnEvent(string eventName, string data)
>   Debug.MessageBox("Received event!")
> endEvent
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
> event OnRequest(string replyId, string query, string data)
>   Reply(replyId, "This is the response to this query")
> endEvent
> ```

# Papyrus Interface

## `extends SkyrimPlatformConnection`

To implement a script which is connected to Skyrim Platform, make an **Alias** and have it extend `SkyrimPlatformConnection`

```psc
scriptName MyConnection extends SkyrimPlatformConnection
```

You should **NOT** override these events:

- `OnInit()`
- `OnPlayerLoadGame()`

Instead, see `OnSetup` below

## `OnSetup`

Whenever this connection Alias is initialized -OR- the game is reloaded, `OnSetup()` is invoked.

You can use this to perform any script setup as well as providing a manual configuration for your `ConnectionName`

```psc
scriptName MyScript extends SkyrimPlatformConnection

event OnSetup()
  ConnectionName = "SomeConnectionName"
endEvent
```

By default, `ConnectionName` defaults to the name of the script, e.g. `MyScript` in the example above.

## `OnConnected`

Event executed when a Papyrus connection has successfully connected to its Skyrim Platform counterpart.

This will **never** fire if you do not `getConnection('TheConnectioName')` from Skyrim Platform.

## `OnEvent`

```psc
event OnEvent(string eventName, string data)
  Debug.MessageBox("Received event!")
endEvent
```

## `OnRequest`

```psc
event OnRequest(string replyId, string query, string data)
  Reply(replyId, "This is the response to this query")
endEvent
```

## `Reply`

```psc
event OnRequest(string replyId, string query, string data)
  Reply(replyId, "This is the response to this query")
endEvent
```

## `Send`

```psc
event OnConnected()
  Send("Some Event Name", "[Optional Data Parameter]")
endEvent
```

## `Request`

```psc
event OnConnected()
  string response = Request("Some Query Name", "[Optional Data Parameter]")
  Debug.MessageBox("Received response: " + response)
endEvent
```