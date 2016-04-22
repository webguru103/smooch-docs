<aside class="notice">
You need to make sure the SDK is properly initialized before attempting to update a user information.
</aside>

You can either update the user right after the initialization using ".then":

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

```javascript
Smooch.on('ready', function(){
  Smooch.updateUser({
    givenName: 'New',
    surname: 'Name'
  })
});

Smooch.init(...);
```
