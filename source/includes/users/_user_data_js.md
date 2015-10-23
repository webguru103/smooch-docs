You can set the sender's properties by initializing Smooch with a user object.
    
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

You can specify any user property you need, and they're all optional. So the object you pass into init could also look as simple as
```
{appToken: "your_app_token", givenName: "Trogdor"}
```
