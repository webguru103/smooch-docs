---
title: Creating users
section: docs
layout: two-column
---

# Creating Users

User's are created in two different ways.

1. Automatically whenever a user sends their first message to a [Smooch app](#).
2. Via the [REST API](http://docs.smooch.io/rest/#pre-create-app-user).

## Automatically creating users

When a user is automatically created because they send their first message, all of their information is available in the [webhook payload](http://docs.smooch.io/rest/#webhooks-payload) their message triggers (and in all subsequent webhook payloads triggered by that user).

```javascript
"appUser": {
    "_id": "c7f6e6d6c3a637261bd9656f"
    ...
}
```
the canonical Smooch ID used to identify that user is available as the `_id` property of the `appUser` JSON property of the webhook payload.

## Creating users via the REST API

It's possible to create a user before they send a message. Check out the [API reference docs](http://docs.smooch.io/rest/#pre-create-app-user).

You might want to do this because
- you have access to the User's mobile number and want to initiate a conversation with them
- you want to pre-initialize a user of your Website or Mobile app so that you can set some properties on them or send them messages that are waiting for them when they first login
- finally, you might want to integrate your own over the top messaging channel

Note, that it isn't possible to pre-contact users over channels like Facebook Messenger, because social platforms only allow their users to initiate conversations with businesses, and not the other way around.

When you create a user, you need to specify a `userId` property. The `userId` is a canonical ID used to reference the user, and is interchangeable with the `_id` property that Smooch creates for each user.

Here's the minimum required call to create a user (see [the API reference](http://docs.smooch.io/rest/#pre-create-app-user) for more options):

```bash
curl https://api.smooch.io/v1/appusers \
     -X POST \
     -d '{"userId":"some-user-id"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-jwt'
```
