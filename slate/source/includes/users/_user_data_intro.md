## User data

Smooch allows you to specify profile information about your users so that you can better understand the context around a user's message.

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
#import <Smooch/Smooch.h>

[SKTUser currentUser].firstName = @"Doctor";
[SKTUser currentUser].lastName = @"Who";
```
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
```javascript
Smooch.updateUser({
    givenName: 'Doctor',
    surname: 'Who'
})
```
