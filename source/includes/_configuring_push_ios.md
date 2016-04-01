## Configuring push notifications

Push notifications are a great, unobtrusive way to let your users know that a reply to their message has arrived.

### Step 1. Enable Push Notifications and Generate the .p12 Certificate

1. Log into the Identifiers section of the Apple Developer Member Center, and select your app. You can get there by visiting [this link](https://developer.apple.com/account/ios/identifiers/bundle/bundleList.action)

2. Click 'Edit', enable 'Push Notifications', and then click 'Create Certificate..."

3. Follow the instructions to generate a certificate signing request using Keychain Access

4. Once the certificate is ready, download it to your computer and double-click it to open it in Keychain Access

5. Right click on the certificate you created, and select 'Export "Apple Development IOS Push Services:..."'

6. Save the .p12 file to your computer.

### Step 2. Upload the .p12 file to Smooch

1. Go to [https://app.smooch.io](https://app.smooch.io) and log into your account.

2. On the Overview page, select **iOS**

3. Upload the .p12 file.

### Step 3. Re-create your Provisioning Profile

Now that you have enabled push notifications for your app, you MUST re-create your Provisioning Profile. You can not use the one you've used in the past.

1. Go to Provisioning Profiles in the Apple Developer Member Center by [clicking here](https://developer.apple.com/account/ios/profile/profileList.action).

2. Click the '+' button to add a new provisioning profile and follow the on-screen instructions.

3. Notice that once you created the new provisioning profile, it shows that "Push Notifications" is an enabled service. Download the new profile.

4. Double click it to install it. It should now be selectable in Xcode for your app.

5. Build your app.

### Step 4. Test it out!

<aside class="warning">
You can't receive push notifications in the Xcode simulator, you must use a physical device.
</aside>

1. Kill and restart your app.

2. Launch Smooch.

3. Send a message. Important! You must resend a message after uploading the p12 file.

4. Reply to the message from your email inbox

You'll receive a notification if you're in the app, or outside the app!

### Step 5. Repeat for Production mode

Take note that there are "Development" and "Production" certificates and profiles. Make sure that you upload the "Production" .p12 file to Smooch when you're ready to release your build through ad-hoc, enterprise or app store distribution.

<aside class="notice">
Smooch automatically handles incoming push notifications by swizzling certain methods on your app's `UIApplicationDelegate`. To disable this behaviour, you can set `enableAppDelegateSwizzling` to `false` on your `SKTSettings` object. However, if you choose to do so, you **must** follow the instructions outlined in the [API documentation](http://docs.smooch.io/api/ios/Classes/SKTSettings.html#//api/name/enableAppDelegateSwizzling) to ensure that push notifications continue to be handled correctly.
</aside>