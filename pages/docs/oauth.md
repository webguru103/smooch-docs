---
title: OAuth
section: docs
layout: two-column
---

# OAuth

If you're building an integration with Smooch, and want to be able to send or receive messages on behalf of a Smooch app owner, you need some way to gain access to their app.

Rather then asking the app owner to provide you with a secret key and key ID pair for the app, you can use [OAuth](https://oauth.net/2/) to allow the app owner to authorize you to make API calls to their Smooch app.

Below, we'll lead you through the process of implementing an OAuth flow with Smooch, so that Smooch app owners can authorize you to make API calls on behalf of their app.

## Becoming a partner

You'll need to become a partner in order to implement OAuth with Smooch. See [this guide](becoming-an-integration-partner/) for more information on becoming a partner.

Once you become a partner you'll be provided with a client ID and secret. You'll also need to provide Smooch with a redirect URL that Smooch can redirect the app owner to once they authorize your integration.

## Initiating the OAuth flow

You can provide the app owner with a button to kick off the OAuth flow. The button should point at `https://app.smooch.io/oauth/authorize?[CLIENT ID]=&response_type=code`. CLIENT ID being the ID that Smooch provided you with during your partnership application. For more options and details see the [API reference](http://docs.smooch.io/rest/#authorize).

The user will now be directed to a Smooch UI where they can login and authorize the OAuth connection.

## Redirect and acquiring an OAuth token

Once the user authorizes your integration they will be redirected to the redirect URL you provided to Smooch. Included in that redirect is a URL parameter called `code` which contains an authorization code you can exchange for an OAuthToken.

you can now call the [Smooch token endpoint](http://docs.smooch.io/rest/#token) with the code you received from the redirect and the client ID and secret you received when you applied for partnership.

The access token you receive as a response can now be used like an app scoped token to send and receive messages, manage users and create Webhooks.

## More information

- See the complete [API reference](http://docs.smooch.io/rest/#smooch-connect) on Smooch Connect.
- See an [example](https://shoplifter.herokuapp.com/) of a Smooch integration in action, and read [the source code](https://github.com/smooch/shoplifter).
- See [this link](https://oauth.net/getting-started/) for more information on using OAuth 2.0.
