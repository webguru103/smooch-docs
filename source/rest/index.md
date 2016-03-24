---
layout: 3col
title: Smooch API Reference

language_tabs:
  - shell
  - javascript

toc_footers:
  - <a href='http://smooch.io/'>Sign up for Smooch, it's free</a>
  - <br/>
  - <a href='/ios'>iOS Guide</a> | <a href='/api/ios'>Class Reference</a>
  - <a href='/android'>Android Guide</a> | <a href='/api/android'>Class Reference</a>
  - <a href='/javascript'>Web Guide</a> | <a href='https://github.com/smooch/smooch-js' target="_blank">Class Reference</a>
  - <a href='/rest'>REST API Reference</a>

includes:

search: true
---

# Introduction

Welcome to the Smooch API. The API allows you to craft entirely unique messaging experiences for your app and website as well as talk to any backend or external service.

## Basics

The Smooch API is designed according to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

The API accepts JSON in request bodies and requires that the `content-type: application/json` header be specified for all such requests. The API will always respond with a JSON object. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.

The API also facilitates [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) so that it can be called from a web application.

## Errors

Smooch uses standard HTTP status codes to communicate errors

|         |   |
|---------|---|
| **200** | OK - Everything went as planned. |
| **400** | Bad Request - Something in your header or request body was malformed. |
| **401** | Unauthorized - Necessary credentials were either missing or invalid. |
| **403** | Forbidden - Your credentials are valid but you don't have access to the requested resource. |
| **404** | Not Found - The object you're requesting doesn't exist. |
| **409** | Conflict - You might be trying to update the same resource concurrently. |
| **429** | Too Many Requests - You are calling our APIs more frequently than we allow. |
| **500, 502, 503, 504** | Server Errors - Something went wrong on our end. |

## Rate Limits

Smooch APIs are subject to rate limiting.  If you exceed the limits, Smooch will start returning a `429 Too Many Requests` HTTP status code. We apply rate limits to prevent abuse, spam, denial-of-service attacks, and similar issues. Our goal is to keep the limits high enough so that any application using Smooch as intended will never hit them. However, applications that consistently exceed limits run the risk of being permanently disabled.

# Authentication

Smooch APIs offer two methods of authentication:

1. Using an [App Token](#app-token)
1. Using a [JSON Web Token (JWT)](#jwt)

Some APIs accept either of the two authentication methods while others require a `jwt` credential.

| API                          | Valid authentication methods |
|------------------------------|------------------------------|
| [`/v1/appusers`](#app-user)  | `jwt`, `appToken`            |
| [`/v1/init`](#init)          | `jwt`, `appToken`            |
| [`/v1/webhooks`](#webhook)   | `jwt`                        |

## App Token


```shell
# Calling GET /v1/appusers using an app token
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

```js
// Initializing Smooch Core with an app token
var smooch = new SmoochCore({
    appToken: 'cr2g6jgxrahuh68n1o3e2fcnt'
});
```

When calling Smooch APIs such as [`/v1/appusers`](#app-users) on behalf of app users, an `appToken` may be used for basic authentication.

Every Smooch app has an `appToken` provisioned to it which can be found in the app settings tab. The `appToken` is sent via the the `app-token` HTTP header. This will link the caller to a specific Smooch app.

Specifying an `appToken` alone is sufficient to call any of the app user facing API.

## JWT


```shell
# Calling GET /v1/appusers using a jwt
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: Bearer your-jwt'
```
```js
// Initializing Smooch Core with a jwt in the browser
var smooch = new SmoochCore({
    jwt: 'your-jwt'
});
```
```js
// Initializing Smooch Core with a jwt in Node.js
var smooch = new SmoochCore({
    keyId: 'your-key-id',
    secret: 'your-secret',
    scope: 'appUser', // app or appUser
    userId: 'some-id' // not necessary if scope === 'app'
});
```

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. The full specification is described [here](https://tools.ietf.org/html/rfc7519), and a set of supported JWT libraries for a variety of languages and platforms can be found at [http://jwt.io](http://jwt.io). To summarize, a JWT is composed of a header, a payload, and a signature. The payload contains information called *claims* which describe the subject to whom the token was issued.

For added security when making calls on behalf of an app user, a `jwt` credential can optionally be specified instead of an `appToken`.

The `jwt` itself is transmitted via the HTTP `authorization` header. The token should be prefixed with "Bearer" followed by a space. For example: `Bearer your-jwt`.

To sign JWTs, you will need to create a secret key in the Smooch dashboard, by going into the Settings tab. Clicking on "Create New Secret Key" will generate a new key id and a secret key pair which you can use to sign JWTs.

<aside class="warning">
After using a `jwt` with `appUser` scope to authenticate an app user for the `/appuser` or `/init` routes, it becomes no longer possible to authenticate that app user with an `appToken`.
</aside>

### Header

> JWT header:

```json
{
    "alg": "HS256",
    "typ": "JWT",
    "kid": "b567635f883c819871ace8003c0db14b"
}
```

The JWT header must contain the key id (`kid`) of the secret key that is used to sign it. The algorithm (`alg`) used to sign the JWT can be anything supported by the [jsonwebtoken npm module v5.0.4](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported). Unsigned JWTs are not accepted.

> JWT payload with `appUser` scope claim:

```json
{
    "scope": "appUser",
    "userId": "bob@example.com"
}
```

> JWT payload with `app` scope:

```json
{
    "scope": "app"
}
```

### Scope

The `jwt` payload must include a `scope` claim which specifies the caller's scope of access. There are two levels of scope:

1. The `appUser` scope grants access to an individual app user's data and conversation history, but nothing else. It is used when issuing tokens to individual users. A `jwt` with `appUser` scope must also specify a `userId` which uniquely identifies the `appUser` being accessed. [Node.js code sample](https://gist.github.com/alavers/8f07b03895333d83b454)

1. The `app` scope grants access to all users and conversations within a given Smooch app. The `app` scope is reserved for server-to-server scenarios, the creation of webhooks for example. [Node.js code sample](https://gist.github.com/alavers/d9af102ca4cefac1a7e5)

| API                       | Accepted `jwt` Scopes |
|---------------------------|-----------------------|
| [/v1/appusers](#app-user) | app, appUser          |
| [/v1/webhooks](#webhook)  | app                   |

# Webhooks

> Webhook example payload:

```json
{
    "trigger": "message:appUser",
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "text": "Hi! Do you have time to chat?",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "metadata": [],
        "actions": []
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "devices": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients or to integrate more deeply with your favorite CRM.

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single Smooch app.

When a webhook trigger is triggered, a JSON payload will be posted to the URL configured in your webhook object. You can see an example of this payload to the right.

## Create webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks \
     -X POST \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
    target: 'http://example.com/callback'
}).then((response) => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
      "message"
    ],
    "secret": "8564b3e6a8b20a4bdb68b05d9ea97aace9bc5936",
    "target": "http://example.com/callback"
  }
}
```

<api>`POST /v1/webhooks`</api>

Create a webhook for the specified app. The response body will include a list of triggers that will trigger the webhook (currently only message triggers are supported) as well as a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

Alternatively, you can use the Webhooks integration in the Smooch dashboard to easily create a webhook.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/>*required* | URL to be called when the webhook is triggered. |
| **triggers**<br/>*optional*  | An array of triggers you wish to have the webhook listen to. If unspecified the default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

## List webhooks

> Request:

```shell
  curl https://api.smooch.io/v1/webhooks \
       -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.list().then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhooks": [
    {
      "_id": "55c8d9758590aa1900b9b9f6",
      "triggers": [
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
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.get('55c8d9758590aa1900b9b9f6').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
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
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X PUT \
     -d '{"target": "http://example.com/callback"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.update('55c8d9758590aa1900b9b9f6', {
    target: 'http://example.com/callback'
}).then((response) => {
    // async code
});
```

> Response

```
200 OK
```
```json
{
  "webhook": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "triggers": [
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
| **triggers**<br/>*optional*  | The triggers you wish to have the webhook listen to. The default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

## Delete webhook

> Request:

```shell
curl https://api.smooch.io/v1/webhooks/55c8d9758590aa1900b9b9f6 \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.webhooks.delete('55c8d9758590aa1900b9b9f6').then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/webhooks/{webhookId}`</api>

Deletes the specified webhook.

## Webhook triggers

> Request:

```shell
curl https://api.smooch.io/v1/webhooks
     -X POST \
     -d '{"target": "http://example.com/callback", "triggers": ["message:appUser"]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.webhooks.create({
    target: 'http://example.com/callback',
    triggers: [
        'message:appUser'
    ]
}).then((response) => {
    // async code
});
```

A webhook will make a request to the target each time a trigger associated with the webhook occurs. Triggers are specified in an optional `triggers` array in the request body. If `triggers` is not specified the webhook will be configured with the `message` trigger by default.

| trigger          |   |
|------------------|---|
| **message**<br/>*default* | all messages            |
| **message:appUser**       | only app user messages  |
| **message:appMaker**      | only app maker messages |

## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.

## Retry Policy

If a webhook target responds with anything other than a 2xx status code, the call will be reattempted up to 5 times at an exponentially increasing interval.

# Init

> Request:

```shell
curl https://api.smooch.io/v1/init \
     -X POST \
     -d '{"device": {"id": "03f70682b7f5b21536a3674f38b3e220", "platform": "ios", "appVersion": "1.0"}, "userId": "bob@example.com"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```

```js
smooch.appUsers.init({
    device: {
        id: '03f70682b7f5b21536a3674f38b3e220',
        platform: 'ios',
        appVersion: '1.0'
    },
    userId: 'bob@example.com'
}).then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "app": {
        "hasIcon": true,
        "apnEnabled": true,
        "gcmProject": "731399543244"
    },
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "devices": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

<api>`POST /v1/init`</api>

This API is called by a mobile device or browser when the app is first loaded. It serves a number of purposes:

1. Initializes a new `appUser` and `device` if they don't yet exist
1. Updates an existing app user's profile and device information
1. Authenticates the `appUser` if `jwt` credentials are provided

The API requires that a `device` be specified at the very minimum. A `userId` may also be specified to [link app user accounts across devices](/#users-on-multiple-devices).

The API responds with an `appUser` object. The `appUser` includes an `_id` that can be used to make further API calls on behalf of that user. If the `userId` and/or `device.id` are seen for the first time a new `appUser` will be created. If not, the existing `appUser` be returned.

An `app` object is also returned which includes metadata about the app, such as information about push notification channels.

| **Arguments**               |   |
|-----------------------------|---|
| **device**<br/>*required* | A descriptor of the user's device. See below. |
| **userId**<br/>*optional* | A unique identifier for the app user. Unlike the `smoochId` which is generated by Smooch, the `userId` is chosen by the API consumer. The `userId` can be used to link a user to the same conversation [across multiple devices](/#users-on-multiple-devices).|

<aside class="warning">
**Caution:** If you're specifying a `userId` then in order to keep conversations private we strongly suggest [authenticating your users](/#authenticating-users-optional). If a `userId` is used without a JWT credential, then anyone who can discover a user's `userId` could potentially eavesdrop on the conversation.
</aside>

## Device

If a `userId` is used when calling `/v1/init`, then devices and app users may have a many-to-many relationship. A single `userId` may use Smooch from multiple devices and multiple different `userId`s may log in to the same device.

<aside class="notice">
*Note:* Only one `userId` can be active on a given device at a time. On a device that's shared between multiple `userId`s, only the most recent `userId` to have called `/v1/init` will receive push notifications from the integrated application on that device.
</aside>

| **`device` arguments**      |   |
|-----------------------------|---|
| **id**<br/>*required* | An identifier for the device. Must be globally unique. |
| **platform**<br/>*required* | `ios`, `android`, `web`, or `other` |
| **pushNotificationToken**<br/>*optional* | The GCM or APN token to be used for sending push notifications to the device.
| **appVersion**<br/>*optional* | A reserved string field for reporting the app version running on the device. For example: `8.0` |
| **info**<br/>*optional* | A flat JSON structure detailing device properties. See below. |

## Device Info

The `device` object may also accept a flat `info` JSON object. Device information reported here will be rendered alongside app user information inside any app maker channels configured with Smooch. The `platform` and `appVersion` fields are special in that they can be used as audience targeting criteria for whispers.

| Field                     | Example                   | Relevant Platforms |
|---------------------------|---------------------------|--------------------|
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

The API will respond with the `_id` of the app user in question, which can then be used to make API calls to the conversation API. The response will also include any profile information that was previously set for the app user, including custom properties.

<aside class="notice">
In some scenarios, the `appUser._id` returned in an app boot call may change. This is possible for example when the `userId` is being used to log a user in on multiple devices, which may cause two distinct app users to merge together. The caller should always check if the returned `appUser._id` has changed, and re-fetch conversation history whenever appropriate.
</aside>

# App User

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/v1/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

### userId

App users may be created with an optional `userId` parameter. This is a unique identifier that is chosen by the API consumer and it can be used to synchronize a single conversation across multiple devices. To understand how this works, see the section covering [users on multiple devices](/#users-on-multiple-devices).

<aside class="notice">
If a `userId` has been specified for a given app user, it can be used in place of the `appUser._id` in any `/v1/appusers/` API path.
</aside>

## Get App User

> Request by smoochId:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.get('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/appusers/steveb@channel5.com \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.get('steveb@channel5.com').then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
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
        "conversationStarted": true,
        "devices": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

<api>`GET /v1/appusers/{smoochId|userId}`</api>

Retrieve a specific app user. Like all other `/v1/appusers/` paths, an app user can be identified using either the `smoochId` or the `userId`.

## Update

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Steve"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.update('c7f6e6d6c3a637261bd9656f', {
    givenName: 'Steve'
}).then((response) => {
    // async code
});
```

> Response:

```
200 OK
```
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
        "conversationStarted": true,
        "devices": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>",
            "info": {
              "appName": "ShellApp",
              "devicePlatform": "x86_64",
              "os": "iPhone OS",
              "osVersion": "9.2"
            }
          }
        ]
    }
}
```

<api>`PUT /v1/appusers/{smoochId|userId}`</api>

Update an app user's basic profile information and specify custom profile data via `properties`. This API is additive; only the specific fields specified in the request body, and only the specific JSON sub-fields included in the `properties` field will be updated. In other words, omitting a field will not delete that field.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **givenName**<br/>*optional*  | The user's given name (first name). |
| **surname**<br/>*optional*    | The user's surname (last name). |
| **email**<br/>*optional*      | The user's email address. |
| **signedUpAt**<br/>*optional* | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/>*optional* | A flat JSON object containing custom defined user properties. |

## Track Event

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/events \
     -X POST \
     -d '{"name":"completed_sale"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.trackEvent('c7f6e6d6c3a637261bd9656f', 'completed_sale').then((response) => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
    "conversationUpdated": true
}
```

<api>`POST /v1/appusers/{smoochId|userId}/events`</api>

Trigger an event for a given app user. Some Smooch whispers are triggered on discrete events. This API is used to trigger such events. For example, if an app has a whisper configured to be sent whenever a user has triggered the `completed_sale` event, calling this API is the way to trigger such a whisper.

| **Arguments**           |   |
|-------------------------|---|
| **name**<br/>*required* | The name of the triggered event. |

## Pre-Create App User

> Request:

```shell
curl https://api.smooch.io/v1/appusers \
     -X POST \
     -d '{"userId": "steveb@channel5.com", "givenName": "Steve", "properties": {"favoriteFood": "prizza"}}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.create('steveb@channel5.com', {
    givenName: 'Steve',
    properties: {
        favoriteFood: 'prizza'
    }
}).then((response) => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
    "appUser": {
        "_id": "deb920657bbc3adc3fec7963",
        "userId": "steveb@channel5.com",
        "givenName": "Steve",
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {
          "favoriteFood": "prizza"
        },
        "conversationStarted": false,
        "credentialRequired": false
    }
}
```

<api>`POST /v1/appusers`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **userId**<br/>*required*     | A unique identifier for the app user. The `userId` can be used to link a user to the same conversation [across multiple devices](/#users-on-multiple-devices).|
| **credentialRequired**<br/>*optional* | Default is `false`. Set to `true` to ensure that the created app user requires a `jwt` credential. See [authenticating your users](/#authenticating-users-optional) for more information.
| **givenName**<br/>*optional*  | The user's given name (first name). |
| **surname**<br/>*optional*    | The user's surname (last name). |
| **email**<br/>*optional*      | The user's email address. |
| **signedUpAt**<br/>*optional* | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/>*optional* | A flat JSON object containing custom defined user properties. |

In the vast majority of cases app users will be created from the device or browser using the [init API](#init). In some cases however it might be necessary to pre-create an app user object before that user runs your app for the first time. This API facilitates this scenario. A `userId` must be specified so that a future `init` call made from a device can use the same `userId` to link the device to the pre-created app user.

Suppose for example you begin a conversation with an end user `bob@example.com` over email and you wish to transfer this conversation history over into Smooch once that user logs in to your app. To facilitate this, you can call `POST /v1/appusers` to pre-create a Smooch identity with `userId` `bob@example.com`, to which you can import that existing conversation history. After Bob signs in to your app and your app calls `init` with the same `userId`, they will see their conversation history.

<aside class="notice">
Unlike the other App User APIs in this section, this endpoint is not intended to be called from an end user device or from a browser. It requires a `jwt` credential with `app` level scope.
</aside>

# Conversations

When the first message is sent to an app user or received from an app user, a conversation is automatically created for them. The conversation and messages for a given app user can be retrieved and created by way of the `/v1/appusers/` API.

## Get Conversation

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.conversations.get('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Response

```
200 OK
```
```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "appMakers": [],
    "appUsers": ["c7f6e6d6c3a637261bd9656f"],
    "unreadCount": 0,
    "messages": [{
      "_id": "55c8c1498590aa1900b9b9b1",
      "authorId": "c7f6e6d6c3a637261bd9656f",
      "role": "appUser",
      "name": "Steve",
      "text": "Just put some vinegar on it",
      "avatarUrl": "https://www.gravatar.com/image.jpg",
      "received": 1439220041.586
    }]
  }
}
```

<api>`GET /v1/appusers/{smoochId|userId}/conversation`</api>

Get the specified app user's conversation history, if it exists. If the conversation has not yet been created for the specified app user 404 will be returned.

## Reset Unread Count
> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/read \
     -X POST \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.conversations.resetUnreadCount('c7f6e6d6c3a637261bd9656f').then(() => {
    // async code
});
```

> Response

```
200 OK
```

<api>`POST /v1/appusers/{appUserId|userId}/conversation/read`</api>

Reset the unread count of the conversation to 0. If the conversation has not yet been created for the specified app user 404 will be returned.

## Post Message

> Post as app user:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appUser"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.conversations.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appUser'
}).then(() => {
    // async code
});
```

> Post as app maker:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.conversations.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker'
}).then(() => {
    // async code
});
```

> Response:

```
201 CREATED
```
```json
{
  "message": {
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appMaker",
    "name": "Steve",
    "text": "Just put some vinegar on it",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1439220041.586
  },
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "appMakers": [],
    "appUsers": ["c7f6e6d6c3a637261bd9656f"],
    "unreadCount": 0,
    "messages": [{
      "_id": "55c8c1498590aa1900b9b9b1",
      "authorId": "c7f6e6d6c3a637261bd9656f",
      "role": "appMaker",
      "name": "Steve",
      "text": "Just put some vinegar on it",
      "avatarUrl": "https://www.gravatar.com/image.jpg",
      "received": 1439220041.586
    }]
  }
}
```

<api>`POST /v1/appusers/{smoochId|userId}/conversation/messages`</api>

Post a message to the app user. If the app user does not yet have a conversation, one will be created automatically. The message `text` and `role` must both be specified. For messages coming from the app user, set `role` to `appUser`. For messages coming from an app maker, set this parameter to `appMaker`.

Images can be posted by reference using this API by specifying the `mediaUrl` and `mediaType` parameters. Alternatively, you may also upload images to the conversation directly using the [`/images`](#post-image) endpoint.

<aside class="notice">
For messages originating from an app maker, a `jwt` credential with `app` level scope must be included.
</aside>

| **Arguments**                |                            |
|------------------------------|----------------------------|
| **text**<br/>*required*      | The message content. `text` becomes optional if `mediaUrl` and `mediaType` are both specified. |
| **role**<br/>*required*      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **name**<br/>*optional*      | The display name of the message author. Messages with role `appUser` will default to a friendly name based on the user's `givenName` and `surname`. Messages with role `appMaker` have no default name. |
| **email**<br/>*optional*     | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the Smooch account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/>*optional* | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **mediaUrl**<br/>*optional*  | The image URL used in an image message. If a `mediaUrl` is specified, the `mediaType` must also be specified. |
| **mediaType**<br/>*optional* | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpeg` |
| **metadata**<br/>*optional*  | Flat JSON object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. |

## Upload Image

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/images \
     -X POST \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt' \
     -H 'content-type: multipart/form-data' \
     -F 'source=@screenshot.jpg;type=image/jpeg' \
     -F 'role=appUser' \
     -F 'name=Steve'
```
```js
// Not supported yet in the JS SDK
```

> Response:

```
201 CREATED
```
```json
{
  "message": {
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appUser",
    "name": "Steve",
    "text": "https://media.smooch.io/image.jpg",
    "mediaUrl": "https://media.smooch.io/image.jpg",
    "mediaType": "image/jpeg",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1446599350.851
  },
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "appMakers": [],
    "appUsers": ["c7f6e6d6c3a637261bd9656f"],
    "messages": [{
      "_id": "55c8c1498590aa1900b9b9b1",
      "authorId": "c7f6e6d6c3a637261bd9656f",
      "role": "appUser",
      "name": "Steve",
      "text": "https://media.smooch.io/image.jpg",
      "mediaUrl": "https://media.smooch.io/image.jpg",
      "mediaType": "image/jpeg",
      "avatarUrl": "https://www.gravatar.com/image.jpg",
      "received": 1446599350.851
    }]
  }
}
```

<api>`POST /v1/appusers/{smoochId|userId}/conversation/images`</api>

Upload an image and post it to the conversation. Images are uploaded using the `multipart/form-data` content type. Similar to the `/messages` endpoint, a `role` parameter must be specified. The `/images` endpoint accepts the same parameters as `/messages` but they are sent as form parameters as opposed to being encoded in JSON bodies. The uploaded image will render as part of the message thread in all supported app maker channels (email, Slack, HipChat, Zendesk, Helpscout).

| **Form Parameters**          |                            |
|------------------------------|----------------------------|
| **source**<br/>*required*    | The image data.            |
| **role**<br/>*required*      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
