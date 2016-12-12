---
title: Channel Capabilities
section: docs
layout: two-column
---

# Channel Capabilities

Smooch makes rich and structured messages deliverable across channels, but sometimes there is variation in how a message will be treated from one messaging platform to another.

We've provided an up to date feature grid to quickly visualize feature support.

| Legend |                          |
|--------|--------------------------|
| ●      | Full channel support     |
| ◐      | Partial channel support  |
|        | No support               |
| n/a    | not available on channel |

## Feature grid

|                                        |         | iOS SDK | Android SDK | Web SDK | SMS | Telegram | Messenger | Line | Email | WeChat | Viber |
|----------------------------------------|---------|---------|-------------|---------|-----|----------|-----------|------|-------|--------|-------|
| Content types                          |         |         |             |         |     |          |           |      |       |        |       |
| Text                                   | SEND    | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
|                                        | RECEIVE | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| Image                                  | SEND    | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
|                                        | RECEIVE | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| GIF                                    | SEND    |         |             | ●       |     | ●        | ●         | ●    | ●     | ●      | ●     |
|                                        | RECEIVE |         |             |         | ●   | ●        | ●         | n/a  | ●     | ●      |       |
| Emoji                                  | SEND    | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
|                                        | RECEIVE | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| Action types                           |         |         |             |         |     |          |           |      |       |        |       |
| Link                                   | SEND    | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| Buy                                    | SEND    | ●       | ●           | ●       | ●   | ●        |           | ●    | ●     | ●      | ●     |
| Postback                               | SEND    | ●       | ●           | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| Replies                                | SEND    |         |             | ●       | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
|                                        |         |         |             |         |     |          |           |      |       |        |       |
| Structured messages                    |         |         |             |         |     |          |           |      |       |        |       |
| Compound message (text, image, button) | SEND    |         |             |         | ●   | ●        | ●         | ●    | ●     | ●      | ●     |
| Carousel                               | SEND    |         |             |         | ◐   | ●        | ●         | ●    | ●     | ◐      |       |
|                                        |         |         |             |         |     |          |           |      |       |        |       |
| Indicators                             |         |         |             |         |     |          |           |      |       |        |       |
| Typing                                 | SEND    | ●       |             | ●       | n/a | ●        | ●         | n/a  | n/a   | n/a    | n/a   |
|                                        | RECEIVE |         |             |         | n/a | n/a      | n/a       | n/a  | n/a   | n/a    | n/a   |
| Read                                   | SEND    |         |             |         | n/a | n/a      |           | n/a  | n/a   | n/a    | n/a   |
|                                        | RECEIVE | ●       | ●           | ●       | n/a | n/a      |           | n/a  |       | n/a    |       |
| Account Linking                        |         |         |             |         |     |          |           |      |       |        |       |
| via Web Messenger                      |         | ●       | ●           | n/a     | ●   | ●        | ●         | ◐    |       | ●      | ●     |
