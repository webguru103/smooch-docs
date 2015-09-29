---
layout: 3col
title: API Reference

language_tabs:
  - shell

toc_footers:
  - <a href='http://supportkit.io/'>Sign up for SupportKit, it's free</a>

includes:

search: true
---

# Introduction

Welcome to the SupportKit API. These APIs give you the means to build your own scenarios using SupportKit, custom tailored to your needs.

The SupportKit API is REST and JSON based. All API calls require `Content-Type: application/json` to be specified.

SupportKit APIs can be called in two ways:

1. As an app user without credentials, via an `appToken`
2. Authenticated mode via a JWT credential

SupportKit offers integrators the option to authenticate with SupportKit on an app user's behalf. The integrator does this by issuing a JWT for each app user, signed with a secret key provided by SupportKit. This option is more complex, but it offers stronger protection against unauthorized access to an app user's conversation data. If JWT-based authentication is not used, an `appToken` is specified instead.

# Authentication

## appToken

> App token example

```shell
curl -H 'content-type:application/json' \
     -H 'app-token:cr2g6jgxrahuh68n1o3e2fcnt' \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -i https://sdk.supportkit.io/api/appboot
```

A subset of the SupportKit API may be used by simply specifying the `appToken` in the `app-token` HTTP header. This represents the case where an app user is using SupportKit without any credentials.

## JWT

App user clients and services can also make secure calls to the SupportKit APIs by including a JWT.


### Header

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used to sign the JWT can be anything supported by the [jsonwebtoken npm module v5.0.4](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported). Unsigned JWTs are not accepted.

> Example JWT header:

```json
{
    "alg": "HS256",
    "kid": "b567635f883c819871ace8003c0db14b"
}
```

### Scope

The JWT body must include a scope parameter that determines the level of access of the bearer. There are two scopes, `appUser` and `app`.

#### appUser scope

The `appUser` scope grants access to an individual app user's data and conversation, but nothing else. It is used when issuing tokens to individual users. A JWT with `appUser` scope must also specify a `userId`. The `userId` field effectively limits the scope of what a client can access using a given JWT.

[Node.js appUser JWT code sample](https://gist.github.com/alavers/8f07b03895333d83b454)

> Example JWT body for accessing app user data:

```json
{
    "scope": "appUser",
    "userId": "bob@example.com" 
}
```

#### app scope

The `app` scope grants access to users and conversations for a given SupportKit app. The `app` scope is reserved for server-to-server scenarios, for example, for the creation of webhooks.

[Node.js app JWT code sample](https://gist.github.com/alavers/d9af102ca4cefac1a7e5)

> Example API JWT body for creating a webhook:

```json
{
  "scope": "app"
}
```

The JWT itself is transmitted via the HTTP authorization header, in the format as follows: "Bearer: {JWT}". For example:

```shell
curl -H 'content-type:application/json' \
     -H 'authorization: Bearer eyJhbG...NFh7HgQ' \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -i https://sdk.supportkit.io/api/appboot
```

For brevity, the curl examples from this point forward will omit content-type, app-token, and authorization headers. For example, when an example reads like this

```shell
curl -X POST \
     -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     https://sdk.supportkit.io/api/appboot
```

In effect, it means something like this:

```shell
curl -H 'content-type:application/json' \
     -H 'app-token:cr2g6jgxrahuh68n1o3e2fcnt' \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -i https://sdk.supportkit.io/api/appboot
```

# App Boot

This endpoint is called when a SupportKit integrated client app has booted. 

### HTTP Request
_
> Performing an app boot:

```shell
curl -X POST \
     -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220", "deviceInfo": {"platform": "ios", "appVersion": "1.0"} }' \
     https://sdk.supportkit.io/api/appboot
```

> Response

```json
{
    "appUserId": "c7f6e6d6c3a637261bd9656f",
    "appUser": {
        "givenName": "",
        "email": "",
        "surname": "",
        "conversationStarted": false,
        "signedUpAt": "2015-08-09T16:23:36.741Z",
        "properties": {}
    }
}
```

`POST /api/appboot`

| Auth method | Allowed? | Accepted JWT scopes |
|-------------|----------|---------------------|
| appToken    | Yes      |                     |
| JWT         | Yes      | `appUser`           |

The API will:

1. Register a new `appUser` or `deviceId` if they don't yet exist
1. Authenticate the `appUser` if `jwt` credentials are provided
1. Update an app user's `lastSeen` property

The API requires `deviceId` to be specified at the very minimum. A `userId` may also be specified to link app user accounts across devices. The `pushNotificationDeviceToken` is also specified here, to facilitate push notifications. Additional device information can be specified via the `deviceInfo` field, which expects a flat JSON object.

| Parameter                   | Required?     |
|-----------------------------|---------------|
| deviceId                    | Yes           |
| userId                      | No            |
| pushNotificationDeviceToken | No            |
| deviceInfo                  | No            |

## deviceInfo structure

The `appboot` API accepts a flat `deviceInfo` JSON object. Device information reported here will be rendered alongside app user information inside any app maker channels configured with SupportKit. The `platform` and `appVersion` fields are special in that they can be used as audience targeting criteria for whispers.

| Field                 | Example                   | Relevant Platforms |
|-----------------------|---------------------------|--------------------|
| platform              | "ios", "android", "web"   | all                |
| appVersion            | "8.0"                     | all                |
| appName               | "foo"                     | ios, android       |
| deviceModel           | "iPhone 5s"               | ios, android       |
| os                    | "iPhone OS"               | ios, android       |
| osVersion             | "8.1.2"                   | ios, android       |
| radioAccessTechnology | "HSDPA"                   | ios, android       |
| carrier               | "Acme"                    | ios, android       |
| devicePlatform        | "iPhone6,1"               | ios, android       |
| wifi                  | "YES"                     | ios, android       |
| currentUrl            | "http://mywebsite.com"    | web                |
| userAgent             | "Mozilla/5.0..."          | web                |
| referrer              | "http://google.com"       | web                |
| browserLanguage       | "en-US"                   | web                |
| currentTittle         | "Welcome"                 | web                |

The API will respond with the `appUserId` of the app user in question, which can then be used to make API calls to conversation API. The response will also include any profile information that was previously set for the app user, including custom properties.

<aside class="notice">
In some scenarios, the appUser id returned in an app boot call may change. This is possible for example when the same user is logging in from multiple devices, which may cause two distinct `appUserId`s to merge together. The caller should always check if the returned appUserId has changed, and re-fetch conversation history whenever appropriate.
</aside>

# App User

Using the app user APIs you can update the user's properties, retrieve conversation history, post a message, and track app user events.

| Auth method | Allowed? | Accepted JWT scopes |
|-------------|----------|---------------------|
| appToken    | Yes      |                     |
| JWT         | Yes      | `appUser`, `app`    |

<aside class="notice">
The app scope must be used instead of appUser scope when posting conversation messages on behalf of an app maker.
</aside>

<aside class="notice">
If a userId has been specified for a given app user, it can be used in place of the appUserId in the appusers path argument.
</aside>

## Update

Update an app user's basic profile information and specify custom profile data via `properties`.

#### HTTP Request
`PUT /api/appusers/{appUserId|userId}`

| Parameter   | Required? | Notes                      |
|-------------|-----------|----------------------------|
| givenName   | No        | Message content            |
| surname     | No        | Will use conversation appUserId as default    |
| email       | No        | Display name of the author |
| properties  | No        | Flat JSON object |


## Get Conversation

> Get conversation

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation
```

> Response

```json
{
    "_id": "df0ebe56cbeab98589b8bfa7",
    "messages": [{
        "_id": "55c8c1498590aa1900b9b9b1",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Bob",
        "text": "Hi",
        "received": 1439220041.586
    }],
    "appUsers": ["c7f6e6d6c3a637261bd9656f"],
    "appMakers": []
}
```

Get the specified app user's conversation history, if it exists. Returns 404 if the conversation has not yet been created.

### HTTP Request
`GET /api/appusers/{appUserId|userId}/conversation`

## Post Message

> Post as app user

```shell
curl -X POST \
     -d '{"text":"My dishwasher is broken", "role": "appUser"}' \
     https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages
```

> Post as app maker

```shell
curl -X POST \
     -d '{"text":"Oh no!", "role": "appMaker"}' \
     https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages
```

Post a message to the app user. If the app user does not yet have a conversation, one will be created automatically. The message `text` and `role` must both be specified. For messages coming from the app user, set `role` to the `appUser`. For messages coming from an app maker, set this parameter to `appMaker`.

### HTTP Request
`POST /api/appusers/{appUserId|userId}/conversation/messages`

| Parameter   | Required? | Notes                      |
|-------------|-----------|----------------------------|
| text        | Yes       | Message content            |
| role        | Yes       | `appUser` or `appMaker`    |
| name        | No        | Display name of the author |
| metadata    | No        | Flat JSON object           |

<aside class="notice">
For messages coming from an app maker, the JWT must be issued with app scope instead of appUser scope.
</aside>

## Track Event

> Track event

```shell
curl -X POST \
     -d '{"name":"completed_sale"}' \
     https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/event
```

Trigger an event for a given app user. Some SupportKit whispers are triggered on discrete events. This API is used to trigger such events. For example, if an app has a whisper configured to be sent whenever a user has triggered the `completed_sale` event, calling this API is the way to trigger such a whisper.

### HTTP Request
`POST /api/appusers/{appUserId|userId}/event`

| Parameter   | Required? |
|-------------|-----------|
| name        | Yes       |

# Webhooks

| Auth method | Allowed? | Accepted JWT scopes |
|-------------|----------|---------------------|
| appToken    | No       |                     |
| JWT         | No       | `app`               |

## Create webhook

> Create webhook

```shell
curl -X POST \
     -d '{"target": "http://myservice.com/api/sk"}' \
     https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks
```

> Response

```json
{
  "_id": "55c8d9758590aa1900b9b9f6",
  "target": "http://myservice.com/api/sk",
  "events": ["message"],
  "secret": "8sd2xxtro6poa8i4pleh52ovd"
}
```

Create a webhook for the specified app. The response body will include a list of events that will trigger the webhook (currently only message events are supported) as well as a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

### HTTP Request
`POST /api/apps/{appId}/webhooks`

| Parameter   | Required? | Notes            |
|-------------|-----------|------------------|
| target      | Yes       | URL to be called |

## List webhooks

> List webhooks

```shell
  curl https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks
```

> Response

```json
[{
     "_id": "55c8d9758590aa1900b9b9f6",
    "target": "http://myservice.com/api/sk",
    "events": ["message"],
    "secret": "8sd2xxtro6poa8i4pleh52ovd"
}]
```

## Update webhook

```shell
curl -X PUT \
     -d '{"target": "http://myservice.com/api/supportkit"}' \
     https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks/55c8d9758590aa1900b9b9f6
```

> Response

```json
{
  "_id": "55c8d9758590aa1900b9b9f6",
  "target": "http://myservice.com/api/supportkit",
  "events": ["message:appUser"],
  "secret": "8sd2xxtro6poa8i4pleh52ovd"
}
```

## Get webhook

```shell
curl https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks/55c8d9758590aa1900b9b9f6
```

> Response

```json
{
  "_id": "55c8d9758590aa1900b9b9f6",
  "target": "http://myservice.com/api/supportkit",
  "events": ["message:appUser"],
  "secret": "8sd2xxtro6poa8i4pleh52ovd"
}
```

## Delete webhook

> Delete webhook

```shell
curl -X DELETE \
     https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks/55c8d9758590aa1900b9b9f6
```

### HTTP Request
`DELETE /api/apps/55c39e7173320a1e00ff6112/webhooks/55c8d9758590aa1900b9b9f6`

## Webhook events

> Post event

```shell
curl -X POST \
     -d '{"target": "http://myservice.com/api/sk", "events": ["message:appUser"]}' \
     https://sdk.supportkit.io/api/apps/55c39e7173320a1e00ff6112/webhooks
```

A webhook will make a request to the target each time an event associated with the webhook occurs. Events are specified in an optional `events` array in the request body. If events are not specified, the webhook will be configured with the default events.

| event           | Default?  | Scope                                                       |
|-----------------|-----------|-------------------------------------------------------------|
| message         | yes       | all messages (app maker messages are currently unsupported) |
| message:appUser | No        | only app user messages                                      |
| message:appUser | No        | only app maker messages (currently unsupported)             |

## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.