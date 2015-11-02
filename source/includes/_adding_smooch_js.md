# Adding Smooch to your site

There are a few ways you can include the Smooch plugin on your web page.

The recommended method is the Script Tag method, but you can also include it using bower or npm.

## Script Tag Method

####Step 1: Include the Smooch plugin on your web page

Add the following code towards the end of the `body` section on your page. Placing it at the end allows the rest of the page to load first.

```html
<script src="https://cdn.smooch.io/smooch.min.js"></script>
```

####Step 2: Initialize Smooch with your new app token

Once Smooch has been included on your web page, you're almost done. Simply initialize the plugin using this code snippet

```html
<script>
	Smooch.init({appToken: 'your_app_token'});
</script>
```

## npm and browserify

```
npm install smooch
```

In your code:

```javascript
var Smooch = require('smooch');

Smooch.init({appToken: 'your_app_token'});
```

## bower

```
bower install smooch
```

In your code:

```javascript
Smooch.init({appToken: 'your_app_token'});
```
