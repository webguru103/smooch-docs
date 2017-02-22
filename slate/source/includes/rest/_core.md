
# Introduction

Welcome to the Smooch API. The API allows you to craft entirely unique messaging experiences for your app and website as well as talk to any backend or external service.

## Basics

The Smooch API is designed according to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles.

The API accepts JSON in request bodies and requires that the `content-type: application/json` header be specified for all such requests. The API will always respond with a JSON object. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.

The API also facilitates [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) so that it can be called from a web application.

## Errors

```
401 Unauthorized
```
```
{
  "error": {
    "code": "unauthorized",
    "description": "Authorization is required"
  }
}
```

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

In addition to the status code, the HTTP body of the response will also contain a JSON representation of the error.

## Rate Limits

Smooch APIs are subject to rate limiting.  If you exceed the limits, Smooch will start returning a `429 Too Many Requests` HTTP status code. We apply rate limits to prevent abuse, spam, denial-of-service attacks, and similar issues. Our goal is to keep the limits high enough so that any application using Smooch as intended will never hit them. However, applications that consistently exceed limits run the risk of being permanently disabled.

## Deprecations

The `devices` array returned in the AppUser payload has been changed to `clients`. In order to maintain compatibility, we will keep returning the `devices` array in v1, but in the next version it will be removed.

# Authorization

This is an overview of how authorization works with the Smooch API.

Smooch offers two methods for authentication JSON Web Token (JWT) and app token. [See below](#authentication) for more details. There are three different scopes of authorization available. These are _appUser_, _app_, and _appMaker_.

| Scope        | Methods  | Authorized APIs  |
|--------------|---------------|------------------|
| **appUser**  | JWT, appToken | [Init](#init), [App User](#app-user), [Conversations](#conversations) |
| **app**      | JWT           | [Init](#init), [App User](#app-user), [Conversations](#conversations) [Webhooks](#webhooks), [Persistent Menus](#persistent-menus) |

The **appToken** authentication method only allows you to call the API on behalf of users who have not yet been secured by an app user scoped JWT.

JWTs issued with **appUser** scope grant the caller permission to access that specific user's data only. Once an app user JWT is used for the first time, the user and their conversation history will transition into secure mode, and from that point onward a JWT will be *required* for any subsequent API calls pertaining to that user. An **appToken** will no longer be accepted to access that specific user's data.

JWTs issued with **app** scope can be used to access any of the Smooch Core APIs on behalf of the app, or any app user.

# Authentication

Smooch APIs offer two methods of authentication:

1. Using an [App Token](#app-token)
2. Using a [JSON Web Token (JWT)](#jwt)

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

Webhooks are a fantastic way to extend the Smooch platform beyond the built-in feature set. You can use webhooks to build your own Smooch chat clients, to integrate more deeply with your favorite CRM, or to [build a bot](https://github.com/smooch/smooch-bot).

These webhook APIs require a `jwt` credential with `app` level scope. Furthermore, a webhook can only operate within the scope of a single Smooch app.

When a webhook trigger is triggered, a JSON payload will be posted to the URL configured in your webhook object. You can see an example of this payload [here](#webhooks-payload).

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

Create a webhook for the specified app. The response body will include a secret which will be transmitted with each webhook invocation and can be used to verify the authenticity of the caller.

Alternatively, you can use the Webhooks integration in the Smooch dashboard to easily create a webhook.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='req'>required</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | An array of triggers you wish to have the webhook listen to. If unspecified the default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

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

<api>`PUT /v1/webhooks/{webhookId}`</api>

Use this API to update your existing webhooks.

| **Arguments**             |   |
|---------------------------|---|
| **target**<br/><span class='opt'>optional</span> | URL to be called when the webhook is triggered. |
| **triggers**<br/><span class='opt'>optional</span>  | The triggers you wish to have the webhook listen to. The default trigger is `message`. This property is case sensitive. [More details](#webhook-triggers). |

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

| trigger                   |                                                                |
|---------------------------|----------------------------------------------------------------|
| **message**<br/>*default* | all messages                                                   |
| **message:appUser**       | only messages with role `appUser`                              |
| **message:appMaker**      | only messages with role `appMaker` or `whisper`                |
| **conversation:start**    | when a user opts in to start receiving messages                |
| **conversation:read**     | when a user reads a conversation                               |
| **postback**              | when a user clicks on a postback action                        |
| **merge:appUser**         | when two or more users are merged into one                     |
| **delivery:success**      | when a message is successfully delivered to a customer channel |
| **delivery:failure**      | when a message fails to be delivered to a customer channel     |
| **payment:success**       | when a payment is successfully received from a channel         |
| <strong>*</strong>        | when any of the above triggers occurs                          |

## Webhooks payload

When a webhook trigger is triggered, a `POST` request will be made to the URL configured in your webhook object along with a JSON payload.

The structure of the JSON payload differs based on the trigger of the webhook. On the right, you can see examples of the JSON payload for the different triggers.

### Trigger - `message:appUser` (text)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "type": "text",
        "text": "Hi! Do you have time to chat?",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "source": {
            "type": "messenger"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for a [text message](#text-message).

### Trigger - `message:appUser` (image)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "_id": "55c8c1498590aa1900b9b9b1",
        "type": "image",
        "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
        "role": "appUser",
        "authorId": "c7f6e6d6c3a637261bd9656f",
        "name": "Steve",
        "received": 1444348338.704,
        "source": {
            "type": "messenger"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for an [image message](#image-message).

### Trigger - `message:appMaker` (carousel)

> Payload:

```json
{
    "trigger": "message:appMaker",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "items": [
            {
                "title": "Tacos",
                "description": "Beef and cheese... Mhm...",
                "size": "large",
                "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
                "mediaType": "image/png",
                "_id": "5887c9117e4de029005f1fc7",
                "actions": [
                    {
                      "text": "Oh yeah!",
                      "payload": "TACOS",
                      "_id": "5887c9117e4de029005f1fc8",
                      "type": "postback"
                    }
                ]
            }
        ],
        "type": "carousel",
        "role": "appMaker",
        "received": 1485293841.303,
        "authorId": "2cKU9zRO2DpBWgk764Tfro",
        "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
        "_id": "5887c9117e4de029005f1fc6",
        "source": {
          "type": "api"
        }
  }],
  "appUser": {
      "_id": "c7f6e6d6c3a637261bd9656f",
      "userId": "bob@example.com",
      "properties": {},
      "signedUpAt": "2015-10-06T03:38:02.346Z",
      "clients": [
        {
          "active": true,
          "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
          "lastSeen": "2016-03-09T19:09:01.431Z",
          "platform": "messenger"
        }
      ]
  }
}
```

The payload for a [carousel message](#carousel-message).

### Trigger - `message:appMaker` (list)

> Payload:

```json
{
    "trigger": "message:appMaker",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "messages":[{
        "items": [
            {
                "title": "Tacos",
                "description": "Beef and cheese... Mhm...",
                "size": "large",
                "mediaUrl": "http://www.tacobueno.com/media/1338/partytacolarge.png?quality=65",
                "mediaType": "image/png",
                "_id": "5887c9117e4de029005f1fc7",
                "actions": [
                    {
                      "text": "Oh yeah!",
                      "payload": "TACOS",
                      "_id": "5887c9117e4de029005f1fc8",
                      "type": "postback"
                    }
                ]
            }
        ],
        "actions": [
            {
              "text": "More Choices!",
              "payload": "MORE",
              "_id": "5887c9a37e4de029005f1fce",
              "type": "postback"
            }
        ],
        "type": "list",
        "role": "appMaker",
        "received": 1485293841.303,
        "authorId": "2cKU9zRO2DpBWgk764Tfro",
        "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
        "_id": "5887c9117e4de029005f1fc6",
        "source": {
          "type": "api"
        }
  }],
  "appUser": {
      "_id": "c7f6e6d6c3a637261bd9656f",
      "userId": "bob@example.com",
      "properties": {},
      "signedUpAt": "2015-10-06T03:38:02.346Z",
      "clients": [
        {
          "active": true,
          "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
          "lastSeen": "2016-03-09T19:09:01.431Z",
          "platform": "messenger"
        }
      ]
  }
}
```

The payload for a [list message](#list-message).

### Trigger - `message:appUser` (location)

> Payload:

```json
{
    "trigger": "message:appUser",
    "app": {
        "_id": "55fafea8bf8fd41a00357805"
    },
    "messages": [
        {
            "text": "Location shared:\nhttps://maps.google.com/maps?q=45.5261583,-73.595346",
            "authorId": "76293a38b24c5cca43e79415",
            "received": 1485292067.601,
            "type": "location",
            "coordinates": {
                "lat": 45.5261583,
                "long": -73.595346,
                "_id": "5887c22356c66904009ad603"
            },
            "role": "appUser",
            "_id": "5887c22356c66904009ad602",
            "source": {
                "type": "messenger"
            }
        }
    ],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for when a user sends their location.

### Trigger - `postback`

> Payload:

```json
{
    "trigger": "postback",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "postbacks":[{
        "message": {
            "_id": "55c8c1498590aa1900b9b9b1",
            "text": "Do you want to see more options?",
            "type": "text",
            "role": "appMaker",
            "authorId": "c7f6e6d6c3a637261bd9656f",
            "name": "LunchBot",
            "received": 1444348338.704,
            "source": {
                "type": "slack"
            },
            "actions": [{
                "_id": "571530ee4fae94c32b78b170",
                "type": "postback",
                "text": "Yes",
                "payload": "YES"
            }]
        },
        "action": {
            "_id": "571530ee4fae94c32b78b170",
            "type": "postback",
            "text": "Read more",
            "payload": "YES"
        }
    }],
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    }
}
```

The payload for when a user taps a [postback button](#postback).<br/>
Postbacks originating from a [persistent menu](#persistent-menus) do not have messages associated with them, and so omit the `message` property.


### Trigger - `conversation:start`

> Payload:

```json
{
    "trigger": "conversation:start",
    "app": {
        "_id": "57ec2881c47d2d24b0c16427"
    },
    "source": {
        "type": "messenger"
    },
    "appUser": {
        "_id": "c7f6e6d6c3a637261bd9656f",
        "userId": "bob@example.com",
        "properties": {},
        "signedUpAt": "2015-10-06T03:38:02.346Z",
        "clients": [
          {
            "active": true,
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "messenger"
          }
        ]
    },
    "timestamp": 1480349392.103
}
```

The payload for when a user opts in to start receiving messages. `conversation:start` is only available on a sub set of channels. [Channel capabilities](https://docs.smooch.io/guide/channel-capabilities/) lists which channel currently supports it. Also, note that `conversation:start` won't be triggered when a user is linking a second channel via the Web Messenger.

### Trigger - `conversation:read`

> Payload:

```json
{
    "trigger": "conversation:read",
    "app": {
        "_id": "57ec2881c47d2d24b0c16427"
    },
    "source": {
        "type": "messenger"
    },
    "appUser": {
        "_id": "7685787bf0e9e8cf56182288"
    },
    "timestamp": 1480349392.103
}
```

The payload for when a user reads a conversation.

### Trigger - `merge:appUser`

> Payload:

```json
{
    "trigger": "merge:appUser",
    "app": {
        "_id": "5698edbf2a43bd081be982f1"
    },
    "surviving": {
        "_id": "a79a0ecfba3260bf145be257",
        "userId": "123",
        "conversationStarted": true
    },
    "discarded": [{
        "_id": "1ac30dad829178f6378f61f4",
        "conversationStarted": false
    }]
}
```

The payload for when two users are merged into one.

### Trigger - `delivery:success`

> Payload:

```json
{
    "trigger": "delivery:success",
    "app": {
        "_id": "575040549a38df8fb4eb1e51"
    },
    "appUser": {
        "_id": "de13bee15b51033b34162411",
        "userId": "123"
    },
    "destination": {
        "type": "line"
    },
    "messages": [
        {
            "text": "Hi! Do you have time to chat?",
            "received": 1480001439.637,
            "name": "Danny",
            "role": "appMaker",
            "type": "text",
            "authorId": "5X8AJwvpy0taCkPDniC5la",
            "avatarUrl": "https://www.gravatar.com/image.jpg",
            "_id": "5837079fd84370ef2c0dcabb",
            "source": {
                "type": "slack"
            }
        }
    ],
    "timestamp": 1480001440.731
}
```

The payload for when the delivery of a message was successful.

### Trigger - `delivery:failure`

> Payload:

```json
{
    "trigger": "delivery:failure",
    "app": {
        "_id": "575040549a38df8fb4eb1e51"
    },
    "appUser": {
        "_id": "de13bee15b51033b34162411",
        "userId": "123"
    },
    "destination": {
        "type": "line"
    },
    "error": {
        "code": "unauthorized",
        "underlyingError": {
            "message": "Authentication failed due to the following reason: invalid token. Confirm that the access token in the authorization header is valid."
        }
    },
    "messages": [
        {
            "text": "Hi! Do you have time to chat?",
            "received": 1480001711.288,
            "name": "Danny",
            "role": "appMaker",
            "type": "text",
            "authorId": "5X8AJwvpy0taCkPDniC5la",
            "avatarUrl": "https://www.gravatar.com/image.jpg",
            "_id": "583708af8d449209ba217871",
            "source": {
                "type": "slack"
            }
        }
    ],
    "timestamp": 1480001711.941
}
```

The payload for when the delivery of a message fails.

### Trigger - `payment:success`

> Payload:

```json
{
    "trigger": "payment:success",
    "app": {
        "_id": "571e3496cb98b3962ce740d7"
    },
    "appUser": {
        "_id": "2b15a54fde9dc2f33f88bc25"
    },
    "payments": [
        {
            "source": {
                "type": "messenger"
            },
            "message": {
                "text": "Just put some vinegar on it",
                "actions": [
                    {
                        "text": "Buy vinegar",
                        "amount": 1000,
                        "currency": "usd",
                        "state": "paid",
                        "_id": "5877fd5624fe8fd934d7c2f3",
                        "uri": "https://app.smooch.io/checkout/5877fd5624fe8fd934d7c2f3",
                        "type": "buy"
                    }
                ],
                "type": "text",
                "role": "appMaker",
                "received": 1484258646.823,
                "authorId": "5X8AJwvpy0taCkPDniC5la",
                "avatarUrl": "https://www.gravatar.com/image.jpg",
                "_id": "5877fd5624fe8fd934d7c2f2",
                "source": {
                    "type": "api"
                }
            },
            "action": {
                "text": "Buy vinegar",
                "amount": 1000,
                "currency": "usd",
                "state": "paid",
                "_id": "5877fd5624fe8fd934d7c2f3",
                "uri": "https://app.smooch.io/checkout/5877fd5624fe8fd934d7c2f3",
                "type": "buy"
            },
            "charge": {
                "id": "ch_19dPrCHQ7f2U7NYSZ45OspXT"
            }
        }
    ],
    "timestamp": 1484258666.455
}
```

The payload for when a payment is received.

## Securing a webhook

When a webhook is created, a shared secret will be generated for it. The secret can be used to determine the veracity of a request to your webhook route. It is included as an `X-API-Key` header with each webhook request sent to the target URL.

That secret is available in the response to the POST request used to generate the webhook, or through a GET request to the webhook route.

## Retry Policy

If a webhook target responds with anything other than a 2xx status code, or if no response is received within 5 seconds, the call will be reattempted up to 5 times at an exponentially increasing interval.

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
        "clients": [
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

This API is called by an iOS, Android, or browser client when the app is first loaded. It serves a number of purposes:

1. Initializes a new `appUser` and `client` if they don't yet exist
1. Updates an existing app user's profile and client information
1. Authenticates the `appUser` if `jwt` credentials are provided

The API requires that a `device` parameter be specified at the very minimum. A `userId` may also be specified to [link app user accounts across multiple clients](/guide/multi-client-users).

The API responds with an `appUser` object. The `appUser` includes an `_id` that can be used to make further API calls on behalf of that user. If the `userId` and/or `device.id` are seen for the first time a new `appUser` will be created. If not, the existing `appUser` be returned.

An `app` object is also returned which includes metadata about the app, such as information about push notification channels.

| **Arguments**               |   |
|-----------------------------|---|
| **device**<br/><span class='req'>required</span> | A descriptor of the user's device. See below. |
| **userId**<br/><span class='opt'>optional</span> | A unique identifier for the app user. Unlike the `smoochId` which is generated by Smooch, the `userId` is chosen by the API consumer. The `userId` can be used to link a user to the same conversation [across multiple clients](/guide/multi-client-users).|

<aside class="warning">
**Caution:** If you're specifying a `userId` then in order to keep conversations private we strongly suggest [authenticating your users](/#authenticating-users-optional). If a `userId` is used without a JWT credential, then anyone who can discover a user's `userId` could potentially eavesdrop on the conversation.
</aside>

## Devices are a type of client

Smooch uses the term `client` to refer generally to means by which a user can send and receive messages. This includes 3rd party accounts such as a connected Facebook Messenger account, however the init API specifically deals with registration and identification of iOS, Android and Web devices, which become persisted as one or many clients connected to a single user.

If a `userId` is used when calling `/v1/init`, then clients and app users may have a many-to-many relationship. A single `userId` may use Smooch from multiple clients and multiple different `userId`s may log in to the same device.

<aside class="notice">
**Note:** Only one `userId` can be active on a given client at a time. On a push notification capable client that's shared between multiple `userId`s, only the most recent `userId` to have called `/v1/init` will receive push notifications from the integrated application on that client.
</aside>

| **`device` arguments**      |   |
|-----------------------------|---|
| **id**<br/><span class='req'>required</span> | An identifier for the device. Must be globally unique. |
| **platform**<br/><span class='req'>required</span> | `ios`, `android`, `web`, or `other` |
| **pushNotificationToken**<br/><span class='opt'>optional</span> | The GCM or APN token to be used for sending push notifications to the device.
| **appVersion**<br/><span class='opt'>optional</span> | A reserved string field for reporting the app version running on the device. For example: `8.0` |
| **info**<br/><span class='opt'>optional</span> | A flat JSON structure detailing device properties. See below. |

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
In some scenarios, the `appUser._id` returned in an app boot call may change. This is possible for example when the `userId` is being used to log a user in on multiple clients, which may cause two distinct app users to merge together. The caller should always check if the returned `appUser._id` has changed, and re-fetch conversation history whenever appropriate.
</aside>

# App User

The app user object represents an end user using your app. The app user document contains basic profile information such as `givenName`, `surname`, and `email`, as well as any custom user properties you choose to configure.

The `/v1/appusers` path gives you APIs that can be used to update the user's properties, retrieve conversation history, post a message, and track app user events.

### userId

App users may be created with an optional `userId` parameter. This is a unique identifier that is chosen by the API consumer and it can be used to synchronize a single conversation across multiple clients. To understand how this works, see the section covering [users on multiple clients](/guide/multi-client-users).

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
        "clients": [
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

## Update App User

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
    "clients": [
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
| **givenName**<br/><span class='opt'>optional</span>  | The user's given name (first name). |
| **surname**<br/><span class='opt'>optional</span>    | The user's surname (last name). |
| **email**<br/><span class='opt'>optional</span>      | The user's email address. |
| **signedUpAt**<br/><span class='opt'>optional</span> | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/><span class='opt'>optional</span> | A flat JSON object containing custom defined user properties. |

## Update Device

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/devices/5A7F8343-DF41-46A8-96EC-8583FCB422FB \
     -X PUT \
     -d '{"appVersion": "8.0"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.updateDevice('c7f6e6d6c3a637261bd9656f', '5A7F8343-DF41-46A8-96EC-8583FCB422FB', {
    appVersion: '8.0'
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
  "device": {
    "active": true,
    "appVersion": "8.0",
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
}
```

<api>`PUT /v1/appusers/{smoochId|userId}/devices/{deviceId}`</api>

Update the properties of a device. This API is additive; only the specific fields specified in the request body, and only the specific JSON sub-fields included in the `info` field will be updated. In other words, omitting a field will not delete that field.

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **pushNotificationToken**<br/><span class='opt'>optional</span> | The GCM or APN token to be used for sending push notifications to the device.
| **appVersion**<br/><span class='opt'>optional</span> | A reserved string field for reporting the app version running on the device. For example: `8.0` |
| **info**<br/><span class='opt'>optional</span> | A flat JSON structure detailing device properties. See [Device Info](#device-info). |

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
| **name**<br/><span class='req'>required</span> | The name of the triggered event. |

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
| **userId**<br/><span class='req'>required</span>     | A unique identifier for the app user. The `userId` can be used to link a user to the same conversation [across multiple clients](/guide/multi-client-users).|
| **credentialRequired**<br/><span class='opt'>optional</span> | Default is `false`. Set to `true` to ensure that the created app user requires a `jwt` credential. See [authenticating your users](/#authenticating-users-optional) for more information.
| **givenName**<br/><span class='opt'>optional</span>  | The user's given name (first name). |
| **surname**<br/><span class='opt'>optional</span>    | The user's surname (last name). |
| **email**<br/><span class='opt'>optional</span>      | The user's email address. |
| **signedUpAt**<br/><span class='opt'>optional</span> | The date at which the user signed up. Must be ISO 8601 time format (`YYYY-MM-DDThh:mm:ss.sssZ`) |
| **properties**<br/><span class='opt'>optional</span> | A flat JSON object containing custom defined user properties. |

In the vast majority of cases app users will be created from the device or browser registered using the [init API](#init). In some cases however it might be necessary to pre-create an app user object before that user runs your app for the first time. This API facilitates this scenario. A `userId` must be specified so that a future `init` call made from a device can use the same `userId` to link the device to the pre-created app user.

Suppose for example you begin a conversation with an end user `bob@example.com` over email and you wish to transfer this conversation history over into Smooch once that user logs in to your app. To facilitate this, you can call `POST /v1/appusers` to pre-create a Smooch identity with `userId` `bob@example.com`, to which you can import that existing conversation history. After Bob signs in to your app and your app calls `init` with the same `userId`, they will see their conversation history.

<aside class="notice">
Unlike the other App User APIs in this section, this endpoint is not intended to be called from an end user's device or from a browser. It requires a `jwt` credential with `app` level scope.
</aside>

## Get App User Channel Entities

> Request:

```shell
curl https https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels \
    -H 'authorization: Bearer your-jwt'
```

```js
// This endpoint is not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
    "channels": [
        {
            "type": "twilio",
            "phoneNumber": "+15145555555"
        },
        {
            "type": "messenger",
            "userId": "198273192387"
        }
    ]
}
```

<api>`GET /v1/appusers/{smoochId|userId}/channels`</api>

Retrieves all of the app user's channel entity IDs.



## Link App User To Channel

> Request:

```shell
curl https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels \
     -X POST \
     -d '{"type": "twilio", "phoneNumber": "+15145555555"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.linkChannel('steveb@channel5.com', {
    type: 'twilio',
    phoneNumber: '+15145555555'
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
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {
          "favoriteFood": "pizza"
        },
        "conversationStarted": false,
        "credentialRequired": false,
        "clients": [],
        "pendingClients": [
            {
                "id": "d383f9f4-c8d2-42dd-9f7c-f525fad6849d",
                "platform": "twilio",
                "displayName": "+15145555555"
            }
        ]
    }
}
```

<api>`POST /v1/appusers/{smoochId|userId}/channels`</api>

| **Arguments**                 |                            |
|-------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>     | The channel to link.|
| **{entity}**<br/><span class='req'>required</span> | The required entity for linking. This is [different for each channel](#linkable-channels-and-entities).|
| **skipConfirmation**<br/><span class='opt'>optional</span> | Flag to specify whether or not the confirmation message is sent. Requires app scope JWT.|

Linking allows users to continue conversations on their preferred channels. An appUser's linked channels will be found in the `clients` field.

When a link request is first made, the channel will be added to the `pendingClients` field. The appUser is then prompted to accept the linking request. If they do so, the corresponding channel is then moved from the `pendingClients` field to `clients` field. If they reject the linking request then the channel is removed from `pendingClients`.

It is possible to skip the confirmation step with the `skipConfirmation` flag. App scope JWT is required to specify the confirmation option.

### Linkable channels and entities

Given that there is no way for you to provide Smooch with the necessary ID to connect Messenger, LINE, WeChat or Telegram, we have limited the API to only accept ‘Twilio’ for now.
Support for Frontend Email is coming soon.

| Channel type                 | Required entity              |
|------------------------------|------------------------------|
| twilio                       | **phoneNumber**<br/> A String of the appUser's phone number. It must contain the `+` prefix and the country code.<br/> Examples of valid phone numbers: `+1 212-555-2368`, `+12125552368`, `+1 212 555 2368`.<br/> Examples of invalid phone numbers: `212 555 2368`, `1 212 555 2368`.                  |



## Unlink App User From Channel

> Request:

```shell
curl https://api.smooch.io/v1/appusers/deb920657bbc3adc3fec7963/channels/twilio \
     -X DELETE \
     -d '{"type": "twilio"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.unlinkChannel('steveb@channel5.com', 'twilio')
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```

<api>`DELETE /v1/appusers/{smoochId|userId}/channels/{channel}`</api>

Removes the specified channel from the appUser's clients.

## Delete User Profile

> Request by smoochId:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/profile \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.deleteProfile('c7f6e6d6c3a637261bd9656f').then((response) => {
    // async code
});
```

> Request by userId:

```shell
curl https://api.smooch.io/v1/appusers/steveb@channel5.com/profile \
     -X DELETE \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.deleteProfile('steveb@channel5.com').then((response) => {
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
        "signedUpAt": "2015-10-08T23:52:11.677Z",
        "properties": {},
        "conversationStarted": true,
        "clients": [
          {
            "active": true,
            "appVersion": "1.0",
            "id": "5A7F8343-DF41-46A8-96EC-8583FCB422FB",
            "lastSeen": "2016-03-09T19:09:01.431Z",
            "platform": "ios",
            "pushNotificationToken": "<...>"
          }
        ]
    }
}
```

<api>`DELETE /v1/appusers/{smoochId|userId}/profile`</api>

Delete a user's profile. This API will clear the following information from a user:

- Given name
- Surname
- Email
- Custom properties
- Client

  - Display name
  - Avatar URL
  - Custom info

<aside class="notice">
This endpoint requires a `jwt` credential with `app` level scope.
</aside>

# Conversations

When the first message is sent to an app user or received from an app user, a conversation is automatically created for them. The conversation and messages for a given app user can be retrieved and created by way of the `/v1/appusers/` API.

## Get Messages

> Request:

```shell
curl https://api.smooch.io/v1/appUsers/c7f6e6d6c3a637261bd9656f/messages?before=1471995721 \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.getMessages('c7f6e6d6c3a637261bd9656f', {before: '1471995721'}).then((response) => {
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
    "unreadCount": 0
  },
  "messages": [{
    "_id": "55c8c1498590aa1900b9b9b1",
    "authorId": "c7f6e6d6c3a637261bd9656f",
    "role": "appUser",
    "name": "Steve",
    "text": "Just put some vinegar on it",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1439220041.586
  }],
  "next": "https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages?after=1471995721"
}
```

<api>`GET /v1/appusers/{smoochId|userId}/messages`</api>

Get the specified app user's conversation history with a limit of 100 messages, if it exists. If a conversation has not yet been created for the specified app user, 404 will be returned.

### Pagination

The API endpoint for retrieving messages of a conversation has a limit of a 100 messages. The `before` and `after` parameters will have to be specified to indicate which range of messages to return. These parameters are mutually exclusive. If neither is specified, then the most recent 100 messages will be returned.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `before`                 | Timestamp of message. The API will return 100 messages before the specified timestamp (excluding any messages with the provided timestamp).           |
| `after`                  | Timestamp of message. The API will return 100 messages after the specified timestamp (excluding any messages with the provided timestamp).            |

<aside class="notice">
The timestamp format should be in seconds using [Unix time](https://en.wikipedia.org/wiki/Unix_time). Note that you can specify milliseconds using a decimal number if needed.
</aside>

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

> Response:

```
200 OK
```

<api>`POST /v1/appusers/{appUserId|userId}/conversation/read`</api>

Reset the unread count of the conversation to 0. If the conversation has not yet been created for the specified app user 404 will be returned.

## Typing Activity
> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/conversation/activity \
     -X POST \
     -d '{"role":"appMaker", "type": "typing:start"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
// This endpoint is not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<api>`POST /v1/appusers/{appUserId|userId}/conversation/activity`</api>

Notify Smooch when an app maker starts or stops typing a response.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the actor. Must be `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of activity to trigger. Must be either `typing:start` or `typing:stop` |
| **name**<br/><span class='opt'>optional</span>      | The name of the app maker that starts or stops typing a response |
| **avatarUrl**<br/><span class='opt'>optional</span>      | The avatar URL of the app maker that starts typing a response |

<aside class="notice">
Typing activity is only supported on our Web Messenger, iOS SDK, Facebook Messenger and Telegram
</aside>

## Post Message

> Request (App User):

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appUser", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appUser',
    type: 'text'
}).then(() => {
    // async code
});
```

> Request (App Maker):

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    type: 'text',
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
    "type": "text",
    "name": "Steve",
    "text": "Just put some vinegar on it",
    "avatarUrl": "https://www.gravatar.com/image.jpg",
    "received": 1439220041.586
  },
  "conversation": {
    "_id": "df0ebe56cbeab98589b8bfa7",
    "unreadCount": 0
  }
}
```

<api>`POST /v1/appusers/{smoochId|userId}/messages`</api>

Post a message to or from the app user. If the app user does not yet have a conversation, one will be created automatically. Messages must have a `role` of either `appUser` or `appMaker`.

A message must also have a `type` specifying the type of message you're trying to send.
Depending on the type, the message object will have additional `Required` and `Optional` arguments.
See [`text`](#text-message), [`image`](#image-message), [`carousel`](#carousel-message), [`list`](#list-message).

Images can be posted by URL using this API via the `image` type. Alternatively, you may also upload images to the conversation directly using the [`/images`](#upload-image) endpoint.

<aside class="notice">
For messages originating from an app maker, a `jwt` credential with `app` level scope must be used.
</aside>

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **role**<br/><span class='req'>required</span>       | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |
| **type**<br/><span class='req'>required</span>       | The type of the message being posted. Can be [`text`](#text-message), [`image`](#image-message), [`carousel`](#carousel-message) or [`list`](#list-message).    |
| **name**<br/><span class='opt'>optional</span>       | The display name of the message author. Messages with role `appUser` will default to a friendly name based on the user's `givenName` and `surname`. Messages with role `appMaker` have no default name. |
| **email**<br/><span class='opt'>optional</span>      | The email address of the message author. This field is typically used to identify an app maker in order to render the avatar in the app user client. If the email of the Smooch account is used, the configured profile avatar will be used. Otherwise, any [gravatar](http://gravatar.com) matching the specified email will be used as the message avatar. |
| **avatarUrl**<br/><span class='opt'>optional</span>  | The URL of the desired message avatar image. This field will override any avatar chosen via the `email` parameter. |
| **metadata**<br/><span class='opt'>optional</span>   | Flat JSON object containing any custom properties associated with the message. If you are developing your own messaging client you can use this field to render custom message types. |
| **payload**<br/><span class='opt'>optional</span>    | The payload of a `reply` action, if applicable |

<aside class="notice">
Additional arguments are necessary based on message type ([`text`](#text-message), [`image`](#image-message), [`carousel`](#carousel-message), [`list`](#list-message))
</aside>

## Text Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "text",
    "text": "Hello!",
    "actions": [{
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'text',
    text: 'Hello!',
    actions: [{
        text: 'More info',
        type: 'link',
        uri: 'http://example.org'
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "text",
    "actions": [{
        "_id": "57966d22c19c9da00839a5ec",
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
  }
}
```
```js
201 CREATED
```

A `text` type message is a message that is sent with text and/or actions.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **text**<br/><span class='req'>required*</span>      | The text content of the message. Optional only if `actions` are provided. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons).  |

## Image Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "image",
    "text": "Hello!",
    "mediaUrl": "http://example.org/image.jpg",
    "actions": [{
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'image',
    text: 'Hello!',
    mediaUrl: 'http://example.org/image.jpg',
    actions: [{
        text: 'More info',
        type: 'link',
        uri: 'http://example.org'
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "image",
    "mediaUrl": "http://example.org/image.jpg",
    "mediaType": "image/jpeg",
    "actions": [{
        "_id": "57966d22c19c9da00839a5ec",
        "text": "More info",
        "type": "link",
        "uri": "http://example.org"
    }]
  }
}
```
```js
201 CREATED
```

An `image` type message is a message that is sent with an image, and, optionally, text and/or actions.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **text**<br/><span class='opt'>optional*</span>      | The text content of the message. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons). |
| **mediaUrl**<br/><span class='req'>required*</span>  | The image URL used for the image message. |
| **mediaType**<br/><span class='opt'>optional</span>  | The media type is defined here, for example `image/jpeg`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

## Carousel Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
{
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "title": "Tacos",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "actions": [{
            "text": "Select",
            "type": "postback",
            "payload": "TACOS"
        }, {
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }, {
        "title": "Ramen",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "actions": [{
            "text": "Select",
            "type": "postback",
            "payload": "RAMEN"
        }, {
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    role: 'appMaker',
    type: 'carousel',
    items: [{
        title: 'Tacos',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'TACOS'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }, {
        title: 'Ramen',
        description: 'Description',
        mediaUrl: 'http://example.org/image.jpg',
        actions: [{
            text: 'Select',
            type: 'postback',
            payload: 'RAMEN'
        }, {
            text: 'More info',
            type: 'link',
            uri: 'http://example.org'
        }]
    }]
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
    "_id": "57966d21c19c9da00839a5e9",
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "_id": "57966d21c19c9da00839a5ea",
        "title": "Tacos",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "_id": "57966d22c19c9da00839a5eb",
            "text": "Select",
            "type": "postback",
            "payload": "TACOS"
        }, {
            "_id": "57966d22c19c9da00839a5ec",
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }, {
        "_id": "57966d22c19c9da00839a5ed",
        "title": "Ramen",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "_id": "57966d31c19c9da00839a5ee",
            "text": "Select",
            "type": "postback",
            "payload": "RAMEN"
        }, {
            "_id": "57966d31c19c9da00839a5ef",
            "text": "More info",
            "type": "link",
            "uri": "http://example.org"
        }]
    }]
  }
}
```
```js
201 CREATED
```

Carousel messages are a horizontally scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support carousel messages; currently only Facebook Messenger, LINE and Telegram cover the full functionality. For all other platforms a carousel message is rendered as raw text. The raw text fallback does not include any images or postback action buttons.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **items**<br/><span class='req'>required*</span>     | Array of [message items](#message-items). The array is limited to 10 items. |

#### Channel Support

Smooch will deliver carousel messages to users across all messaging channels regardless of whether or not a given channel can natively render a carousel message UI. For channels that don't render carousels, a raw text representation is sent. In the future, the Smooch API will expand to support new messaging app carousel experiences as they become available. For current messaging channels, carousel messages will render in the following ways:

##### Facebook Messenger
Full support.
![messenger carousel](/images/carousel_messenger.png)

##### Telegram
Full support, with cards arranged vertically.
![telegram carousel](/images/carousel_telegram.png)

##### LINE
Full support.
<span class="half-width-img">![line carousel](/images/carousel_line.png)</span>

##### All Other Channels

> Sample Raw Text Format:

```
1. Tacos
Description
More info http://example.org

2. Ramen
Description
More info http://example.org
```

Text fallback.
![text fallback](/images/carousel_ios.png)

## List Message

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt' \
     -d '
     {
        "role":"appMaker",
        "type":"list",
        "items":[
           {
              "title":"Tacos",
              "description":"Beef and cheese... Mhm...",
              "size": "large",
              "mediaUrl":"https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
              "actions":[
                 {
                    "text":"Oh yeah!",
                    "type":"postback",
                    "payload":"TACOS"
                 }
              ]
           },
           {
              "title":"Burritos",
              "description":"Beefier and cheesier... Mhm...",
              "mediaUrl":"http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
              "actions":[
                 {
                    "text":"Burritooo!",
                    "type":"postback",
                    "payload":"BURRITOS"
                 },
                 {
                    "text":"Burritooo!",
                    "type":"link",
                    "uri":"http://burritos.com",
                    "default": true
                 }
              ]
           }
        ],
        "actions":[
           {
              "text":"More Choices!",
              "type":"postback",
              "payload":"MORE"
           }
        ]
     }'
```

```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
   role:"appMaker",
   type:"list",
   items:[
      {
         title:"Tacos",
         description:"Beef and cheese... Mhm...",
         size: "large",
         mediaUrl:"https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
         actions:[
            {
               text:"Oh yeah!",
               type:"postback",
               payload:"TACOS"
            }
         ]
      },
      {
         title:"Burritos",
         description:"Beefier and cheesier... Mhm...",
         mediaUrl:"http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
         actions:[
            {
               text:"Burritooo!",
               type:"postback",
               payload:"BURRITOS"
            },
            {
               text:"Burritooo!",
               type:"link",
               uri:"http://burritos.com",
               default: true
            }
         ]
      }
   ],
   actions:[
      {
         text:"More Choices!",
         type:"postback",
         payload:"MORE"
      }
   ]
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
    "type": "list",
    "role": "appMaker",
    "received": 1480021430.242,
    "text": "1. Tacos\nBeef and cheese... Mhm...\n\n\n2. Burritos\nBeefier and cheesier... Mhm...\nBurritooo!: http://burritos.com",
    "authorId": "7AJ4zpAVxEwKkjCZD2EYKk",
    "avatarUrl": "https://www.gravatar.com/avatar/5e543256c480ac577d30f76f9120eb74.png?s=200&d=mm",
    "_id": "583755b6be483684d148602b",
    "source": {
      "type": "api"
    },
    "items": [
      {
        "title": "Tacos",
        "description": "Beef and cheese... Mhm...",
        "size": "large",
        "mediaUrl": "https://www.tacojohns.com/globalassets/2016-tacos-menu/taco-bravo---436x420.jpg",
        "mediaType": "image/jpeg",
        "_id": "583755b6be483684d1486033",
        "actions": [
          {
            "text": "Oh yeah!",
            "payload": "TACOS",
            "_id": "583755b6be483684d1486034",
            "uri": "",
            "type": "postback"
          }
        ]
      },
      {
        "title": "Burritos",
        "description": "Beefier and cheesier... Mhm...",
        "mediaUrl": "http://www.tacobueno.com/media/1381/beefbob.png?quality=65",
        "mediaType": "image/png",
        "_id": "583755b6be483684d1486030",
        "actions": [
          {
            "text": "Burritooo!",
            "payload": "BURRITOS",
            "_id": "583755b6be483684d1486032",
            "uri": "",
            "type": "postback"
          },
          {
            "text": "Burritooo!",
            "default": true,
            "_id": "583755b6be483684d1486031",
            "uri": "http://burritos.com",
            "type": "link"
          }
        ]
      }
    ],
    "actions": [
      {
        "text": "More Choices!",
        "payload": "MORE",
        "_id": "583755b6be483684d1486035",
        "uri": "",
        "type": "postback"
      }
    ]
  },
  "conversation": {
    "unreadCount": 1,
    "_id": "94eb1cd68c3e072a5ea0e242"
  }
}
```

```js
201 CREATED
```

List messages are a vertically scrollable set of items that may each contain text, an image, and action buttons. Not all messaging channels fully support list messages; currently only Facebook Messenger has support. LINE and Telegram have a carousel fallback, and for all other platforms a list message is rendered as raw text. The raw text fallback does not include any images or postback action buttons.

| **Arguments**                |                       |
|------------------------------|-----------------------|
| **items**<br/><span class='req'>required*</span>     | Array of [message items](#message-items). The array is limited to 10 items. |
| **actions**<br/><span class='opt'>optional*</span>   | Array of [action buttons](#action-buttons).  |

<aside class="notice">
    In Messenger, list messages sent with multiple `actions` either in a `message item` or the `message` itself will be truncated, as only 1 action is supported.
</aside>

<span class="half-width-img">![messenger list](/images/list_messenger.png)</span>

## Message Items

Message items can be sent through the [post message API](#post-message) by including them in the message payload.

Only [carousel](#carousel-message) and [list](#list-message) messages currently support message items.

| **Arguments**                |                        |
|------------------------------|------------------------|
| **title**<br/><span class='req'>required</span>       | The title of the carousel item. |
| **actions**<br/><span class='req'>required</span>     | Array of [action buttons](#action-buttons). At least 1 is required, a maximum of 3 are allowed. `link` and `postback` and `share` actions are supported. |
| **description**<br/><span class='opt'>optional</span> | The text description, or subtitle. |
| **mediaUrl**<br/><span class='opt'>optional</span>    | The image URL to be shown in the carousel/list item. |
| **size**<br/><span class='opt'>optional</span>        | The size of the image to be shown in the carousel/list item (Only top item of Facebook Messenger carousel supportted). Choose from `compact` and `large` |
| **mediaType**<br/><span class='opt'>optional</span>   | If a `mediaUrl` was specified, the media type is defined here, for example `image/jpeg`. If `mediaType` is not specified, the media type will be resolved with the `mediaUrl`. |

## Action Buttons
Actions buttons can be sent through the [post message API](#post-message) by including them in the message payload.

There are 4 types of supported actions : **link**, **buy**, **postback**, and **reply**. Type must be specified by providing a `type` argument in the action object.

<aside class="notice">
    Action buttons can only be sent with an `appMaker` role.
</aside>

### Link
A link action will open the provided URI when tapped.

> Send link action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "link", "text": "Put vinegar", "uri": "http://example.com" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'link',
        text: 'Put vinegar',
        uri: 'http://example.com'
      }
    ]
}).then(() => {
    // async code
});
```

|        **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>     | The button text. |
| **type**<br/><span class='req'>required</span>     | `link` |
| **uri**<br/><span class='req'>required</span>      | The action URI. This is the link that will be used in the clients when clicking the button. |
| **default**<br/><span class='opt'>optional</span>  | Flag indicating the message action is the default for a [message item](#message-items) in Facebook Messenger. |
| **metadata**<br/><span class='opt'>optional</span> | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
    Action buttons sent to LINE must have `http` or `https` protocol or the message will not be delivered.
</aside>

### Buy
A buy action will prompt the user to purchase an item.

> Send buy action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "buy", "text": "Buy vinegar", "amount": 1000 }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'buy',
        text: 'Buy vinegar',
        amount: 8000
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `buy` |
| **amount**<br/><span class='req'>required</span>    | The amount being charged. It needs to be specified in cents and is an integer (9.99$ -> 999).|
| **currency**<br/><span class='opt'>optional</span>  | The currency of the amount being charged (USD, CAD, etc.). If not specified, it would use the default one set in your account. [See supported currencies](https://support.stripe.com/questions/which-currencies-does-stripe-support). |
| **metadata**<br/><span class='opt'>optional</span>  | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
The <a href="/javascript/#stripe">Stripe integration</a> must be configured and active in order to accept buy buttons.
</aside>

### Postback
A postback action will post the action payload to the server.

> Send postback action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Just put some vinegar on it", "role": "appMaker", "type": "text", "actions": [{"type": "postback", "text": "Send vinegar", "payload": "buy_vinegar" }]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Just put some vinegar on it',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'postback',
        text: 'Buy vinegar',
        payload: 'buy_vinegar'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `postback` |
| **payload**<br/><span class='req'>required</span>    | A string payload to help you identify the action context. You can also use metadata for more complex needs. |
| **metadata**<br/><span class='opt'>optional</span>  | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
See how to handle postback with <a href="#webhook-triggers">webhook triggers</a>.
</aside>

### Reply
A reply action will echo the user's choice as a message.<br/>
You may optionally specify an `iconUrl` which will render as an icon for each option.

> Send reply action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
     -d '
{
    "text":"Which do you prefer?",
    "role": "appMaker",
    "type": "text",
    "actions": [{
        "type": "reply",
        "text": "Tacos",
        "iconUrl": "http://example.org/taco.png"
        "payload": "TACOS"
    }, {
        "type": "reply",
        "text": "Burritos",
        "iconUrl": "http://example.org/burrito.png"
        "payload": "BURRITOS"
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Which do you prefer?',
    type: 'text',
    role: 'appMaker',
    actions: [
      {
        type: 'reply',
        text: 'Tacos',
        iconUrl: 'http://example.org/taco.png',
        payload: 'TACOS'
      }, {
        type: 'reply',
        text: 'Burritos',
        iconUrl: 'http://example.org/burrito.png',
        payload: 'BURRITOS'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `reply` |
| **payload**<br/><span class='req'>required</span>   | A string payload to help you identify the action context. Used when posting the reply. You can also use metadata for more complex needs. |
| **iconUrl**<br/><span class='opt'>optional</span>   | An icon to render next to the reply option (Facebook Messenger and Web Messenger only) |
| **metadata**<br/><span class='opt'>optional</span>  | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
`reply` type actions can be sent either alone or with [location request](#location-request) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

<aside class="notice">
Icons are currently only supported on Facebook Messenger and Web Messenger.
</aside>

**Facebook Messenger**
![Facebook Messenger reply icons](/images/fb_reply_icon.png)

**Web Messenger**
![Web Messenger reply icons](/images/web_reply_icon.png)

### Location Request
A location request action will prompt the user to share their location.

> Send locationRequest action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -d '{"text":"Where are you?", "role": "appMaker", "type": "text", "actions": [{"type": "locationRequest", "text": "Send Location"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Where are you?',
    role: 'appMaker',
    type: 'text',
    actions: [
      {
        type: 'locationRequest',
        text: 'Send Location'
      }
    ]
}).then(() => {
    // async code
});
```

|  **Arguments**         |                            |
|------------------------------|----------------------------|
| **text**<br/><span class='req'>required</span>      | The button text. |
| **type**<br/><span class='req'>required</span>      | `locationRequest`|
| **metadata**<br/><span class='opt'>optional</span> | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
`locationRequest` type actions can be sent either alone or with [reply](#reply) actions. If an action of a different type is included in the message, it will be rejected.
</aside>

<aside class="notice">
Location request actions are currently only supported on Messenger and Telegram. Other clients will receive text fallback: "YourApp has requested a location".
</aside>

### Share
Actions in a [message item](#message-items) may also include a share button.

> Send share action:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/messages \
     -X POST \
     -H 'content-type: application/json' \
     -H "authorization: Bearer your-jwt" \
     -d '
{
    "role": "appMaker",
    "type": "carousel",
    "items": [{
        "title": "Title",
        "description": "Description",
        "mediaUrl": "http://example.org/image.jpg",
        "mediaType": "image/jpeg",
        "actions": [{
            "type": "share"
        }]
    }]
}'
```
```js
smooch.appUsers.sendMessage('c7f6e6d6c3a637261bd9656f', {
    text: 'Title',
    role: 'appMaker',
    type: 'carousel',
    items: [{
      title: 'Title',
      actions: [{
        type: 'share'
      }]
    }]
}).then(() => {
    // async code
});
```

![messenger carousel](/images/facebook_share_button.png)

|  **Arguments**                |                  |
|------------------------------|----------------------------|
| **type**<br/><span class='req'>required</span>      | `share` |
| **metadata**<br/><span class='opt'>optional</span>  | Flat JSON object containing any custom properties associated with the action. |

<aside class="notice">
Share Buttons are currently only supported in Facebook Messenger carousels.
</aside>

## Upload Image

> Request:

```shell
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f/images \
     -X POST \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt' \
     -H 'content-type: multipart/form-data' \
     -F 'source=@screenshot.jpg;type=image/jpeg' \
     -F 'role=appUser' \
     -F 'name=Steve'
```
```js
// Frontend version
var file = fileInput.files[0];
smooch.appUsers.uploadImage('c7f6e6d6c3a637261bd9656f', file,
{
    text: 'Just put some vinegar on it',
    role: 'appUser'

}).then(() => {
    // async code
});

// Not yet supported on Node.
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
    "unreadCount": 0
  }
}
```

<api>`POST /v1/appusers/{smoochId|userId}/images`</api>

Upload an image and post it to the conversation. Images are uploaded using the `multipart/form-data` content type. Similar to the `/messages` endpoint, a `role` parameter must be specified. The `/images` endpoint accepts the same parameters as `/messages` but they are sent as form parameters as opposed to being encoded in JSON bodies. The uploaded image will render as part of the message thread in all supported app maker channels (email, Slack, HipChat, Zendesk, Helpscout).

| **Form Parameters**          |                            |
|------------------------------|----------------------------|
| **source**<br/><span class='req'>required</span>    | The image data.            |
| **role**<br/><span class='req'>required</span>      | The role of the individual posting the message. Can be either `appUser` or `appMaker`. |

# Persistent Menus

Smooch provides a /v1/menu/ API to set persistent menus on messaging channels that support custom menus in their chat UIs ([Facebook Messenger](http://docs.smooch.io/javascript/#facebook-messenger) and [WeChat](http://docs.smooch.io/javascript/#wechat)). Menus are configured on a per app basis (not per user).

## Get Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.get()
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "name": "My Awesome Menu",
        "items": [
            {
                "type": "link",
                "text": "Smooch",
                "uri": "http://smooch.io",
                "_id": "57b331fbf1c6aeba1f940dc7"
            },
            {
                "type": "postback",
                "text": "Hello",
                "payload": "HELLO",
                "_id": "57b331fbf1c6aeba1f940dc6"
            }
        ]
    }
}
```

<api>`GET /v1/menu`</api>

Get the specified app's menu.

## Update Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -X PUT \
     -d '{"items": [{"type": "link", "text": "Smooch", "uri": "http://smooch.io"}]}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.configure({
    name: 'My Awesome Menu',
    items: [{
        type: 'link',
        text: 'Smooch',
        uri: 'http://smooch.io'
    }]
})
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "name": "My Awesome Menu",
        "items": [{
            "type": "link",
            "text": "Smooch",
            "uri": "http://smooch.io",
            "_id": "57b331fbf1c6aeba1f940dc7"
        }]
    }
}
```

<api>`PUT /v1/menu`</api>

Configure the specified app's menu.

| **Arguments**               |   |
|-----------------------------|---|
| **items**<br/><span class='req'>required</span> | A list of menu items. See below. |
| **name**<br/><span class='opt'>optional</span> | An optional text to use as a menu name. If none is provided defaults to "Menu". Not all channels support a custom menu name (e.g. Facebook Messenger's menu name is fixed)|

### Menu Items

Menus contain 1 to 5 menu items.

| **Arguments**               |   |
|-----------------------------|---|
| **type**<br/><span class='req'>required</span> | Can either be [link](/javascript/#links) or [postback](/javascript/#postbacks), which correspond to Smooch's [link and postback actions](/javascript/#action-buttons) |
| **text**<br/><span class='opt'>required</span> | The button text of the menu item. |
| **uri**<br/><span class='opt'>optional</span> | A valid address, like http://smooch.io. Required for a "link" type item. |
| **postback**<br/><span class='opt'>optional</span> | A payload for a postback. Required for a "postback" type item.|

## Delete Menu

> Request:

```shell
curl https://api.smooch.io/v1/menu \
     -X DELETE \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-jwt'
```
```js
smooch.menu.remove()
.then(() => {
    // async code
});
```

> Response:

```
200 OK
```
```json
{
    "menu": {
        "items": []
    }
}
```

<api>`DELETE /v1/menu`</api>

Remove the specified app's menu.
