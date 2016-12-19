---
title: Authenticating to Smooch API
section: docs
layout: two-column
---

# Authenticating to Smooch API

Once you've obtained a relevant key and secret pair as described in the [JWT](/docs/jwt) documentation, you're ready to authenticate to the Smooch API and put it to use.

#### Using the Smooch Core Javascript Library

The easiest way to use the Smooch API is through the [Smooch Core Javascript Library](https://www.npmjs.com/package/smooch-core). This library conveniently wraps all of the Smooch API in a Javascript-friendly way, helping you get up and running rather quickly.

To authenticate to the API, you need only initialize the library like so:

```javascript
// Initializing Smooch Core with a jwt in Node.js
var smooch = new SmoochCore({
    keyId: 'your-key-id',
    secret: 'your-secret',
    scope: 'app', // app or appUser, if appUser, you must include a userId parameter
});
```

You can also initialize the library to perform operations at the account level (for [managed accounts](/docs/intro-to-managed-accounts/)) or at the individual user level. Read more about how to do this in the [javascript library documentation](https://github.com/smooch/smooch-core-js)

#### Using a HTTP Request Header

If you're calling the API directly, you'll need to craft a token from the key and secret pair as described in the [JWT documentation](/docs/jwt).

The JWT itself is transmitted via the HTTP authorization header. The token should be prefixed with “Bearer” followed by a space. For example: `Bearer your-jwt`.

```bash
# Calling GET /v1/appusers using a jwt
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -H 'authorization: Bearer your-jwt'
```

#### Next Steps

 * Learn how to [receive messages](/docs/receiving-messages) with the Smooch API.
 * Read about how to use the API to [manage user information](/docs/managing-user-information).
