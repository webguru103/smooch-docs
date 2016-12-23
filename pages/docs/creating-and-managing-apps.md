---
title: Creating and Managing apps
section: docs
layout: two-column
---

# Creating and Managing apps

Smooch apps act as interfaces for individual business to communicate over messaging channels like Facebook Messenger, SMS and the Smooch Web Messenger. A single Smooch app aggregates communication with users over any number of channels and delivers messages to and from those users via the REST API and webhooks.

You don't have to manage your Smooch apps through the dashboard UI. Smooch offers a series of [account management endpoints](https://docs.smooch.io/rest/#managed-accounts) that can be used to create apps, configure their webhooks and provision them with channels.

The rest of this page will lead you through the process of setting up an app using the managed account API.

## Authentication

To get started with the account management API you'll need to generate a Managed Account Secret Key and use it authorize your calls to the API.
- Generate the secret key from your Smooch [account page](https://app.smooch.io/account).
- See the [authorization docs](/docs/authorization/).
- See the [API reference](https://docs.smooch.io/rest/#managed-accounts) for managed accounts.

## Creating an app

Create an app by calling the [create app endpoint](https://docs.smooch.io/rest/#create-app) using an account scoped JSON Web Token, and passing the public facing name of the app as JSON data.

The response to the create app request will contain an app ID (`_id`) property and an `appToken` property.

You can use the appToken to init Web and Mobile SDKs.

## Configuring webhooks

To call the [create webhook endpoint](https://docs.smooch.io/rest/#create-webhook) with an account scoped JWT, simply specify /apps/[APP ID] as a resource like so `https://api.smooch.io/v1/apps/[APP ID]/webhooks`.

Any app scoped endpoint can be called with an account scoped token, by specifying the app. [See here](https://docs.smooch.io/rest/#using-the-account-scoped-token) for more information.

Once you make a POST request to `https://api.smooch.io/v1/apps/[APP ID]/webhooks` specifying an `message:appUser` trigger, all user messages captured by the app will trigger a callback to the specified endpoint on your server.

## Generating an app scoped JSON Web Token (JWT)

Using the `_id` for the app generated above, you can now generate an app scoped secret key by calling the [create key endpoint](https://docs.smooch.io/rest/#create-key).

Using the ID of the secret key from the create key request, and the app ID, call the [Get JWT endpoint](https://docs.smooch.io/rest/#get-jwt) with a GET request to `https://api.smooch.io/v1/apps/[APP ID]/keys/[KEY ID]/jwt`.

The JWT returned from this request can now be used to [send messages to users](https://docs.smooch.io/rest/#post-message), and make other API calls.

## Integrating messaging channels

Now that you have prepared your app, the next step is to add messaging channels. See the [Configuring Messaging Channels guide](/docs/configuring-messaging-channels/).
