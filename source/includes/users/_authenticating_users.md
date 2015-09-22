## Authenticating users (optional)

Provided you're [assigning `userId`s to your users](#users-on-multiple-devices), you can authenticate users to SupportKit by issuing signed [JSON web token](http://jwt.io) (JWT) credentials. This option requires your app to be connected to your own secure web service, or to a 3rd party equivalent such as [parse.com](https://parse.com). There are JWT libraries available supporting a wide variety of popular languages and platforms.

To issue JWTs:

1. Generate a secret key for your SupportKit app. You can do this from the [SupportKit dashboard](https://app.supportkit.io) under the Settings tab.

    ![Secret Keys](secret_keys.png)

1. Implement server side code to sign new JWTs using the key ID and secret provided. The JWT header must specify the key ID (`kid`). The JWT body must specify a `scope` of 'appUser' and the `userId` you've assigned to the app user.

    A node.js sample is provided below:

    ```
    var jwt = require('jsonwebtoken');
    var KEY_ID = '55e9f9bf7a0ce5ca2d429c17';
    var SECRET = 'BFJJ88naxc5PZNAMU9KpBNTR';

    var signJwt = function(userId) {
        return jwt.sign({
            scope: 'appUser',
            userId: userId
        },
        SECRET,
        {
            headers: {
                kid: KEY_ID
            }
        });
    }
    ```

1. Issue a JWT for each user. You should tie-in the generation and delivery of this JWT with any existing user login process used by your app.

1. Specify the JWT when calling `login` on the client:


    ```objective_c
    [SupportKit login:yourUserId jwt:yourJwt];
    ```
    ```swift
    SupportKit.login(yourUserId, jwt:yourJwt)
    ```
    ```javascript
    SupportKit.login(yourUserId, yourJwt);
    ```
    ```java
    SupportKit.login(yourUserId, yourJwt);
    ``` 

Securing a `userId` happens automatically by using a JWT for the first time. Once a JWT is used to authenticate an individual `userId` with SupportKit, that specific `userId` will require a JWT credential in all future init or login calls made to SupportKit.

Once you've issued a `userId` and `JWT` to a user for the first time you can save them to the device locally. Having done this, instead of making a separate call to `login` you can provide SupportKit with the `userId` and `JWT` parameters during app initialization:

```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"];
settings.userId = yourUserId;
settings.jwt = yourJwt;
[SupportKit initWithSettings:settings];
```
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.userId = yourUserId
settings.jwt = yourJwt
SupportKit.initWithSettings(settings)
```
```javascript
SupportKit.init({
    appToken: 'YOUR_APP_TOKEN',
    userId: yourUserId,
    jwt: yourJwt
});
``` 
```java
Settings settings = new Settings("YOUR_APP_TOKEN");
settings.setUserId(yourUserId);
settings.setJWT(yourJwt);
SupportKit.init(this, settings);
```

<aside class="warning">
If your secret key is ever compromised you can generate a new one. SupportKit will accept a JWT as long as it contains all required fields and is signed with any of your SupportKit app's valid secret keys. Deleting a secret key will invalidate all JWTs that were signed with it.
</aside>