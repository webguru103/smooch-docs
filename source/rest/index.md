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

Some APIs accept either of the two authentication methods while others require a `jwt` credential.

| API                          | Valid authentication methods |
|------------------------------|------------------------------|
| [`/api/appusers`](#app-user) | `jwt`, `appToken`            |
| [`/api/webhooks`](#webhook)  | `jwt`                        |

## App Token

> Calling `/api/appboot` using an app token

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -H 'content-type:application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

When calling SupportKit APIs on behalf of the app user (eg. [`/api/appboot`](#app-boot) and [`/api/appuser`](#app-user)), an `appToken` may be used for basic authentication. 

Every SupportKit app has an `appToken` provisioned to it which can be found in the app settings tab. The `appToken` is sent via the the `app-token` HTTP header. This will link the caller to a specific SupportKit app.

Specifying an `appToken` alone is sufficient to call any of the app user facing API.

## JWT

> Calling `/api/appboot` using a `jwt`

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. A set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). The full specification is described [here](https://tools.ietf.org/html/rfc7519).

For added security when making calls on behalf of an app user, a `jwt` credential can optionally be specified instead of an `appToken`. However other APIs, such as `/api/webhooks` always require a valid `jwt` credential.

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

| API                        | Accepted `jwt` Scopes |
|----------------------------|-----------------------|
| [/api/appboot](#app-boot)  | appUser               |
| [/api/appusers](#app-user) | appUser, app          |
| [/api/webhooks](#webhook)  | app                   |

# Webhooks

> Webhook example payload:

```json
{
    "event": "message",
    "items":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "text": "Hi! Do you have time to chat?",
        "received": 1439220041.586
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
curl https://sdk.supportkit.io/api/webhooks \
     -X POST \
     -d '{"target": "http://myservice.com/api/sk"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

> Response:

```json
{
  "_id": "55c8d9758590aa1900b9b9f6",
  "target": "http://myservice.com/api/sk",
  "events": ["message"],
  "secret": "8sd2xxtro6poa8i4pleh52ovd"
}
```

<api>`POST /api/webhooks`</api>

Create a webhook for the specified app. The response body will include a list of events that will trigger the webhook (currently only message events are supported) as well as a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/>*required* | URL to be called when the webhook is triggered. |
| **event**<br/>*optional*  | The event you wish to have the webhook listen to. This property is case sensitive. [More details](#webhook-events). |

## List webhooks

> Request:

```shell
  curl https://sdk.supportkit.io/api/webhooks \
       -H 'authorization: Bearer your-jwt'
```

> Response:

```json
[{
     "_id": "55c8d9758590aa1900b9b9f6",
    "target": "http://myservice.com/api/sk",
    "events": ["message"],
    "secret": "8sd2xxtro6poa8i4pleh52ovd"
}]
```

<api>`GET /api/webhooks`</api>

List all webhooks configured for a given app.

## Update webhook

> Request:

```shell
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://myservice.com/api/supportkit"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
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

<api>`PUT /api/webhooks/55c8d9758590aa1900b9b9f6`</api>

Use this API to update your existing webhooks.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/>*optional* | URL to be called when the webhook is triggered. |
| **event**<br/>*optional*  | The event you wish to have the webhook listen to. This property is case sensitive. [More details](#webhook-events). |

## Get webhook

> Request:

```shell
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-jwt'
```

> Response:

```json
{
  "_id": "55c8d9758590aa1900b9b9f6",
  "target": "http://myservice.com/api/supportkit",
  "events": ["message:appUser"],
  "secret": "8sd2xxtro6poa8i4pleh52ovd"
}
```

<api>`GET /api/webhooks/55c8d9758590aa1900b9b9f6`</api>

Individual webhooks can be fetched using this API.

## Delete webhook

> Request:

```shell
curl https://sdk.supportkit.io/api/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```

<api>`DELETE /api/webhooks/55c8d9758590aa1900b9b9f6`</api>

Deletes the specified webhook.

## Webhook events

> Post event

```shell
curl https://sdk.supportkit.io/api/webhooks
     -X POST \
     -d '{"target": "http://myservice.com/api/sk", "events": ["message:appUser"]}' \
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

# App User

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/api/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

<aside class="notice">
If a userId has been specified for a given app user, it can be used in place of the appUserId in the appusers path argument.
</aside>

## Update

> Request:

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Steve"}'
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Response:

```json
{
  "givenName": "Steve",
  "email": "steve@example.com",
  "signedUpAt": "2015-10-01T21:20:35.863Z",
  "properties": {}
}
```

<api>`PUT /api/appusers/{appUserId|userId}`</api>

Update an app user's basic profile information and specify custom profile data via `properties`. This API is additive; only the specific fields or `properties` JSON sub-fields included in the request will be updated.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **givenName**<br/>*optional*  | The user's given name (first name). |
| **surname**<br/>*optional*    | The user's surname (last name). |
| **email**<br/>*optional*      | The user's email address. |
| **signedUpAt**<br/>*optional* | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/>*optional* | A flat JSON object containing custom defined user properties. |

## Get App User

> Request:

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Response:

```json
{
  "givenName": "Steve",
  "email": "steve@example.com",
  "signedUpAt": "2015-10-01T21:20:35.863Z",
  "properties": {}
}
```

<api>`GET /api/appusers/{appUserId|userId}`</api>

Use this API to fetch the properties of an existing app user.

## Get Conversation

> Requset:

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

<api>`GET /api/appusers/{appUserId|userId}/conversation`</api>

Get the specified app user's conversation history, if it exists. If the conversation has not yet been created for the specified app user 404 will be returned.

## Post Message

> Post as app user:

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"My dishwasher is broken", "role": "appUser"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

> Post as app maker:

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Oh no!", "role": "appMaker"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

<api>`POST /api/appusers/{appUserId|userId}/conversation/messages`</api>

Post a message to the app user. If the app user does not yet have a conversation, one will be created automatically. The message `text` and `role` must both be specified. For messages coming from the app user, set `role` to `appUser`. For messages coming from an app maker, set this parameter to `appMaker`.


| **Arguments**                |                            |
|------------------------------|----------------------------|
| **text**<br/>*required*      | The message content.       |
| **role**<br/>*required*      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **name**<br/>*optional*      | The display name of the message author. |
| **email**<br/>*optional*     | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the SupportKit account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/>*optional* | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **mediaUrl**<br/>*optional*  | The image URL used in an image message. |
| **mediaType**<br/>*optional* | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpg` |
| **metadata**<br/>*optional*  | Flat JSON object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. |

<aside class="notice">
For messages originating from an app maker, a `jwt` credential with `app` level scope must be included.
</aside>

## Track Event

> Request:

```shell
curl https://sdk.supportkit.io/api/appusers/c7f6e6d6c3a637261bd9656f/event \
     -X POST \
     -d '{"name":"completed_sale"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

<api>`POST /api/appusers/{appUserId|userId}/event`</api>

Trigger an event for a given app user. Some SupportKit whispers are triggered on discrete events. This API is used to trigger such events. For example, if an app has a whisper configured to be sent whenever a user has triggered the `completed_sale` event, calling this API is the way to trigger such a whisper.

| **Arguments**           |   |
|-------------------------|---|
| **name**<br/>*required* | The name of the triggered event. |

# App Boot

> Request:

```shell
curl https://sdk.supportkit.io/api/appboot \
     -X POST \
     -d '{"deviceId": "03f70682b7f5b21536a3674f38b3e220", "deviceInfo": {"platform": "ios", "appVersion": "1.0"} }' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

> Response:

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

<api>`POST /api/appboot`</api>

This API is called by a mobile device or browser when the app is first loaded. It serves a number of purposes:

1. Initializes a new `appUser` and `deviceId` if they don't yet exist
1. Update an existing app user's profile and device information
1. Authenticate the `appUser` if `jwt` credentials are provided

The API requires `deviceId` to be specified at the very minimum. A `userId` may also be specified to link app user accounts across devices. The `pushNotificationDeviceToken` is also specified here, to facilitate push notifications. Additional device information can be specified via the `deviceInfo` field, which expects a flat JSON object.

| **Arguments**               |   |
|-----------------------------|---|
| **deviceId**<br/>*required* | A unique identifier for the app user's device. |
| **userId**<br/>*optional* | A unique identifier for the app user. Unlike the `appUserId` which is generated by SupportKit, the `userId` is chosen by the API consumer. The `userId` can be used to link a user to the same conversation across multiple devices. |
| **deviceInfo**<br/>*optional* | A flat JSON structure detailing device properties. See below. |
| **pushNotificationDeviceToken**<br/>*optional* | The GCM or APN token to be used for sending push notifications to the device.

#### deviceInfo

The `appboot` API accepts a flat `deviceInfo` JSON object. Device information reported here will be rendered alongside app user information inside any app maker channels configured with SupportKit. The `platform` and `appVersion` fields are special in that they can be used as audience targeting criteria for whispers.

| Field                     | Example                   | Relevant Platforms |
|---------------------------|---------------------------|--------------------|
| **platform**              | `ios`, `android`, `web`   | all                |
| **appVersion**            | `8.0`                     | all                |
| **appName**               | `foo`                     | ios, android       |
| **deviceModel**           | `iPhone 5s`               | ios, android       |
| **os**                    | `iPhone OS`               | ios, android       |
| **osVersion**             | `8.1.2`                   | ios, android       |
| **radioAccessTechnology** | `HSDPA`                   | ios, android       |
| **carrier**               | `Acme`                    | ios, android       |
| **devicePlatform**        | `iPhone6,1`               | ios, android       |
| **wifi**                  | `YES`                     | ios, android       |
| **currentUrl**            | `http://mywebsite.com`    | web                |
| **userAgent**             | `Mozilla/5.0...`          | web                |
| **referrer**              | `http://google.com`       | web                |
| **browserLanguage**       | `en-US`                   | web                |
| **currentTittle**         | `Welcome`                 | web                |

The API will respond with the `appUserId` of the app user in question, which can then be used to make API calls to the conversation API. The response will also include any profile information that was previously set for the app user, including custom properties.

<aside class="notice">
In some scenarios, the `appUserId` returned in an app boot call may change. This is possible for example when the `userId` is being used to log a user in on multiple devices, which may cause two distinct `appUserId`s to merge together. The caller should always check if the returned `appUserId` has changed, and re-fetch conversation history whenever appropriate.
</aside>