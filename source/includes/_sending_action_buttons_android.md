# Sending action buttons

You can send your users an action button with the following syntax:

```
%[Button label here](http://anyurl.com)
```

This works from any channel (Slack, Helpscout, Email) you configured to use with SupportKit. 

When the user taps your button, we'll launch the appropriate intent based on the URL, so it can be whatever you want! Anything ranging from a web url, deep link or play store link works like a charm. 

![Action buttons](/images/action_button_android.png)

<aside class="notice">
Buttons will always be appended at the bottom of your message bubble.
</aside>

### Play store link

For a play store link, you'll need your app's package. The URL of your app's page in the play store will have your package name at the end. The link to use in the Action input will then be `market://details?id=<package_name>`

![Package Name](/images/package_name_from_url.png)
