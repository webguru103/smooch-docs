## Email Capture

![Email Capture](/images/email_capture.png)

As illustrated above, it's possible to prompt your users for their email, after they send their first message. By clicking on "leave us your email", your users will be able to enter their email address which will then be stored in the user's profile information.

To enable this feature, you need add the `emailCapturedEnabled` option to the `Smooch.init` call, like this:

```js
var skPromise = Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    emailCaptureEnabled: true, // Add this line to your 'Smooch.init' call
});
```
