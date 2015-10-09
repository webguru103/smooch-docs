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

## Basics

The SupportKit API is designed according to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

The API accepts JSON in request bodies and requires that the `content-type: application/json` header be specified for all such requests. The API will always respond with a JSON object. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.

The API also facilitates [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) so that it can be called from a web application.

## Errors

SupportKit uses standard HTTP status codes to communicate errors

|         |   |
|---------|---|
| **200** | OK - Everything went as planned. |
| **400** | Bad Request - Something in your header or request body was malformed. |
| **401** | Unauthorized - Necessary credentials were either missing or invalid. |
| **403** | Forbidden - Your credentials are valid but you don't have access to the requested resource. |
| **404** | Not Found - The object you're requesting doesn't exist. |
| **500, 502, 503, 504** | Server Errors - Something went wrong on our end. |

# Authentication

SupportKit APIs offer two methods of authentication:

1. Using an [App Token](#app-token)
1. Using a [JSON Web Token (JWT)](#jwt)

Some APIs accept either of the two authentication methods while others require a `jwt` credential.

| API                          | Valid authentication methods |
|------------------------------|------------------------------|
| [`/v1/appusers`](#app-user) | `jwt`, `appToken`            |
| [`/v1/webhooks`](#webhook)  | `jwt`                        |

## App Token

> Calling `GET /v1/appusers` using an app token

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

When calling SupportKit APIs such as [`/v1/appusers`](#app-users) on behalf of app users, an `appToken` may be used for basic authentication.

Every SupportKit app has an `appToken` provisioned to it which can be found in the app settings tab. The `appToken` is sent via the the `app-token` HTTP header. This will link the caller to a specific SupportKit app.

Specifying an `appToken` alone is sufficient to call any of the app user facing API.

## JWT

> Calling `GET /v1/appusers` using a `jwt`

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: Bearer your-jwt'
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. A set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). The full specification is described [here](https://tools.ietf.org/html/rfc7519).

For added security when making calls on behalf of an app user, a `jwt` credential can optionally be specified instead of an `appToken`. However other APIs, such as `/v1/webhooks` always require a valid `jwt` credential.

The `jwt` itself is transmitted via the HTTP `authorization` header. The token should be prefixed with "Bearer" followed by a space. For example: `Bearer your-jwt`.

### Header

> JWT header:

```json
{
    "alg": "HS256",
    "kid": "b567635f883c819871ace8003c0db14b"
}
```

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used to sign the JWT can be anything supported by the [jsonwebtoken npm module v5.0.4](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported). Unsigned JWTs are not accepted.

> JWT body with `appUser` scope:

```json
{
    "scope": "appUser",
    "userId": "bob@example.com" 
}
```

> JWT body with `app` scope:

```json
{
    "scope": "app"
}
```

### Scope

The `jwt` body must specify the caller's scope of access. There are two levels of scope:

1. The `appUser` scope grants access to an individual app user's data and conversation history, but nothing else. It is used when issuing tokens to individual users. A `jwt` with `appUser` scope must also specify a `userId` which uniquely identifies the `appUser` being accessed. [Node.js code sample](https://gist.github.com/alavers/8f07b03895333d83b454)

1. The `app` scope grants access to all users and conversations within a given SupportKit app. The `app` scope is reserved for server-to-server scenarios, the creation of webhooks for example. [Node.js code sample](https://gist.github.com/alavers/d9af102ca4cefac1a7e5)

| API                       | Accepted `jwt` Scopes |
|---------------------------|-----------------------|
| [/v1/appusers](#app-user) | app, appUser          |
| [/v1/webhooks](#webhook)  | app                   |

# Webhooks <beta/>

> Webhook example payload:

```json
{
    "event": "message:appUser",
    "items":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "text": "Hi! Do you have time to chat?",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "metadata": [],
        "actions": []
    }],
    "appUserId": "c7f6e6d6c3a637261bd9656f"
}
```

Webhooks are a fantastic way to extend the SupportKit platform beyond the built-in feature set. You can use webhooks to build your own SupportKit chat clients or to integrate more deeply with your favorite CRM.

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single SupportKit app.

When a webhook event is triggered, a JSON payload will be posted to the URL configured in your webhook object. You can see an example of this payload to the right.

## Create webhook

> Request:

```shell
curl https://api.supportkit.io/v1/webhooks \
     -X POST \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

> Response:

```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "events": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`POST /v1/webhooks`</api>

Create a webhook for the specified app. The response body will include a list of events that will trigger the webhook (currently only message events are supported) as well as a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/>*required* | URL to be called when the webhook is triggered. |
| **event**<br/>*optional*  | The event you wish to have the webhook listen to. The default event is `message`. This property is case sensitive. [More details](#webhook-events). |

## List webhooks

> Request:

```shell
  curl https://api.supportkit.io/v1/webhooks \
       -H 'authorization: Bearer your-jwt'
```

> Response:

```json
{
  "webhooks": [
    {
      "_id": "55c8d9758590aa1900b9b9f6",
      "events": [
        "message"
      ],
      "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
      "target": "http://example.com/callback"
    }
  ]
}
```

<api>`GET /v1/webhooks`</api>

List all webhooks configured for a given app.

## Get webhook

> Request:

```shell
curl https://api.supportkit.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-jwt'
```

> Response:

```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "events": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`GET /v1/webhooks/{webhookId}`</api>

Individual webhooks can be fetched using this API.

## Update webhook

> Request:

```shell
curl https://api.supportkit.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

> Response

```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "events": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`PUT /v1/webhooks/{webhookId}`</api>

Use this API to update your existing webhooks.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/>*optional* | URL to be called when the webhook is triggered. |
| **event**<br/>*optional*  | The event you wish to have the webhook listen to. The default event is `message`. This property is case sensitive. [More details](#webhook-events). |

## Delete webhook

> Request:

```shell
curl https://api.supportkit.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```

<api>`DELETE /v1/webhooks/{webhookId}`</api>

Deletes the specified webhook.

## Webhook events

> Post event

```shell
curl https://api.supportkit.io/v1/webhooks
     -X POST \
     -d '{"target": "http://example.com/callback", "events": ["message:appUser"]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

A webhook will make a request to the target each time an event associated with the webhook occurs. Events are specified in an optional `events` array in the request body. If events are not specified, the webhook will be configured with the default events.

| event            |   |
|------------------|---|
| **message**<br/>*default* | all messages            |
| **message:appUser**       | only app user messages  |
| **message:appMaker**      | only app maker messages |

## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.

# App User <beta/>

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/v1/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

### userId

App users may be created with an optional `userId` parameter. This is a unique identifier that is chosen by the API consumer and it can be used to synchronize a single conversation across multiple devices. To understand how this works, see the section covering [users on multiple devices](/#users-on-multiple-devices).

<aside class="notice">
If a userId has been specified for a given app user, it can be used in place of the appUserId in any `/v1/appusers/` API path.
</aside>

## Get App User

> Request by appUserId:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Request by userId:

```shell
curl https://api.supportkit.io/v1/appusers/steveb@channel5.com \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Response:

```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "surname": "Brule",
        "email": "steveb@channel5.com",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {},
        "conversationStarted": true
    }
}
```

<api>`GET /v1/appusers/{appUserId|userId}`</api>

Retrieve a specific app user. Like all other `/v1/appusers/` paths, an app user can be identified using either the `appUserId` or the `userId`.

## Update

> Request:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Steve"}'
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Response:

```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "surname": "Brule",
        "email": "steveb@channel5.com",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {},
        "conversationStarted": true
    }
}
```

<api>`PUT /v1/appusers/{appUserId|userId}`</api>

Update an app user's basic profile information and specify custom profile data via `properties`. This API is additive; only the specific fields specified in the request body, and only the specific JSON sub-fields included in the `properties` field will be updated. In other words, omitting a field will not delete that field.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **givenName**<br/>*optional*  | The user's given name (first name). |
| **surname**<br/>*optional*    | The user's surname (last name). |
| **email**<br/>*optional*      | The user's email address. |
| **signedUpAt**<br/>*optional* | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/>*optional* | A flat JSON object containing custom defined user properties. |

<api>`GET /v1/appusers/{appUserId|userId}`</api>

Use this API to fetch the properties of an existing app user.

## Track Event

> Request:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f/event \
     -X POST \
     -d '{"name":"completed_sale"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

<api>`POST /v1/appusers/{appUserId|userId}/event`</api>

Trigger an event for a given app user. Some SupportKit whispers are triggered on discrete events. This API is used to trigger such events. For example, if an app has a whisper configured to be sent whenever a user has triggered the `completed_sale` event, calling this API is the way to trigger such a whisper.

| **Arguments**           |   |
|-------------------------|---|
| **name**<br/>*required* | The name of the triggered event. |

# Conversations <beta/>

When the first message is sent to an app user or received from an app user, a conversation is automatically created for them. The conversation and messages for a given app user can be retrieved and created by way of the `/v1/appusers/` API.

## Get Conversation

> Request:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Response

```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "appMakers": [],
    "appUsers": ["c7f6e6d6c3a637261bd9656f"],
    "messages": [{
      "_id": "55c8c1498590aa1900b9b9b1",
      "authorId": "c7f6e6d6c3a637261bd9656f",
      "name": "Steve",
      "text": "Just put some vinegar on it",
      "received": 1439220041.586
    }]
  }
}
```

<api>`GET /v1/appusers/{appUserId|userId}/conversation`</api>

Get the specified app user's conversation history, if it exists. If the conversation has not yet been created for the specified app user 404 will be returned.

## Post Message

> Post as app user:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appUser"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Post as app maker:

```shell
curl https://api.supportkit.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

<api>`POST /v1/appusers/{appUserId|userId}/conversation/messages`</api>

Post a message to the app user. If the app user does not yet have a conversation, one will be created automatically. The message `text` and `role` must both be specified. For messages coming from the app user, set `role` to `appUser`. For messages coming from an app maker, set this parameter to `appMaker`.


| **Arguments**                |                            |
|------------------------------|----------------------------|
| **text**<br/>*required*      | The message content.       |
| **role**<br/>*required*      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **name**<br/>*optional*      | The display name of the message author. Messages with role `appUser` will default to a friendly name based on the user's `givenName` and `surname`. Messages with role `appMaker` have no default name. |
| **email**<br/>*optional*     | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the SupportKit account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/>*optional* | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **mediaUrl**<br/>*optional*  | The image URL used in an image message. |
| **mediaType**<br/>*optional* | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpg` |
| **metadata**<br/>*optional*  | Flat JSON object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. |

<aside class="notice">
For messages originating from an app maker, a `jwt` credential with `app` level scope must be included.
</aside>
