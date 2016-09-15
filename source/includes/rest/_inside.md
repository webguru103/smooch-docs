
# Introduction

The Messaging Inside API allows software vendors to provision and configure their own Smooch apps to make use of Smooch's front-end messaging channels and the Core REST API.

Apps that are provisioned in this way will be API only, the management dashboard won’t be available.

# Authentication

Software vendors will be issued an app maker scoped JSON Web Token that can be used to create and manage Smooch apps. For more information on how Smooch uses JWTs, [see here](#authentication).

## Acquiring your App Maker Scoped Token

To acquire the app maker scoped token, create a Smooch account and walk through the initial setup process. At the end of that process you'll be able to contact us by chat and talk to us about getting your token.

## Using the App Maker Scoped Token

Use the app maker scoped Token in the same way that you would use an app or appUser scoped JSON Web Token, by passing it as an Authorization header, with the token prefaced by the _Bearer_ keyword.

```
curl https://api.smooch.io/v1/apps \
    -H 'content-type: application/json' \
    -H 'authorization: Bearer your-appmaker-token'
```


# Apps

Endpoints used for provisioning Smooch apps.

## Create App

> Request:

```
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

```
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

| **Query Params**          |   |
|---------------------------|---|
| **limit**<br/> | /v1/apps?limit=100 |
| **offset**<br/> | /v1/apps?offset=25&limit=25 |

## Get App

> Request:

```
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

```
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/webhooks \
    -d '{"target": "http://example.com/callback"}' \
    -H 'authorization: Bearer your-appmaker-token'
```

<br/>
<br/>
<br/>

Or to fetch a conversation

```
curl https://api.smooch.io/v1/apps/55c8d9758590aa1900b9b9f6/appusers/c7f6e6d6c3a637261bd9656f/conversation \
    -H 'authorization: Bearer your-appmaker-token'
```

# App Keys

This set of endpoints is used to provision and revoke secret keys for a Smooch app. A JWT with scope 'appMaker' is required to access the secret keys API.

## Create Key

> Request:

```
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

```
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

```
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

```
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

```
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

## List Integrations

## Get Integration

## Delete Integration

# Integration Specific Setup

## Messenger

## Line

## Telegram

## Twilio
