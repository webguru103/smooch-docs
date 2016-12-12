---
title: Authenticating users
section: docs
layout: two-column
---

# Authenticating Users

When creating a user, it's possible to specify that API calls for that user require authentication by setting the `credentialRequired` property to `true`, like so:

```bash
curl https://api.smooch.io/v1/appusers \
     -X POST \
     -d '{"userId": "some-user-id", "credentialRequired": true}' \
     -H 'content-type: application/json' \
     -H 'authorization: Bearer your-app-scoped-jwt'
```

Now API calls for that user, as well as sign ins to the mobile and Web SDKs, need to be authorized either with app scoped token, or a user scoped token.

To generate a user scoped token and make an API call you need a secret key and key ID from your [Smooch settings](https://app.smooch.io/).

![Create a new secret key](/images/create_secret_key.png)

Use the secret key to generate an user scoped token. Here's an example in Node.js:

```javascript
const jwt = require('jsonwebtoken');
const KEY_ID = 'your-key-id';
const SECRET = 'your-secret-key';
const userId = 'some-user-id';

const token = jwt.sign({
    scope: 'appUser',
    userId: userId
}, SECRET, {
    headers: {
        alg: 'HS256',
        typ: 'JWT',
        kid: KEY_ID
    }
});

console.log(token);
```

Now you can make calls to the REST API for that user, and authenticate with the user scoped token.

```bash
curl https://api.smooch.io/v1/appusers/some-user-id \
     -H 'authorization: Bearer user-scoped-jwt-for-some-user-id'
```
