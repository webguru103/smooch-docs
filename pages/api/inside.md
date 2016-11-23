---
title: Smooch Inside
layout: three-column
section: api
---

# Introduction

The Messaging Inside API allows software vendors to offer rich, engaging multi-channel communications as a feature inside their software without the technical overhead of maintaining multiple APIs.

Apps that are created this way will be available via the API only, they won't be available in the Smooch dashboard.

# Authentication

Software vendors will be issued a special JWT access token with appMaker scope. The Inside API endpoints defined in this section can only be accessed with appMaker scope.

### Acquiring your App Maker Scoped Token

To acquire the app maker scoped token, visit our [partner page](https://smooch.io/partners/).

### Using the App Maker Scoped Token

Use the appMaker scoped Token in the same way that you would use an app or appUser scoped JSON Web Token, by passing it as an Authorization header, with the token prefaced by the _Bearer_ keyword.

All of the existing app management APIs such as /v1/appusers and /v1/webhooks will be accessible using an appMaker JWT, provided the app id is included in the front of the path.

> Create a webhook:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/webhooks \
    -d '{"target": "http://example.com/callback"}' \
    -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Fetch a conversation:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/appusers/c7f6e6d6c3a637261bd9656f/conversation \
    -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

# Apps

Endpoints used for provisioning Smooch apps.

## Create App

> Request:

```shell
curl https://api.smooch.io/v1/apps \
     -X POST \
     -d '{"name": "My App"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
  "app": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
    "name": "My App"
  }
}
```

<api>`POST /v1/apps`</api>

Creates a new app. The response body will include the appToken, which can be used to initialize the Web, iOS and Android clients and make calls to the app user facing API.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | The User facing name of the app. |

## List Apps

> Request:

```shell
  curl https://api.smooch.io/v1/apps \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```

```json
{
  "apps": [
        {
          "_id": "55c8d9758590aa1900b9b9f6",
          "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
          "name": "My App"
        }
    ],
    "hasMore": false,
    "offset": 0
}
```

<api>`GET /v1/apps`</api>

Lists all apps configured. This API is paginated. It returns a max of 25 apps by default, and accepts offset and limit query parameters. The max limit is 100.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `limit`                  | Integer, the number of records to return (maximum 100, default 25). |
| `offset`                 | Integer, the number of initial records to skip before picking records to return. |

## Get App

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "app": {
    "_id": "55c8d9758590aa1900b9b9f6",
    "appToken": "3s58wwlgx8xqbidgyyvzunoyw",
    "name": "My App"
  }
}
```

<api>`GET /v1/apps/{appId}`</api>

Fetches an individual app.

## Delete App

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6 \
       -X DELETE \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}`</api>

Removes the specified app, including all its enabled integrations.

# App Keys

This set of endpoints is used to provision and revoke secret keys for a Smooch app. A JWT with scope 'appMaker' is required to access the secret keys API.

## Create Key

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys \
     -X POST \
     -d '{"name": "key1"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
  "key": {
    "secret": "Y4SINFtAUzEjayxgUjJZoTjG",
    "name": "key1",
    "_id": "app_5735dcf248011972d621dc01"
  }
}
```

<api>`POST /v1/apps/{appId}/keys`</api>

Creates a secret key for the specified app. The response body will include a secret as well it's corresponding id, which you can use to generate JSON Web Tokens to securely make API calls on behalf of the app.

| **Arguments**             |   |
|---------------------------|---|
| **name**<br/><span class='req'>required</span> | A friendly identifier for the secret key. |

## List keys

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "keys": [
    {
      "secret": "5XJ85yjUtRcaQu_pDINblPZb",
      "name": "key1",
      "_id": "app_5723a347f82ba0516cb4ea34"
    },
    {
      "secret": "sTE74doRFsxtiwyT9JGCBQ6H",
      "name": "key2",
      "_id": "app_5723a347f82ba0516cb4ea35"
    }
  ]
}
```

<api>`GET /v1/apps/{appId}/keys`</api>

Lists all secret keys for a given app.

## Get Key

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34 \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "key": {
    "secret": "5XJ85yjUtRcaQu_pDINblPZb",
    "name": "key1",
    "_id": "app_5723a347f82ba0516cb4ea34"
  }
}
```

<api>`GET /v1/apps/{appId}/keys/{keyId}`</api>

Returns a secret key.

## Delete Key

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34 \
       -X DELETE \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/keys/{keyId}`</api>

Removes a secret key.

## Get JWT

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/keys/app_5723a347f82ba0516cb4ea34/jwt \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
    "jwt": "eyJraWQiOiJhcHBfNTczNDE0NjQwN2E2OWI2MTAwNzQiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImFwcCJ9.aDkuZKRXzI3I3XRDtnqbrxIsQQuA7kMrV4r7KcwmeHc"
}
```

<api>`GET /v1/apps/{appId}/keys/{keyId}/jwt`</api>

Returns an app-scoped JWT signed using the requested keyId/secret pair.

# Integrations

This set of endpoints is used to configure and manage various front-end messaging channels. A JWT is required with `appMaker` scope. The paths below assume that the call will be made using an 'appMaker' scoped JWT.

The currently supported integration types are: Facebook Messenger, LINE, Telegram, Twilio SMS, WeChat, and Email.

## Create Integration

<api>`POST /v1/apps/{appId}/integrations`</api>

The Create Integration endpoint currently allows you to provision apps with front-end messaging channels. See the sections below for channel specific instructions.

## Facebook Messenger

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{ "type": "messenger", "pageAccessToken": "your_access_token", "appId": "your_fb_app_id", "appSecret": "your_fb_app_secret"
}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
        "type": "messenger",
        "pageAccessToken": "your_access_token",
        "appId": "your_fb_app_id",
        "appSecret": "your_fb_app_secret"
    }
}
```

Facebook Messenger Setup steps:

1. Take note of your Facebook app ID and secret (apps can be created at [developer.facebook.com](https://developer.facebook.com));
2. The Facebook app must have been submitted to Facebook for approval with the "manage_pages" and "pages_messaging" permissions.

In order to integrate a Facebook Messenger app you must acquire a Page Access Token from your user. Once you have acquired a page access token from your user, call the Create Integration endpoint with your app secret and ID and the user’s page access token.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _messenger_. |
| **pageAccessToken**<br/><span class='req'>required</span> | A Facebook Page Access Token. |
| **appId**<br/><span class='req'>required</span> | A Facebook App ID. |
| **appSecret**<br/><span class='req'>required</span> | A Facebook App Secret. |

## Twilio

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "twilio", "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7", "authToken": "160c024303f53049e1e060fd67ca6aefc", "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
      "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e",
      "phoneNumber": "+15146125236",
      "name": "Mike's Account",
      "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7",
      "_id": "5735ddf948011972d621dc08",
      "type": "twilio"
    }
}
```

To configure a Twilio integration, acquire the required information from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _twilio_. |
| **accountSid**<br/><span class='req'>required</span> | Twilio Account SID. |
| **authToken**<br/><span class='req'>required</span> | Twilio Auth Token. |
| **phoneNumberSid**<br/><span class='req'>required</span> | SID for specific phone number. |

## Telegram

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "telegram", "token": "192033615:AAEuee2FS2JYKWfDlTulfygjaIGJi4s"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
      "_id": "5735ddfb48011972d621dc09",
      "username": "mikes_smooch_bot",
      "type": "telegram"
    }
}
```

To configure a Telegram integration, acquire the required information from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _telegram_. |
| **token**<br/><span class='req'>required</span> | Telegram Bot Token. |

## LINE

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "line", "channelAccessToken": "jZak8gGEYxfy1gIxk869osf2SuT6o11rtLqZQnAx9TiKE7eFXwgnnL58dtwOd1ON9e11GPTDfq+b4hson3dvvYAnAaAnbXYjj1rCUIzgxAa4xVZwGqyS+2rzpswZnGhAuMBWQxCMsF9dwztolUr01wdB04t89/1O/w1cDnyilFU=", "channelSecret": "b85cff984b26eac4297917abd365c4d6"' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
      "_id": "5735ddfd48011972d621dc0a",
      "botName": "Mike Bot",
      "type": "line"
    }
}
```

For LINE, each of your customers will need to manually configure a webhook in their LINE configuration page that will point to Smooch servers. You must instruct your customers how to configure this manually on their LINE bot page.

Your customers must set the Callback URL field in their [LINE Business Center page](https://business.line.me/en/).

The URL should look like the following: `https://app.smooch.io:443/api/line/webhooks/{appId}`.

Once you've acquired all the required information and the callback url has been configured, call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _line_. |
| **channelAccessToken**<br/><span class='req'>required</span> | LINE Channel Access Token. |
| **channelSecret**<br/><span class='req'>required</span> | LINE Channel Secret. |

## Viber

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "viber", "token": "df5f8c5233399561-92636b0c5ba30da9-16d4928fc004a72d"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
        "type": "viber",
        "_id": "5818fa177682fcb51368635d",
        "uri": "MikesBusiness"
    }
}

```
To configure a Viber integration, acquire the Viber Public Account token from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _viber_. |
| **token**<br/><span class='req'>required</span> | Viber Public Account token. |

## WeChat

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "wechat", "appId": "ACa1b4c65ee0722712fab89867cb14eac7", "appSecret": "160c024303f53049e1e060fd67ca6aefc"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
        "_id": "5735ddfd48011972d621dc0a",
        "type": "wechat",
        "appId": "c69175d6d125b772b",
        "webhookSecret": "3889794ab2fd4a70940a97c4b4a6372e"
    }
}
```

To configure a WeChat integration, acquire the WeChat app ID and app secret from the customer and call the Create Integration endpoint.

In their [WeChat dashboard](https://mp.weixin.qq.com/), the customer must set the "URL" field to `https://app.smooch.io/api/wechat/webhooks/{smoochAppId}`, and set the "Token" field to the value of the webhookSecret found in the response to the call to the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _wechat_. |
| **appId**<br/><span class='req'>required</span> | WeChat App ID. |
| **appSecret**<br/><span class='req'>required</span> | WeChat App Secret. |
| **encodingAesKey**<br/><span class='opt'>optional</span> | AES Encoding Key. |

## Email

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "frontendEmail"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
        "_id": "5735ddfd48011972d621dc0a",
        "type": "frontendEmail",
        "shortId": "tki1106",
        "smoochAddress": "app.tki1106@mail.smooch.io"
    }
}
```

To configure an Email integration, simply call the Create Integration endpoint with the type argument _frontendEmail_.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type: _frontendEmail_. |
| **fromAddress**<br/><span class='opt'>optional</span> | Email will display as coming from this address. |

## List Integrations

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "integrations": [
    {
      "_id": "5735dded48011972d621dc02",
      "type": "messenger",
      "userId": "140537932994988",
      "username": "Mike Spensieri",
      "pageId": "841556169307233"
    },
    {
      "_id": "5735ddf948011972d621dc08",
      "type": "twilio",
      "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e",
      "phoneNumber": "+15146125236",
      "name": "Mike's Account",
      "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7"
    },
    {
      "_id": "5735ddfb48011972d621dc09",
      "type": "telegram",
      "username": "mikes_smooch_bot"
    },
    {
      "_id": "5735ddfd48011972d621dc0a",
      "type": "line",
      "mid": "uf0c0bc1813d372ac5af4c5b5faee9923",
      "channelId": "1462776483",
      "botName": "Mike Bot"
    }
  ]
}

```

<api>`GET /v1/apps/{appId}/integrations`</api>

Lists all integrations for a given app.

| Parameter                | Description              |
|--------------------------|--------------------------|
| `type`                  | String, the list can be filtered to return only integrations of a specific type. Possible values are _messenger_, _line_, _telegram_, and _twilio_. More than one value can be specified through comma separation e.g. `?types=twilio,line` |

## Get Integration

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02 \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{
  "integration": {
    "_id": "5735dded48011972d621dc02",
    "userId": "140537932994989",
    "username": "Mike Spensieri",
    "pageId": "841556169307232",
    "type": "messenger"
  }
}

```

<api>`GET /v1/apps/{appId}/integrations/{integrationId}`</api>

Return the specified integration.

## Delete Integration

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations/5735dded48011972d621dc02 \
       -X DELETE \
       -H 'authorization: Bearer your-appmaker-token'
```

```javascript
// These endpoints are not currently wrapped in a JavaScript lib
```

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/integrations/{integrationId}`</api>

Removes the specified integration.
