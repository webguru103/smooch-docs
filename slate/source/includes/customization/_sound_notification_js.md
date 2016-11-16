## Sound notification

By default, a sound notification will be played when a new message comes in and the window is not in focus.

To disable this feature, you need add the `soundNotificationEnabled` option to the `Smooch.init` call, like this:

```js
Smooch.init({
    appToken: 'your_app_token',
    givenName: 'Cool',
    surname: 'Person',
    soundNotificationEnabled: false // Add this line to your 'Smooch.init' call
});
```
