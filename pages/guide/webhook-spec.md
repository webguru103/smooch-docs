---
title: Webhook Schema
section: guide
layout: two-column
---

# Webhook Payload Schemas

This guide contains a description of the payloads you can expect to be sent to your server when a Smooch Webhook is triggered. For information on setting up Webhooks see the [receiving messages guide](/guide/receiving-messages/). For example payloads, see the Webhook payload section of the [REST API reference](https://docs.smooch.io/rest/#webhooks-payload).

## message:* payload
| Field      | Type        | Description                                                                                                               |
|------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `trigger`  | String      | `"message"`, `"message:appUser"`, or `"message:appMaker"`                                                                 |
| `app`      | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.       |
| `messages` | Array       | An array of JSON objects representing the messages associated with the event. See the [message schema](/guide/webhook-schema/#message-schema) below for details. |
| `appUser`  | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser schema](/guide/webhook-schema/#appuser-schema) below for details.      |

## conversation:read payload

| Field       | Type        | Description                                                                                                                                  |
|-------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"conversation:read"`                                                                                                                        |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.                          |
| `source`    | JSON Object | A nested JSON object representing the source of the event. See the [source schema](/guide/webhook-schema/#source-schema) below for details.                                        |
| `appUser`   | JSON Object | A nested JSON object representing the **truncated appUser** associated with the event. See the [truncated appUser schema](/guide/webhook-schema/#truncated-appuser-schema) below for details. |
| `timestamp` | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                                              |

## merge:appUser payload

| Field       | Type        | Description                                                                                                                                                       |
|-------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"merge:appUser"`                                                                                                                                                 |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.                                               |
| `surviving` | JSON Object | A nested JSON object with the **truncated appUser** that now represents the merged appUser objects. See the [truncated appUser schema](/guide/webhook-schema/#truncated-appuser-schema) below for details.         |
| `discarded` | Array       | An array of JSON objects with the **truncated appUsers** that were unified into `surviving` appUser object. See the [truncated appUser schema](/guide/webhook-schema/#truncated-appuser-schema) below for details. |

## delivery:success payload

| Field         | Type        | Description                                                                                                               |
|---------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `trigger`     | String      | `"delivery:success"`                                                                                                      |
| `app`         | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.       |
| `messages`    | Array       | An array of JSON objects representing the messages associated with the event. See the [message schema](/guide/webhook-schema/#message-schema) below for details. |
| `appUser`     | JSON Object | A nested JSON object representing the **truncated appUser** associated with the event. See the [appUser schema](/guide/webhook-schema/#truncated-appuser-schema) below for details.      |
| `destination` | JSON Object | A nested JSON object representing the destination of the message. See the [source schema](/guide/webhook-schema/#source-schema) below for details.              |
| `timestamp`   | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                           |

## delivery:failure payload

| Field         | Type        | Description                                                                                                                 |
|---------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| `trigger`     | String      | `"delivery:failure"`                                                                                                        |
| `app`         | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.         |
| `messages`    | Array       | An array of JSON objects representing the messages associated with the event. See the [message schema](/guide/webhook-schema/#message-schema) below for details.   |
| `appUser`     | JSON Object | A nested JSON object representing the **truncated appUser** associated with the event. See the [appUser schema](/guide/webhook-schema/#truncated-appuser-schema) below for details.        |
| `destination` | JSON Object | A nested JSON object representing the destination of the message. See the [source schema](/guide/webhook-schema/#source-schema) below for details.                |
| `timestamp`   | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                             |
| `error`       | JSON Object | A nested JSON object representing the error associated with the delivery failure. See the [error schema](/guide/webhook-schema/#error-schema) below for details. |

## postback payload

| Field       | Type        | Description                                                                                                                 |
|-------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"postback"`                                                                                                                |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [truncated app schema](/guide/webhook-schema/#truncated-app-schema) below for details.         |
| `postbacks` | Array       | An array of JSON objects representing the postbacks associated with the event. See the [postback schema](/guide/webhook-schema/#postback-schema) below for details. |
| `appUser`   | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser schema](/guide/webhook-schema/#appuser-schema) below for details.        |

## postback schema

| Field                                       | Type        | Description                                                                                                                                                                                          |
|---------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` <span class="opt">optional</span> | JSON Object | A nested JSON object representing the message associated with the postback action. See the [message schema](/guide/webhook-schema/#message-schema) below for details (Not present in postback payloads triggered by persistent menu items). |
| `action`                                    | JSON Object | A nested JSON object representing the postback action. See the [action schema](/guide/webhook-schema/#action-schema) below for details.                                                                                                    |

## truncated app schema

| Field | Type   | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| `_id` | String | A canonical ID that can be used to reference the Smooch app that the event is associated with. |

## message schema

| Field                                         | Type        | Description                                                                                                             |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| `_id`                                         | String      | The unique ID for the message.                                                                |
| `text`                                        | String      | The message text.                                                                                                       |
| `role`                                        | String      | The role of the message sender. `"appUser"`, `"appMaker"`, or `"whisper"`.                                                      |
| `authorId`                                    | String      | The appUser's _id if the message `role` is `"appUser"`, otherwise, a hash based on the appMaker's email address.        |
| `name` <span class="opt">optional</span>      | String      | The appUser's friendly name, or an optionally provided appMaker name.                                                   |
| `received`                                    | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                         |
| `source`                                      | JSON Object | A nested JSON object describing the source of the message. See the [source schema](/guide/webhook-schema/#source-schema) below for details.                   |
| `avatarUrl` <span class="opt">optional</span> | String      | The URL for an image of the appMaker.                                                                                   |
| `type`                                        | String      | `"text"`, `"image"`, `"carousel"`, or `"list"`.                                                                                                 |
| `actions`                                     | Array       | An array of JSON objects representing the actions associated with the message. See the [action schema](/guide/webhook-schema/#action-schema) below for details. |

## error schema

| Field             | Type        | Description                                   |
|-------------------|-------------|-----------------------------------------------|
| `code`            | String      | The error code associated with the error.     |
| `underlyingError` <span class="opt">optional</span> | JSON Object | A JSON object with the error data returned by the channel a message was meant to be delivered too. |
| `message` <span class="opt">optional</span> | String | The description associated with the error. |

## source schema

| Field                                  | Type   | Description                                                                                                                                                                                            |
|----------------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`                                 | String | An identifier for the channel from which a message originated. May include one of `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, `"frontendEmail"`, `"api"`, or any number of other channels. |
| `id` <span class="opt">optional</span> | String | An identifier used by Smooch for internal purposes.                                                                                                                                                    |

## action schema

| Field      | Type   | Description                                                                                               |
|------------|--------|-----------------------------------------------------------------------------------------------------------|
| `_id`      | String | A canonical ID.                                                                                           |
| `type`     | String | `"link"`, `"reply"`, `"postback"`, `"share"`, `"location"`, or `"buy"`.                                                        |
| `uri` <span class="opt">optional</span> | String | The URI for a link type button, a checkout page for buy type buttons. May also be an empty string.                                 |
| `text` <span class="opt">optional</span>  | String | The button text.                                                                                          |
| `payload` <span class="opt">optional</span> | String | The payload of an action button like a reply or postback button.                                          |
| `amount` <span class="opt">optional</span>  | Number | An integer representing an amount of money in hundredths of a dollar (or equivalent in other currencies). |
| `currency` <span class="opt">optional</span> | String | An ISO 4217 standard currency code in lowercase.                                                          |
| `state` <span class="opt">optional</span> | String | The value "offered", sent with a buy action type.                                                     |

## truncated appUser schema
The truncated appUser is a partial selection of properties from the appUser model. The truncated appUser is provided in the payloads of the following payload types:
- [conversation:read](/guide/webhook-spec/#conversationread-payload)
- [merge:appUser](/guide/webhook-spec/#mergeappuser-payload)
- [delivery:success](/guide/webhook-spec/#deliverysuccess-payload)
- [delivery:failure](/guide/webhook-spec/#deliveryfailure-payload)


| Field | Type   | Description                                              |
|-------|--------|----------------------------------------------------------|
| `_id` | String | A canonical ID that can be used to retrieve the appUser. |
| `userId` <span class="opt">optional</span>    | String      | An optional ID that if specified can also be used to retrieve the appUser.                                                |
| `conversationStarted` <span class="opt">optional</span> | Boolean     | A boolean representing of whether a message has been sent or not.                                                         |


## appUser schema

| Field                                         | Type        | Description                                                                                                               |
|-----------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `_id`                                         | String      | A canonical ID that can be used to retrieve the appUser.                                                                  |
| `userId` <span class="opt">optional</span>    | String      | An optional ID that if specified can also be used to retreive the appUser.                                                |
| `properties`                                  | JSON Object | A flat JSON Object of optional properties set by the app maker.                                                           |
| `signedUpAt`                                  | String      | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the moment an appUser was created.                |
| `clients`                                     | Array       | An array of JSON objects representing the clients associated with the appUser. See the [client schema](/guide/webhook-schema/#client-schema) below for details. |
| `pendingClients`                              | Array       | As clients, but containing linked clients which have not been confirmed yet (i.e. Twilio SMS)                             |
| `devices`                                     | Array       | Identical to the clients array, but **deprecated**.                                                                |
| `conversationStarted` | Boolean     | A boolean representing of whether a message has been sent or not.                                                         |
| `credentialRequired`                          | Boolean     | A boolean representing whether the appUser is secured by a JSON Web Token or not.                                         |
| `email` <span class="opt">optional</span>     | String      | An optional email address.                                                                                                |
| `givenName` <span class="opt">optional</span> | String      | An optional given name.                                                                                                   |
| `surname` <span class="opt">optional</span>   | String      | An optional surname.                                                                                                      |

## client schema

| Field                                          | Type        | Description                                                                                                                                    |
|------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `active`                                       | Boolean     | If active is `false` then the appUser is not logged in to the client and signifies that the appUser will not receive APN or FCM notifications. This pertains to the SDKs. |
| `lastSeen`                                     | String      | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the last time the appUser sent a message, or launched a client like Web, Android, or iOS.  |
| `platform`                                     | String      | Includes one of `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, and `"frontendEmail"`, `"other"`, or any number of other platforms. |
| `id`                                           | String      | A unique identifier for a device if on Web, iOS, or Android, or a client on other channels.                                                                                                                          |
| `info` <span class="opt">optional</span>       | JSON Object | A nested flat JSON Object With information particular to the client platform. See the [client info schema](/guide/webhook-schema/#client-info-schema) below for details.                  |
| `appVersion` <span class="opt">optional</span> | String      | For the SDK in a native app, signifies the version of the app.                                                                                  |
| `linkedAt` <span class="opt">optional</span>   |             | If the channel was linked to a pre-existing appUser, a timestamp signifying when the linking occurred. Formatted as **yyyy-mm-ddThh:mm:ssZ**   |

## client info schema

Client info is highly variable, but when available can be found in the following fields.

| Field                   | Type   | Description                                              |
|-------------------------|--------|----------------------------------------------------------|
| `sdkVersion` <span class="opt">optional</span>             | String | Available on `"web"`, `"ios"`, and `"android"` platforms |
| `currentTitle` <span class="opt">optional</span>           | String | Available on `"web"` platform                            |
| `currentUrl` <span class="opt">optional</span>             | String | Available on `"web"` platform                            |
| `browserLanguage` <span class="opt">optional</span>        | String | Available on `"web"` platform                            |
| `referrer` <span class="opt">optional</span>               | String | Available on `"web"` platform                            |
| `userAgent` <span class="opt">optional</span>              | String | Available on `"web"` platform                            |
| `URL` <span class="opt">optional</span>                    | String | Available on `"web"` platform                            |
| `wifi` <span class="opt">optional</span>                   | String | Available on `"ios"`, and `"android"` platforms          |
| `os` <span class="opt">optional</span>                     | String | Available on `"ios"`, and `"android"` platforms          |
| `appName` <span class="opt">optional</span>                | String | Available on `"ios"`, and `"android"` platforms          |
| `osVersion` <span class="opt">optional</span>              | String | Available on `"ios"`, and `"android"` platforms          |
| `installer` <span class="opt">optional</span>              | String | Available on `"ios"`, and `"android"` platforms          |
| `devicePlatform` <span class="opt">optional</span>         | String | Available on `"ios"`, and `"android"` platforms          |
| `buildNumber` <span class="opt">optional</span>            | String | Available on `"ios"`, and `"android"` platforms          |
| `carrier` <span class="opt">optional</span>                | String | Available on `"ios"`, and `"android"` platforms          |
| `appId` <span class="opt">optional</span>                  | String | Available on `"ios"`, and `"android"` platforms          |
| `radioAccessTechnology` <span class="opt">optional</span>  | String | Available on `"ios"`, and `"android"` platforms          |
| `avatarUrl` <span class="opt">optional</span>              | String | Available on `"messenger"` platform                      |
| `openid` <span class="opt">optional</span>                 | String | Available on `"wechat"` platform                         |
| `sex` <span class="opt">optional</span>                    | String | Available on `"wechat"` platform                         |
| `language` <span class="opt">optional</span>               | String | Available on `"wechat"` platform                         |
| `city` <span class="opt">optional</span>                   | String | Available on `"wechat"` platform                         |
| `province` <span class="opt">optional</span>               | String | Available on `"wechat"` platform                         |
| `country` <span class="opt">optional</span>                | String | Available on `"wechat"` platform                         |
| `headimgurl` <span class="opt">optional</span>             | String | Available on `"wechat"` platform                         |
| `subscribe_time` <span class="opt">optional</span>         | Number | Available on `"wechat"` platform                         |
| `phoneNumber` <span class="opt">optional</span>            | String | Available on `"twilio"` platform                         |
| `country` <span class="opt">optional</span>                | String | Available on `"twilio"` platform                         |
| `city` <span class="opt">optional</span>                   | String | Available on `"twilio"` platform                         |
| `state` <span class="opt">optional</span>                  | String | Available on `"twilio"` platform                         |
