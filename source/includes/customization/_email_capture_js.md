## Email Capture

<span class="half-width-img">![Email Capture](/images/email_capture.png)</span>

As illustrated above, it's possible to prompt your users for their email, after they send their first message. By clicking on "leave us your email", your users will be able to enter their email address which will then be accessible in Slack by using the `/sk !profile` command or in HipChat by opening the profile sidebar.

To enable this feature, you need add the `emailCapturedEnabled` option to the `Smooch.init` call, like this:

```js
var skPromise = Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    emailCaptureEnabled: true, // Add this line to your 'Smooch.init' call
});
```
