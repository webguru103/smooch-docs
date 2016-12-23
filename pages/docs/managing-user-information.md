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

The app user can be extended to contain whatever custom properties you require under the `properties` property.

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

## Adding properties using the SDKs

Here, we add a property and name on init from the Web SDK:


Web SDK:
```javascript
Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Doctor',
    surname: 'Who?',
    email: 'the-doctor@smooch.io',
    properties: {
        'customProp': 'whatever you please'
    }
});
```

All user properties are optional, so the object you pass into `init` could also look as simple as:


Web SDK:
```javascript
{appToken: "your_app_token", givenName: "Trogdor"}
```

### iOS

The `addProperties:` method accepts an `NSDictionary` containing the properties to add. This dictionary must have keys that are `NSString` and values that are either `NSString`, `NSNumber` or `NSDate`. If your dictionary contains any other data type as a value, then `description` will be called on the object and the resulting NSString will be added as a property.

### Android

You can grab the current user with `User.getCurrentUser` then set basic information with `setFirstName`, `setLastName`, `setEmail` and `setSignedUpAt`. You can also set your own custom properties by sending a map into `addProperties`.

### Naming the current user

Once you set the user's name it will be persisted by Smooch so any future message from this user contain the value you provided. If the user's information changes, simply call the method a second time and the new information will overwrite it.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].firstName = @"Doctor";
[SKTUser currentUser].lastName = @"Who";
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().firstName = "Doctor"
SKTUser.currentUser().lastName = "Who"
```
```java
import io.smooch.core.User;

User.getCurrentUser().setFirstName("Artour");
User.getCurrentUser().setLastName("Babaev");
```

Web SDK:
```javascript
Smooch.updateUser({
    givenName: 'Doctor',
    surname: 'Who'
})
```

### Setting the user email address

Setting the user's e-mail makes this information available in the user profile and allows Smooch to lets you see their gravatar.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].email = @"bob@example.com";
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().email = "bob@example.com"
```
```java
import io.smooch.core.User;

User.getCurrentUser().setEmail("2ez@4rtz.com");
```

Web SDK:
```javascript
Smooch.updateUser({
    email: 'the-doctor@smooch.io'
})
```

Setting or updating the user email will send a notification inside your configured business system. Here's how it looks in Slack for example :

![Email updated in Slack](/images/email_updated.png)

### Setting the signed up date

Setting the user's signed up date allows Whispers based on that date to be sent to the right people. If not set, we'll default to the first time Smooch sees the user, which is the moment the `init` call is made for the first time for a given user. It's best to set it yourself to avoid sending a welcome message to users that in fact signed up a long while ago.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].signedUpAt = [NSDate date];
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().signedUpAt = NSDate()
```
```java
import io.smooch.core.User;

User.getCurrentUser().setSignedUpAt(new Date(1420070400000l));
```

Web SDK:
```javascript
Smooch.updateUser({
    signedUpAt: new Date("Nov 6, 2013")
})
```

### Adding custom profile information

You can also specify any other kind of profile information that will be sent along when users contact you. You can also use any properties you store using this API to send targeted messages to your users proactively using our Whispers feature.


Objective-C:
```objective_c
#import <Smooch/Smooch.h>

[[SKTUser currentUser] addProperties:@{ @"nickname" : @"Lil Big Daddy Slim", @"weight" : @650, @"premiumUser" : @YES }];
```

Swift:
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().addProperties([ "nickname" : "Lil Big Daddy Slim", "weight" : 650, "premiumUser" : true ])
```
```java
import io.smooch.core.User;

final Map<String, Object> customProperties = new HashMap<>();
customProperties.put("customDate", new Date());
customProperties.put("customFlag", true);
customProperties.put("customDigit", 322);
User.getCurrentUser().addProperties(customProperties);
```

<aside class="notice">
You need to make sure the SDK is properly initialized before attempting to update a user information.
</aside>

You can either update the user right after the initialization using ".then":


Web SDK:
```javascript
<script>
Smooch.init({
  appToken: 'your-app-token',
  emailCaptureEnabled: true
})
  .then(function() {
    Smooch.updateUser({
      givenName: 'New',
      surname: 'Name'
    })   
  })
<script>
```
Or you can update the information by binding your event before calling Smooch.init() with the method Smooch.on('ready') like below:


Web SDK:
```javascript
Smooch.on('ready', function(){
  Smooch.updateUser({
    givenName: 'New',
    surname: 'Name'
  })
});

Smooch.init(...);
```
