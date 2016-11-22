## Links

You can send a link action button to your users with the following syntax:

```
%[Button label here](http://anyurl.com)
```

This works from any channel you've configured with Smooch.

When the user taps your button, the appropriate intent is launched based on the URL, so it can be whatever you want! Anything ranging from a web url, deep link or play store link works like a charm.

<span class="half-width-img">![Action buttons](/images/action_button_android.png)</span>

<aside class="notice">
Buttons will always be appended at the bottom of your message bubble.
</aside>

### Play store link

For a play store link, you'll need your app's package. The URL of your app's page in the play store will have your package name at the end. The link to use in the Action input will then be `market://details?id=<package_name>`

![Package Name](/images/package_name_from_url.png)
