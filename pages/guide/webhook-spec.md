---
title: Webhook Spec
section: guide
layout: two-column
---

# Webhook Payload Specifications

This guide contains a description of the payloads you can expect to be sent to your server when a Smooch Webhook is triggered. For information on setting up Webhooks see the [receiving messages guide](/guide/receiving-messages/). For example payloads, see the Webhook payload section of the [REST API reference](https://docs.smooch.io/rest/#webhooks-payload).

## message:* payload
| Field      | Type        | Description                                                                                                               |
|------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `trigger`  | String      | `"message"`, `"message:appUser"`, or `"message:appMaker"`                                                                 |
| `app`      | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.       |
| `messages` | Array       | An array of JSON objects representing the messages associated with the event. See the [message spec](/guide/webhook-spec/#message-spec) below for details. |
| `appUser`  | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser spec](/guide/webhook-spec/#appuser-spec) below for details.      |

## conversation:read payload

| Field       | Type        | Description                                                                                                                                  |
|-------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"conversation:read"`                                                                                                                        |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.                          |
| `source`    | JSON Object | A nested JSON object representing the source of the event. See the [source spec](/guide/webhook-spec/#source-spec) below for details.                                        |
| `appUser`   | JSON Object | A nested JSON object representing the **truncated appUser** associated with the event. See the [truncated appUser spec](/guide/webhook-spec/#truncated-appuser-spec) below for details. |
| `timestamp` | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                                              |

## merge:appUser payload

| Field       | Type        | Description                                                                                                                                                       |
|-------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"merge:appUser"`                                                                                                                                                 |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.                                               |
| `surviving` | JSON Object | A nested JSON object with the **truncated appUser** that now represents the merged appUser objects. See the [truncated appUser spec](/guide/webhook-spec/#truncated-appuser-spec) below for details.         |
| `discarded` | Array       | An array of JSON objects with the **truncated appUsers** that were unified into `surviving` appUser object. See the [truncated appUser spec](/guide/webhook-spec/#truncated-appuser-spec) below for details. |

## delivery:success payload

| Field         | Type        | Description                                                                                                               |
|---------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `trigger`     | String      | `"delivery:success"`                                                                                                      |
| `app`         | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.       |
| `messages`    | Array       | An array of JSON objects representing the messages associated with the event. See the [message spec](/guide/webhook-spec/#message-spec) below for details. |
| `appUser`     | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser spec](/guide/webhook-spec/#appuser-spec) below for details.      |
| `destination` | JSON Object | A nested JSON object representing the destination of the message. See the [source spec](/guide/webhook-spec/#source-spec) below for details.              |
| `timestamp`   | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                           |

## delivery:failure payload

| Field         | Type        | Description                                                                                                                 |
|---------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| `trigger`     | String      | `"delivery:success"`                                                                                                        |
| `app`         | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.         |
| `messages`    | Array       | An array of JSON objects representing the messages associated with the event. See the [message spec](/guide/webhook-spec/#message-spec) below for details.   |
| `appUser`     | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser spec](/guide/webhook-spec/#appuser-spec) below for details.        |
| `destination` | JSON Object | A nested JSON object representing the destination of the message. See the [source spec](/guide/webhook-spec/#source-spec) below for details.                |
| `timestamp`   | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                             |
| `error`       | JSON Object | A nested JSON object representing the error associated with the delivery failure. See the [error spec](/guide/webhook-spec/#error-spec) below for details. |

## postback payload

| Field       | Type        | Description                                                                                                                 |
|-------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| `trigger`   | String      | `"postback"`                                                                                                                |
| `app`       | JSON Object | A nested JSON object representing the Smooch app associated with the event. See the [app spec](/guide/webhook-spec/#app-spec) below for details.         |
| `postbacks` | Array       | An array of JSON objects representing the postbacks associated with the event. See the [postback spec](/guide/webhook-spec/#postback-spec) below for details. |
| `appUser`   | JSON Object | A nested JSON object representing the appUser associated with the event. See the [appUser spec](/guide/webhook-spec/#appuser-spec) below for details.        |

## postback spec

| Field                                       | Type        | Description                                                                                                                                                                                          |
|---------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` <span class="opt">optional</span> | JSON Object | A nested JSON object representing the message associated with the postback action. See the [message spec](/guide/webhook-spec/#message-spec) below for details (Not present in postback payloads triggered by persistent menu items). |
| `action`                                    | JSON Object | A nested JSON object representing the postback action. See the [action spec](/guide/webhook-spec/#action-spec) below for details.                                                                                                    |

## app spec

| Field | Type   | Description                                                                                    |
|-------|--------|------------------------------------------------------------------------------------------------|
| `_id` | String | A canonical ID that can be used to reference the Smooch app that the event is associated with. |

## message spec

| Field                                         | Type        | Description                                                                                                             |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| `_id`                                         | String      | A canonical ID that can be used to retrieve the message.                                                                |
| `text`                                        | String      | The message text.                                                                                                       |
| `role`                                        | String      | The role of the message sender. Either `"appUser"` or `"appMaker"`                                                      |
| `authorId`                                    | String      | The appUser's _id if the message `role` is `"appUser"`, otherwise, a hash based on the appMaker's email address.        |
| `name` <span class="opt">optional</span>      | String      | The appUser's friendly name, or an optionally provided appMaker name.                                                   |
| `received`                                    | Number      | A unix timestamp given in seconds, describing when Smooch received the message.                                         |
| `source`                                      | JSON Object | A nested JSON object describing the source of the message. See the [source spec](/guide/webhook-spec/#source-spec) below for details.                   |
| `avatarUrl` <span class="opt">optional</span> | String      | The URL for an image of the appMaker.                                                                                   |
| `type`                                        | String      | `"text"`, or `"image"`.                                                                                                 |
| `actions`                                     | Array       | An array of JSON objects representing the actions associated with the event. See the [action spec](/guide/webhook-spec/#action-spec) below for details. |

## error spec

| Field             | Type        | Description                                   |
|-------------------|-------------|-----------------------------------------------|
| `code`            | String      | The error code associated with the error.     |
| `underlyingError` | JSON Object | A flat JSON object that represents the error. |

## underlyingError spec

| Field     | Type   | Description                                       |
|-----------|--------|---------------------------------------------------|
| `message` | String | The human readable message associated with error. |

## source spec

| Field                                  | Type   | Description                                                                                                                                                                                            |
|----------------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`                                 | String | `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, `"frontendEmail"`, `"api"`, `"zendesk"`, `"helpscout"`, `"hipchat"`, `"slack"`, or `"email"`. |
| `id` <span class="opt">optional</span> | String | An identifier used by Smooch for internal purposes.                                                                                                                                                    |

## action spec

| Field      | Type   | Description                                                                                               |
|------------|--------|-----------------------------------------------------------------------------------------------------------|
| `_id`      | String | A canonical ID.                                                                                           |
| `type`     | String | `"link"`, `"reply"`, `"postback"`, or `"payment"`.                                                        |
| `uri`      | String | The URI for a link type button, or a blank string for other action types.                                 |
| `text`     | String | The button text.                                                                                          |
| `payload`  | String | The payload of an action button like a reply or postback button.                                          |
| `amount`   | Number | An integer representing an amount of money in hundredths of a dollar (or equivalent in other currencies). |
| `currency` | String | An ISO 4217 standard currency code in lowercase.                                                          |
| `state`    | String | The value "offered", sent with a payment action type.                                                     |

## truncated appUser spec

| Field | Type   | Description                                              |
|-------|--------|----------------------------------------------------------|
| `_id` | String | A canonical ID that can be used to retrieve the appUser. |

## appUser spec

| Field                                         | Type        | Description                                                                                                               |
|-----------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `_id`                                         | String      | A canonical ID that can be used to retrieve the appUser.                                                                  |
| `userId` <span class="opt">optional</span>    | String      | An optional ID that if specified can also be used to retreive the appUser.                                                |
| `properties`                                  | JSON Object | A flat JSON Object of optional properties set by the app maker.                                                           |
| `signedUpAt`                                  | String      | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the moment an appUser was created.                |
| `clients`                                     | Array       | An array of JSON objects representing the clients associated with the appUser. See the [client spec](/guide/webhook-spec/#client-spec) below for details. |
| `pendingClients`                              | Array       | As clients, but containing linked clients which have not been confirmed yet (i.e. Twilio SMS)                             |
| `devices`                                     | Array       | DEPRCIATED Identical to the clients array, but depricated.                                                                |
| `conversationStarted`                         | Boolean     | A boolean representing of whether a message has been sent or not.                                                         |
| `credentialRequired`                          | Boolean     | A boolean representing whether the appUser is secured by a JSON Web Token or not.                                         |
| `email` <span class="opt">optional</span>     | String      | An optional email address.                                                                                                |
| `givenName` <span class="opt">optional</span> | String      | An optional given name.                                                                                                   |
| `surname` <span class="opt">optional</span>   | String      | An optional surname.                                                                                                      |

## client spec

| Field                                          | Type        | Description                                                                                                                                    |
|------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `active`                                       | Boolean     | If active is `false` then the appUser is not logged in to the client and signifies that the appUser will not receive APN of FCM notifications. This pertains to the SDKs. |
| `lastSeen`                                     | String      | A datetime string with the format **yyyy-mm-ddThh:mm:ssZ** representing the last time the appUser sent a message from this particular client.  |
| `platform`                                     | String      | `"web"`, `"ios"`, `"android"`, `"messenger"`, `"viber"`, `"telegram"`, `"wechat"`, `"line"`, `"twilio"`, and `"frontendEmail"`.                |
| `id`                                           | String      | A unique idenitifier.                                                                                                                          |
| `info` <span class="opt">optional</span>       | JSON Object | A nested flat JSON Object With information particular to the client platform. See the [client info spec](/guide/webhook-spec/#client-info-spec) below for details.                  |
| `appVersion` <span class="opt">optional</span> | String      | For the SDK in a native app, signifies the cersion ofthe app.                                                                                  |
| `linkedAt` <span class="opt">optional</span>   |             | If the channel was linked to a pre-existing appUser, a timestamp signifying when the linking occurred. Formatted as **yyyy-mm-ddThh:mm:ssZ**   |

## client info spec

| Field                   | Type   | Description                                              |
|-------------------------|--------|----------------------------------------------------------|
| `sdkVersion`            | String | Available on `"web"`, `"ios"`, and `"android"` platforms |
| `currentTitle`          | String | Available on `"web"` platform                            |
| `currentUrl`            | String | Available on `"web"` platform                            |
| `browserLanguage`       | String | Available on `"web"` platform                            |
| `referrer`              | String | Available on `"web"` platform                            |
| `userAgent`             | String | Available on `"web"` platform                            |
| `URL`                   | String | Available on `"web"` platform                            |
| `wifi`                  | String | Available on `"ios"`, and `"android"` platforms          |
| `os`                    | String | Available on `"ios"`, and `"android"` platforms          |
| `appName`               | String | Available on `"ios"`, and `"android"` platforms          |
| `osVersion`             | String | Available on `"ios"`, and `"android"` platforms          |
| `installer`             | String | Available on `"ios"`, and `"android"` platforms          |
| `devicePlatform`        | String | Available on `"ios"`, and `"android"` platforms          |
| `buildNumber`           | String | Available on `"ios"`, and `"android"` platforms          |
| `carrier`               | String | Available on `"ios"`, and `"android"` platforms          |
| `appId`                 | String | Available on `"ios"`, and `"android"` platforms          |
| `radioAccessTechnology` | String | Available on `"ios"`, and `"android"` platforms          |
| `avatarUrl`             | String | Available on `"messenger"` platform                      |
| `openid`                | String | Available on `"wechat"` platform                         |
| `sex`                   | String | Available on `"wechat"` platform                         |
| `language`              | String | Available on `"wechat"` platform                         |
| `city`                  | String | Available on `"wechat"` platform                         |
| `province`              | String | Available on `"wechat"` platform                         |
| `country`               | String | Available on `"wechat"` platform                         |
| `headimgurl`            | String | Available on `"wechat"` platform                         |
| `subscribe_time`        | Number | Available on `"wechat"` platform                         |
| `phoneNumber`           | String | Available on `"twilio"` platform                         |
| `country`               | String | Available on `"twilio"` platform                         |
| `city`                  | String | Available on `"twilio"` platform                         |
| `state`                 | String | Available on `"twilio"` platform                         |
