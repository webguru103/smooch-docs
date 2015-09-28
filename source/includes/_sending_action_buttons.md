# Sending action buttons

You can send your users an action button with the following syntax:

```
%[Button label here](http://anyurl.com)
```

This works from any channel you configured to use with SupportKit. 

Your action URL can be anything accepted by [`[[UIApplication sharedApplication] openURL:url];`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/#//apple_ref/occ/instm/UIApplication/openURL:) So anything ranging from a web url, deep link into your app or app store link to ask for a review works like a charm. 

![Action buttons](/images/action_button.png)

<aside class="notice">
Buttons will always be appended at the bottom of your message bubble.
</aside>

### App store link

For an app store link, you can get your app's App Store ID by finding it on [Link Maker](https://linkmaker.itunes.apple.com). The URL of your app's page will have your App Store ID at the end. The link to use in the Action input will then be `itms-apps://itunes.apple.com/app/id[_yourAppIdHere_]`

![App Store ID](/images/appstoreid_from_url.png)
