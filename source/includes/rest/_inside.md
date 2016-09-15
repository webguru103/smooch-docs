
# Introduction

The Messaging Inside API allows software vendors to provision and configure their own Smooch apps to make use of Smooch's front-end messaging channels and the Core REST API.

Apps that are provisioned in this way will be API only, the management dashboard won’t be available.

# Authentication

Software vendors will be issued an app maker scoped JSON Web Token that can be used to create and manage Smooch apps. For more information on how Smooch uses JWTs, [see here](#authentication).

## Acquiring your App Maker Scoped Token

To acquire the app maker scoped token, visit our [partner page](https://smooch.io/partners/) (no jerks allowed).

## Using the App Maker Scoped Token

Use the app maker scoped Token in the same way that you would use an app or appUser scoped JSON Web Token, by passing it as an Authorization header, with the token prefaced by the _Bearer_ keyword.

```shell
curl https://api.smooch.io/v1/apps \
    -H 'content-type: application/json' \
    -H 'authorization: Bearer your-appmaker-token'
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

Fetches individual apps.

## App Management API

All of the existing app management APIs such as /v1/appusers and /v1/webhooks will be accessible using an appMaker JWT, provided the app id is included in the front of the path.

For example, to create a webhook for an app

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/webhooks \
    -d '{"target": "http://example.com/callback"}' \
    -H 'authorization: Bearer your-appmaker-token'
```

<br/>
<br/>
<br/>

Or to fetch a conversation

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/appusers/c7f6e6d6c3a637261bd9656f/conversation \
    -H 'authorization: Bearer your-appmaker-token'
```

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

<api>POST /v1/apps/{appId}/keys</api>

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

This set of endpoints is used to configure and manage various front-end messaging channels. A JWT is required with either 'app' or 'appMaker' scope. The paths below assume that the call will be made using an 'appMaker' scoped JWT, and thus the /apps/:appId portion of the URL is required. If using an 'app' scope JWT, this path is implied, and may be omitted.

Some integrations require some additional setup. [See below](#) for more channel specific details.

The currently supported integration types are: Messenger, Line, Telegram and Twilio (SMS).

## Create Integration

<api>`POST /v1/apps/{appId}/integrations`</api>

The create integration API currently allows you to provision apps with four channels: _Messenger_, _Twilio_, _Telegram_, and _Line_. See the sections below for channel specific instructions.

## Create Integration: Messenger

Setting up Messenger to work with Smooch requires several steps, documented below.

To configure the Facebook Messenger integration you will need to collect information about your Facebook app and submit the app for approval

1. Take note of your Facebook app ID and secret (apps can be created at developer.facebook.com);
2. The Facebook app must have been submitted for approval with the "manage_pages" and "pages_messaging" permissions.

In order to integrate a Messenger app you must acquire a Page Access Token from your user. Once you have acquired a page access token from your user, call the Create Integration endpoint with your app secret and ID and the user’s page access token.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type. _messenger_, _line_, _telegram_, or _twilio_. |
| **pageAccessToken**<br/><span class='req'>Messenger only (required)</span> | A Facebook Page Access Token. |
| **appId**<br/><span class='req'>Messenger only (required)</span> | A Facebook App ID. |
| **appSecret**<br/><span class='req'>Messenger only (required)</span> | A Facebook App Secret. |

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{ "type": "messenger", "pageAccessToken": "your_access_token", "appId": "your_fb_app_id", "appSecret": "your_fb_app_secret"
}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

> Response:

```
201 CREATED
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

## Create Integration: Twilio

There is no setup required to be able to use the Twilio integration, just acquire the required information from the user and call the Create Integration endpoint.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type. _messenger_, _line_, _telegram_, or _twilio_. |
| **accountSid**<br/><span class='req'>Twilio only (required)</span> | Twilio Account SID. |
| **authToken**<br/><span class='req'>Twilio only (required)</span> | Twilio Auth Token. |
| **phoneNumberSid**<br/><span class='req'>Twilio only (required)</span> | SID for specific phone number. |

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "twilio", "accountSid": "ACa1b4c65ee0722712fab89867cb14eac7", "authToken": "160c024303f53049e1e060fd67ca6aefc", "phoneNumberSid": "PN0674df0ecee0c9819bca0ff0bc0a159e"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
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

## Create Integration: Telegram

There is no setup required to be able to use the Telegram integration, just acquire the required information from the user and call the "Create Integration" API.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type. _messenger_, _line_, _telegram_, or _twilio_. |
| **token**<br/><span class='req'>Telegram only (required)</span> | Telegram Bot Token. |

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "telegram", "token": "192033615:AAEuee2FS2JYKWfDlTulfygjaIGJi4s"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
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

## Create Integration: Line

There is no one-time setup required to be able to use the LINE integration. However, each of your users will need to manually configure a webhook in their LINE configuration page that will point to Smooch servers. You must instruct your users how to configure this manually on their LINE bot page. For more information on how to configure this, see the entry "Callback URL" on the LINE integration page on app.smooch.io. The URL that users must use includes the Smooch app id, and should look like the following: "https://app.smooch.io:443/api/line/webhooks/<appId>"
Then, call the "Create Integration" API with the required information acquired from the user.

| **Arguments**             |   |
|---------------------------|---|
| **type**<br/><span class='req'>required</span> | The integration type. _messenger_, _line_, _telegram_, or _twilio_. |
| **channelId**<br/><span class='req'>Line only (required)</span> | Line Channel ID. |
| **channelSecret**<br/><span class='req'>Line only (required)</span> | Line Channel Secret. |
| **mid**<br/><span class='req'>Line only (required)</span> | Authorized user ID |

> Request:

```shell
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
     -X POST \
     -d '{"type": "line", "channelId": "1462776483", "channelSecret": "04ee6a24c099d8e4e35f7f4d20", "mid": "uf0c0bc1813d372ac5af4c5b5faee9923"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-appmaker-token'
```

> Response:

```
201 CREATED
```
```json
{
    "integration": {
      "mid": "uf0c0bc1813d372ac5af4c5b5faee9923",
      "channelId": "1462776483",
      "_id": "5735ddfd48011972d621dc0a",
      "botName": "Mike Bot",
      "type": "line"
    }
}
```

<api>`POST /v1/apps/{appId}/integrations`</api>

Creates a new app. The response body will include the appToken, which can be used to initialize the Web, iOS and Android clients and make calls to the app user facing API.

## List Integrations

> Request:

```shell
  curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/integrations \
       -H 'authorization: Bearer your-appmaker-token'
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

> Response:

```
200 OK
```
```json
{}
```

<api>`DELETE /v1/apps/{appId}/integrations/{integrationId}`</api>

Removes the specified integration.
