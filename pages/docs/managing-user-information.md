---
title: Managing user information
section: docs
layout: two-column
---

# Managing user information

Each time a user's actions trigger a webhook event, the [webhook payload](http://docs.smooch.io/rest/#webhooks-payload) contains information about that user, stored in the `appUser` property:

 ```javascript
"appUser": {
    "_id": "smooch-id",
    "userId": "some-user-id",
    "properties": {
        "your-custom-property": "some-value"
    },
    ...
}
 ```

The appUser can be extended to contain whatever custom properties you require under the `properties` property.

Custom properties can be added to a user:
1. via the [REST API](http://docs.smooch.io/rest/#update)
2. at initialization time with the mobile and Web SDKs

In addition to custom properties, there are a number of predefined properties such as `givenName`, `surname`, and `email` that can also be set via the SDKs, or REST API.

To add properties via the REST API call the PUT Update [endpoint](http://docs.smooch.io/rest/#update):

```bash
curl https://api.smooch.io/v1/appusers/c7f6e6d6c3a637261bd9656f \
     -X PUT \
     -d '{"givenName": "Hilda", "properties": {"your-custom-property": "some-value"}}' \
     -H 'content-type: application/json' \
     -H 'app-token: cr2g6jgxrahuh68n1o3e2fcnt'
```

Here, we add a property and name on init from the Web SDK:

```javascript
Smooch.init({
    appToken: "your_app_token",
    givenName: "Hilda",
    properties: {
        "your-custom-property": "some-value"
    }
});
```

The principle is the same across each of the client SDKs, see these links for SDK specific instructions:
- [Web](http://docs.smooch.io/javascript/#user-data)
- [Android](http://docs.smooch.io/android/#user-data)
- [iOS](http://docs.smooch.io/ios/#user-data)
