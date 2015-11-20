## User data

Smooch allows you to specify profile information about your users so that you can better understand the context around a user's message.

```java
User skUser = User.getCurrentUser();

skUser.setFirstName("Artour");
skUser.setLastName("Babaev");
skUser.setEmail("2ez@4rtz.com");
skUser.setSignedUpAt(new Date(1420070400000l));

final Map<String, Object> customProperties = new HashMap<>();

customProperties.put("customDate", new Date());
customProperties.put("customFlag", true);
customProperties.put("customDigit", 322);

skUser.addProperties(customProperties);
```
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

### Naming the current user

Once you set the user's name it will be persisted by Smooch so any future message from this user contain the value you provided. If the user's information changes, simply call the method a second time and the new information will overwrite it.

```objective_c
[SKTUser currentUser].firstName = @"Doctor";
[SKTUser currentUser].lastName = @"Who";
```
```swift
SKTUser.currentUser().firstName = "Doctor"
SKTUser.currentUser().lastName = "Who"
```
```java
skUser.setFirstName("Artour");
skUser.setLastName("Babaev");
```

### Getting the avatar of the current user

Setting the user's e-mail lets you see their gravatar in the e-mail conversation. The user will not see their own gravatar in the chat.

```objective_c
[SKTUser currentUser].email = @"bob@example.com";
```
```swift
SKTUser.currentUser().email = "bob@example.com"
```
```java
skUser.setEmail("2ez@4rtz.com");
```

### Setting the signed up date

Setting the user's signed up date allows Whispers based on that date to be sent to the right people. If not set, we'll default to the first time Smooch sees the user, which is the moment the `init` call is made for the first time for a given user. It's best to set it yourself to avoid sending a welcome message to users that in fact signed up a long while ago.

```objective_c
[SKTUser currentUser].signedUpAt = [NSDate date];
```
```swift
SKTUser.currentUser().signedUpAt = NSDate()
```
```java
skUser.setSignedUpAt(new Date(1420070400000l));
```

### Adding custom profile information

You can also specify any other kind of profile information that will be sent along when users contact you. You can also use any properties you store using this API to send targeted messages to your users proactively using our Whispers feature.

```objective_c
[[SKTUser currentUser] addProperties:@{ @"nickname" : @"Lil Big Daddy Slim", @"weight" : @650, @"premiumUser" : @YES }];
```
```swift
SKTUser.currentUser().addProperties([ "nickname" : "Lil Big Daddy Slim", "weight" : 650, "premiumUser" : true ])
```
```java
final Map<String, Object> customProperties = new HashMap<>();

customProperties.put("customDate", new Date());
customProperties.put("customFlag", true);
customProperties.put("customDigit", 322);

skUser.addProperties(customProperties);
```