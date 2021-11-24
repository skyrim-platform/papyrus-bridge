# Papyrus <--> Skyrim Platform Bridge ~ Prototype v2

## Monday Night

- [x] await
- [x] Lock da Forks!
- [ ] Mod 'contexts' -> `getMod` -> `channel` -> `context`
    - Event Channel?
- [ ] blocking reply

## DONE

- onMessage / sendMessage <--- remove or rename like onRawMessage and sendRawMessage
- onEvent / sendEvent

## TODO

- [x] Lock 69 Forks
- Reply (sync and async)
    - [x] Can reply from Papyrus to SP
        - [x] Can use await
        - [x] Can use callback
    - [ ] Can reploy from SP to Papyrus
        - [ ] Blocking
        - [ ] Non-blocking (???)
- Event scoping to a "Mod" concept
- Targeting specific "Mod" targets with messages
- Mutliple Forks with Locking (and flip between RemoveItem and AddItem, state tracking per fork, update containerChanged to check newContainer OR oldContainer)