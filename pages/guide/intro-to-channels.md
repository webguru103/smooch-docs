---
title: Introduction to Channels
section: guide
layout: two-column
---

# What is a channel?

A channel is a user facing messenger from which end-users can send messages to Smooch apps.

Smooch integrations can be divided roughly into:
* Over-the-top (OTT) messaging apps (for example: Facebook Messenger or Viber).
* SMS (through integrations with third parties like Twilio).
* Pre-skinned messaging SDKs (for Web, Android, and iOS).

SMS and OTT channels are connected to a Smooch app through an integration step, when the app maker passing credentials for their account on the messaging service to Smooch. This integration step can be done programmatically via the [REST API](/guide/configuring-messaging-channels/), or manually with the [dashboard UI](https://app.smooch.io/integrations/categories/customer-channels).

The Web, Android, and iOS SDKs can be integrated simply by initializing the SDK with the appToken for a Smooch app.

## Channel Features

Each messaging service has a unique set of features. Smooch doesn't just unify all of these channels into a single API, we also act as an adaptor for these unique feature sets.

This means that you can respond to a user with a structured message like a carousel without consideration for the features of that channel. If the user is on Facebook, Telegram, or any other channel that supports carousels, the message will appear to the user as a carousel, but on a channel like SMS the carousel will fall back gracefully to a series of SMS messages.

By unifying the APIs and feature sets of all the channels we offer, we make it possible to integrate once with Smooch, and gain access to all of our existing and future channels without ever changing your agent's workflow, or deploying new code as a business that offers messaging channels as part of your product.

## Next steps
* For a broad overview of feature support across channels, see the [channel capabilities grid](/guide/channel-capabilities/).
* For details on each of the individual channels, see the channels section of the documentation in the sidebar.
* To integrate a channel into your app as a business visit the [marketplace](https://app.smooch.io/integrations/categories/customer-channels).
* To integrate a channel via the REST API, see the [guide](/guide/configuring-messaging-channels/) for configuring messaging channels using the managed accounts API.
