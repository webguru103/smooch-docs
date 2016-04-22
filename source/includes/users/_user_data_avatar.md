### Getting the avatar of the current user

Setting the user's e-mail lets you see their gravatar in the e-mail conversation. The user will not see their own gravatar in the chat.

```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].email = @"bob@example.com";
```
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().email = "bob@example.com"
```
```java
import io.smooch.core.User;

User.getCurrentUser().setEmail("2ez@4rtz.com");
```
```javascript
Smooch.updateUser({
    email: 'the-doctor@smooch.io'
})
```

### Setting the signed up date

Setting the user's signed up date allows Whispers based on that date to be sent to the right people. If not set, we'll default to the first time Smooch sees the user, which is the moment the `init` call is made for the first time for a given user. It's best to set it yourself to avoid sending a welcome message to users that in fact signed up a long while ago.

```objective_c
#import <Smooch/Smooch.h>

[SKTUser currentUser].signedUpAt = [NSDate date];
```
```swift
#import <Smooch/Smooch.h>

SKTUser.currentUser().signedUpAt = NSDate()
```
```java
import io.smooch.core.User;

User.getCurrentUser().setSignedUpAt(new Date(1420070400000l));
```
```javascript
Smooch.updateUser({
    signedUpAt: new Date("Nov 6, 2013")
})
```

### Adding custom profile information

You can also specify any other kind of profile information that will be sent along when users contact you. You can also use any properties you store using this API to send targeted messages to your users proactively using our Whispers feature.

```objective_c
#import <Smooch/Smooch.h>

[[SKTUser currentUser] addProperties:@{ @"nickname" : @"Lil Big Daddy Slim", @"weight" : @650, @"premiumUser" : @YES }];
```
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
