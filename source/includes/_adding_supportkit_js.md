# Adding SupportKit to your site

There are a few ways you can include the SupportKit plugin on your web page.

The recommended method is the Script Tag method, but you can also include it using bower or npm.

## Script Tag Method

####Step 1: Include the SupportKit plugin on your web page

Add the following code towards the end of the `body` section on your page. Placing it at the end allows the rest of the page to load first.

```html
<script src="https://cdn.supportkit.io/supportkit.min.js"></script>
```

<aside class="info">
    Note that SupportKit requires jQuery to work. If you aren't using jQuery yet, then add the following code before the previous code snippet.<br>
    ```
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    ```
</aside>

####Step 2: Initialize SupportKit with your new app token

Once SupportKit has been included on your web page, you're almost done. Simply initialize the plugin using this code snippet

```html
<script>
	SupportKit.init({appToken: 'your_app_token'});
</script>
```

## npm and browserify

```
npm install supportkit
```

In your code:

```javascript
var SupportKit = require('supportkit-js');

SupportKit.init({appToken: 'your_app_token'});
```

## bower

```
bower install supportkit
```

In your code:

```javascript
SupportKit.init({appToken: 'your_app_token'});
```