# Papyrus <--> Skyrim Platform Bridge

> Communicate _easily_ between Papyrus and Skyrim Platform

# 🌉

Skyrim Platform is lovely.

But communication between Papyrus and Skyrim Platform is not easy.

This makes it really easy!

# 💾

To install, simply download using your favorite mod manager.

https://some/nexus/link

Depending on your TypeScript setup, you will also want to open the mod folder and copy the `Platform\Modules\papyrusBridge.ts` file from the downloaded mod to `Skyrim Special Edition\Data\Platform\Modules\`

# 🎓

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
    ConnectionName = "HelloBridge"
endEvent

event OnConnected()
    ; Do something when connection to Skyrim Platform is established
    RegisterForKey(B_KEY)
endEvent

event OnKeyDown(int keyCode)
    if keyCode == B_KEY && Input.IsKeyPressed(LEFT_SHIFT)
        ; Tell Skyrim Platform about the key press
        Send("Keyboard Shortcut Presed")
    endIf
endEvent
```

### V: Create Skyrim Platform Script

Add the following to a new or existing `.ts` script in your plugin:

```ts
import { getConnection } from "papyrusBridge";

// Get a connection to your Papyrus code.
// The connection name should be the same here as in Papyrus.
const papyrus = getConnection("HelloBridge");

papyrus.onEvent((event) => {
  if (event.eventName == "Keyboard Shortcut Presed") {
    // Note: onEvent can be called in contexts where `Debug.messageBox` does not work.
    // You can use `once('update')` to be able to `Debug.messageBox`
    once("update", () => {
      Debug.messageBox("The keyboard shortcut was pressed!");
    });
  }
});
```

> 💡 If `'papyrusBridge'` does not autocomplete or your script does not compile, copy the `Platform\Modules\papyrusBridge.ts` file from the downloaded mod to `Skyrim Special Edition\Data\Platform\Modules\`

### VI: Run the Game!

Run the game and press Left Shift + B

You should see the
