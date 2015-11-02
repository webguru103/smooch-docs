### Naming the current user

You can set the sender's name by calling the method below. Once you set the user's name, it will be persisted by Smooch so any future message from this user will be named with the input you provided. If the user changes, simply call the method above a second time and the new information will overwrite it.

```objective_c
[SKTUser currentUser].firstName = @"Doctor";
[SKTUser currentUser].lastName = @"Who";
```
```swift
SKTUser.currentUser().firstName = "Doctor"
SKTUser.currentUser().lastName = "Who"
```

### Getting the avatar of the current user

Setting the user's e-mail lets you see their gravatar in the e-mail conversation. The user will not see their own gravatar in the chat.

```objective_c
[SKTUser currentUser].email = @"bob@example.com";
```
```swift
SKTUser.currentUser().email = "bob@example.com"
```

### Setting the signed up date

Setting the user's signed up date allows Whispers based on that date to be sent to the right people. If not set, we'll default to the first time Smooch sees the user. It's best to set it yourself to avoid sending a welcome message to users that in fact signed up a long while ago.

```objective_c
[SKTUser currentUser].signedUpAt = [NSDate date];
```
```swift
SKTUser.currentUser().signedUpAt = NSDate()
```

### Adding custom profile information

The SKTUser class also allows you to add any other kind of profile information that will be sent along when users contact you. You can also use any properties you store using this API to send targeted messages to your users proactively using our Whispers feature. The `addProperties:` method accepts an NSDictionary containing the properties to add.

This dictionary must have keys that are NSString and values that are either NSString, NSNumber or NSDate. If your dictionary contains any other data type as a value, then `description` will be called on the object and the resulting NSString will be added as a property.

```objective_c
[[SKTUser currentUser] addProperties:@{ @"nickname" : @"Lil Big Daddy Slim", @"weight" : @650, @"premiumUser" : @YES }];
```
```swift
SKTUser.currentUser().addProperties([ "nickname" : "Lil Big Daddy Slim", "weight" : 650, "premiumUser" : true ])
```