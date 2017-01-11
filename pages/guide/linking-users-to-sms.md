---
title: Linking Users to SMS
section: guide
layout: two-column
---

# Linking Users to SMS

Smooch provides a REST API [endpoint](https://docs.smooch.io/rest/#link-app-user-to-channel) for linking user's to SMS. Here are a couple ways you might want to use this API:
- If you have a user's mobile number, you might want to initiate contact with them by SMS
- If you're able to identify an existing user's mobile number, you might want to add SMS as an alternate channel

Below, we'll provide a recipe for creating a user, and initiating contact with them over SMS.

## Generate an app scoped token
Before we can call the REST API we will need an app scoped token. If you're not sure how to do that yet, check out the authorization section of the [API Quickstart](/guide/api-quickstart/#authorization).

## Create a user
We need to create a user that we can link to SMS. Use the app scoped token you created above to call the POST Pre-Create App User [endpoint](https://docs.smooch.io/rest/#track-event). See [here](/guide/creating-users/), for more information on creating users.

## Link the user to SMS
Take note of the `UserId` used to create the user, or the `_id` that was automatically generated for the user. Now call the Link App User To Channel [endpoint](https://docs.smooch.io/rest/#link-app-user-to-channel), like so:

```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/channels \
     -X POST \
     -d '{"type": "twilio", "phoneNumber": "+15145555555"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```

## Send a message to the user
Now that the user has been created and linked to SMS, any messages you send to that user via the POST Message [endpoint](http://docs.smooch.io/rest/#post-message) will be delivered to them by SMS.

```bash
curl https://api.smooch.io/v1/appusers/{{userID-for-created-user}}/messages \
     -X POST \
     -d '{"text":"A message over SMS, as requested.", "role": "appMaker", "type": "text"}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-token'
```
