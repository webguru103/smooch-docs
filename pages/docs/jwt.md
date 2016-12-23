---
title: JSON Web Tokens (JWT)
section: docs
layout: two-column
---

# JSON Web Tokens (JWTs)

JSON Web Tokens (JWTs) are an industry standard authentication mechanism. A great introduction to the technology is available [here](https://jwt.io/introduction/), and a broad set of supported JWT libraries for a variety of languages and platforms is available.

A JWT is composed of a header, a payload, and a signature. The payload contains information called claims which describe the subject to whom the token was issued.

Before you can make calls to the Smooch API, you'll need to create a JWT that proves you have the authority to use the API.

 #### **Step 1** Generate a KEY ID and SECRET on the settings tab in the Smooch Dashboard.

![secret key and id](/images/secret_keys.png)

 #### **Step 2** Use the library available for your platform to create the JWT

We've included code samples for a few popular programming languages below. You can find libraries for more platforms [here](https://jwt.io/#libraries-io).

**NodeJS**:

Using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) NPM module:

```javascript
var jwt = require('jsonwebtoken');
var token = jwt.sign({scope: 'app'}, SECRET, {header: {kid: KEY_ID}});
```

**Ruby**:

Using the [ruby-jwt](https://github.com/jwt/ruby-jwt) gem:

```ruby
require 'jwt'

payload = {:scope => 'app'}
jwtHeader = {:kid => KEY_ID}

token = JWT.encode payload, SECRET, 'HS256', jwtHeader
```

**Python**:

Using the [pyjwt](https://github.com/jpadilla/pyjwt/) module:

```python
import jwt
token = jwt.encode({'scope': 'app'}, SECRET, algorithm='HS256', headers={'kid': KEY_ID})
```

#### **Step 3** Start using the Smooch API

The next section in this guide explains how to use the JWT to [authenticate to the Smooch API](/docs/authenticating-to-smooch-api/) and start performing operations using the platform.
