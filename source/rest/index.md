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



# Authentication

SupportKit APIs offer two methods of authentication:

1. Using an [App Token](#app-token)
1. Using a [JSON Web Token (JWT)](#jwt)

Some APIs accept either of the two authentication methods while others require a `JWT` credential.

| API                       | Valid authentication methods |
|---------------------------|------------------------------|
| [`/api/appboot`](#app-boot) | `appToken`, `JWT`            |
| [`/api/appuser`](#app-user) | `appToken`, `JWT`            |
| [`/api/webhook`](#webhook)  | `JWT`                        |

## App Token

> Calling `/api/appboot` using an app token

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -H 'content-type:application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

When calling SupportKit APIs on behalf of the app user (eg. [`/api/appboot`](#app-boot) and [`/api/appuser`](#app-user)), a credential is not required. This is common for apps that don't require the user to log in.

Every SupportKit app has an `appToken` provisioned to it which can be found in the settings panel. When calling a SupportKit API without credentials, the `appToken` must be specified in the `app-token` HTTP header. This will link the caller to a specific SupportKit app.

Specifying an `appToken` alone is sufficient to call any of the app user facing API.

## JWT

> Calling `/api/appboot` using a JWT

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer YOUR-JWT'
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. A set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). The full specification is described [here](https://tools.ietf.org/html/rfc7519)

For added security when making calls on behalf of an app user, a JWT credential can optionally be specified instead of an `appToken`. However other APIs, such as `/api/webhooks` always require a valid JWT credential.

The JWT itself is transmitted via the HTTP `authorization` header. The token should be prefixed with "Bearer" followed by a space. For example: `Bearer YOUR-JWT`.

### Header

> JWT header:

```json
{
    "alg": "HS256",
    "kid": "b567635f883c819871ace8003c0db14b"
}
```

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used to sign the JWT can be anything supported by the [jsonwebtoken npm module v5.0.4](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported). Unsigned JWTs are not accepted.

> JWT body with `appUser` scope

```json
{
    "scope": "appUser",
    "userId": "bob@example.com" 
}
```

> JWT body with `app` scope

```json
{
    "scope": "app"
}
```

### Scope

The JWT body must specify the caller's scope of access. There are two levels of scope:

1. The `appUser` scope grants access to an individual app user's data and conversation history, but nothing else. It is used when issuing tokens to individual users. A JWT with `appUser` scope must also specify a `userId` which uniquely identifies the `appUser` being accessed. [Node.js code sample](https://gist.github.com/alavers/8f07b03895333d83b454)

1. The `app` scope grants access to all users and conversations within a given SupportKit app. The `app` scope is reserved for server-to-server scenarios, the creation of webhooks for example. [Node.js code sample](https://gist.github.com/alavers/d9af102ca4cefac1a7e5)

| API                       | Accepted JWT Scopes |
|---------------------------|---------------------|
| [/api/appboot](#app-boot) | appUser             |
| [/api/appuser](#app-user) | appUser, app        |
| [/api/webhook](#webhook)  | app                 |






# App Boot

This endpoint is called when a SupportKit integrated client app has booted. 

### HTTP Request
_
> Performing an app boot:

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST \
     -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220", "deviceInfo": {"platform": "ios", "appVersion": "1.0"} }'
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
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
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
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"My dishwasher is broken", "role": "appUser"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Post as app maker

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Oh no!", "role": "appMaker"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
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
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/event \
     -X POST \
     -d '{"name":"completed_sale"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
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
curl https://sdk.supportkit.io/api/webhooks \
     -X POST \
     -d '{"target": "http://myservice.com/api/sk"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer YOUR-JWT'
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
`POST /api/webhooks`

| Parameter   | Required? | Notes            |
|-------------|-----------|------------------|
| target      | Yes       | URL to be called |

## List webhooks

> List webhooks

```shell
  curl https://sdk.supportkit.io/api/webhooks \
       -H 'authorization: Bearer YOUR-JWT'
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
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://myservice.com/api/supportkit"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer YOUR-JWT'
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
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer YOUR-JWT'
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
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer YOUR-JWT'
```

### HTTP Request
`DELETE /api/webhooks/55c8d9758590aa1900b9b9f6`

## Webhook events

> Post event

```shell
curl https://sdk.supportkit.io/api/webhooks
     -X POST \
     -d '{"target": "http://myservice.com/api/sk", "events": ["message:appUser"]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer YOUR-JWT'
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