---
title: Native Android SDK
section: guide
layout: two-column
---

# Native Android SDK

## Reference

- [Android SDK reference](http://docs.smooch.io/api/android/)

## Adding Smooch to your app

## Adding Smooch to your app

The Smooch library is distributed in both AAR and JAR format. If you are using Android Studio, follow the instructions for [installation of the AAR package](#android-studio-with-gradle).

<aside class="notice">The minimum supported SDK version is API level **15**, and your app must be compiled with at least API version **21**. If your app needs to support earlier versions of Android, you may still try to integrate, but it is untested and we cannot guarantee compatibility.
</aside>

### Android Studio with Gradle
<span class="badge">[![Bintray](https://api.bintray.com/packages/smoochorg/maven/smooch/images/download.svg)](https://bintray.com/smoochorg/maven/smooch/_latestVersion)</span>

The Smooch library is hosted on [Bintray](https://bintray.com/smoochorg/maven/smooch) and is available on [JCenter](http://jcenter.bintray.com/io/smooch/).

Setup JCenter as a repository.

```
repositories {
    jcenter()
}
```

Add the dependencies right into your `build.gradle` file.

```
compile 'io.smooch:core:latest.release'
compile 'io.smooch:ui:latest.release'
```

Sync the Gradle project then add the necessary code to [initialize Smooch in your app](#initialize-smooch-in-your-app).

<aside class="notice">
    Smooch uses a FileProvider to store photos.
    If your application has a FileProvider specified in the manifest, <a href="#replacing-the-smooch-fileprovider">follow these instructions</a>
</aside>

### Initialize Smooch in your app

After following the steps above, your app is setup for working with the Smooch SDK. Before your code can invoke its functionality, you'll have to initialize the library using your app's token.

This token is free and uniquely identifies your app and links it to the Smooch backend that does the heavy lifting necessary to bridge the gap between you and your users.

You can find your token by [logging into Smooch](https://app.smooch.io) and copying it from the settings page as shown below.

![App Token on Overview Page](/images/apptoken.png)

Once you've located your token, use the code below to initialize Smooch.

Add the following line of code to your `onCreate` method on your [Application](http://developer.android.com/reference/android/app/Application.html) class:

```java
Smooch.init(this, "YOUR_APP_TOKEN");
```
<aside class="notice">
    Make sure to replace `YOUR_APP_TOKEN` with your app token.
</aside>

If you don't have an `Application` class, we recommend that you create one to make sure Smooch is always initialized properly. If you don't have one, you can copy the following and save it to your application package.

```java
package your.package;

import android.app.Application;
import io.smooch.core.Smooch;

public class YourApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Smooch.init(this, "YOUR_APP_TOKEN");
    }
}
```

You also need to **declare** your newly created `Application` class in the `<application>` tag in your `AndroidManifest`.

```xml
<application
    android:name="your.package.YourApplication">
    ...
</application>
```

<aside class="notice">
    Remember to replace `your.package`, `YourApplication`, `YOUR_APP_TOKEN` by the appropriate names and your app token.
</aside>

#### Displaying the Smooch User Interface

Once you've initialized Smooch, you're ready to try it out.

Find a suitable place in your app's interface to invoke Smooch and use the code below to display the Smooch user interface. You can bring up Smooch whenever you think that your user will need access to help or a communication channel to contact you.

```java
ConversationActivity.show(this);
```

You should also take the time to [configure the push notifications setup](#configuring-push-notifications).

### Replacing the Smooch FileProvider
<aside class="notice">
    If you do not have a `FileProvider` entry in your `AndroidManifest.xml` file, you can safely ignore this section.
    These steps will fix the `Manifest merger failed : Attribute provider#android.support.v4.content.FileProvider@authorities` compile error
</aside>


In order to replace the Smooch FileProvider with your own, please do the following:

1. Add `tools:replace="android:authorities"` to the `<provider>` entry.

2. Add the following path to your `android.support.FILE_PROVIDER_PATHS` resource file:

```xml
<external-path name="dcim" path="DCIM"/>
```

3. When initializing Smooch, call `settings.setFileProviderAuthorities(authoritiesString);` on the settings object.

```java
Settings settings = new Settings(appToken);
settings.setFileProviderAuthorities(authoritiesString);
Smooch.init(this, settings);
```

## Configuring push notifications

Push notifications are a great, unobtrusive way to let your users know that a reply to their message has arrived.

### Step 1. Generate a FCM configuration file for your Android project

<aside class="notice">
Following these steps will enable cloud messaging for your app and create a server API key
</aside>

1. Go to Google's [Firebase console](https://console.firebase.google.com)

1. If you do not have a project already, create a new one

1. Once created, click on "Add Firebase to your Android app" and follow the instructions to generate your `google-services.json` file (for your package name, copy and paste the package used in your application's AndroidManifest.xml file)

1. Save the `google-services.json` file generated by the tool at the root of your Android application

### Step 2. Configure push notifications in Smooch

1. Go to [the Android integration page](https://app.smooch.io/integrations/android).

2. Click on the **Connect** or **Configure** button.

3. Enter your *Server API Key* and *Sender ID* (these can be retrieved by going to `Manage` for your app and heading to the `CLOUD MESSAGING` section)

### Step 3. Configure Android application to accept push

1. Add the dependency to your project's top-level `build.gradle`:

    ```
    classpath 'com.google.gms:google-services:3.0.0'
    ```

2. Add the plugin to the bottom of your app-level `build.gradle`:

    ```
    apply plugin: 'com.google.gms.google-services'
    ```

<aside class="notice">
Note: If your app has its own token registration, you need to trigger Smooch push notifications by calling the `triggerSmoochNotification` method on <a href="http://docs.smooch.io/api/android/io/smooch/core/GcmService.html">`FcmService`</a> class.</aside>

### Step 4. Test it out!

<aside class="warning">
You can't receive push notifications in the Android simulator, you must use a physical device.
</aside>

1. Kill and restart your app.

2. Launch Smooch.

3. Send a message.

4. Press the home button or navigate away from the conversation.

5. Reply to the message from your choice of Smooch integrated service

You'll receive a notification on the phone!

## Localization

Every string you see in Smooch can be [customized](#strings-customization) and localized. Smooch provides a few languages out of the box, but [adding new languages](#adding-more-languages) is easy to do. When localizing strings, Smooch looks for values in the strings.xml in your app first then in the Smooch ui bundle, enabling you to customize any strings and add support for other languages.

### Adding more languages

To enable other languages beside the provided ones, first copy the english strings.xml file from the Smooch ui bundle to the corresponding values folder for that language. Then, translate the values to match that language.

If you translate Smooch's strings to a language not currently supported, we encourage you to share it with us so that every Smooch user can benefit from it. You can do so by [forking](https://github.com/smooch/smooch-android/fork) our GitHub repo and creating a pull request, or just send us your string file at <a href="mailto:help@smooch.io">help@smooch.io</a>

## Customization

### Strings customization

Smooch lets you customize any strings it displays by overwriting its keys.
In order to do so, simply add `res/values-<your-language-code>/strings.xml` file in your Android project and specify new values for the keys used in Smooch. You can find all available keys by browsing to the `ui-x.x.x/res/values/values.xml` file in the External Libraries in Android Studio.

Dates shown in the conversation view are already localized to the user's device.

For example, if you wanted to override strings for English, you would create a file `res/values-en/strings.xml` and include the following in that file:

```xml
<resources>
    <string name="Smooch_activityConversation">Messages</string>
    <string name="Smooch_startOfConversation">This is the start of your conversation with the team.</string>
    <string name="Smooch_welcome">Feel free to leave us a message about anything that\'s on your mind.</string>
    <string name="Smooch_messageHint">Type a message…</string>
</resources>
```

<aside>Please note that if you want to specify new strings for the default fallback language, you must override them in `res/values/string.xml`.</aside>

### Styling the Conversation Interface

Using a `colors.xml` file in your `res/values` folder, you can change the colors used by Smooch:

```xml
<resources>
    <color name="Smooch_accent">#9200aa</color>
    <color name="Smooch_accentDark">#76008a</color>
    <color name="Smooch_accentLight">#be7cca</color>

    <color name="Smooch_backgroundInput">#ffffff</color>

    <color name="Smooch_btnSendHollow">#c0c0c0</color>
    <color name="Smooch_btnSendHollowBorder">#303030</color>

    <color name="Smooch_header">#989898</color>

    <color name="Smooch_messageDate">@color/Smooch_header</color>
    <color name="Smooch_messageShadow">#7f999999</color>

    <color name="Smooch_remoteMessageAuthor">@color/Smooch_header</color>
    <color name="Smooch_remoteMessageBackground">#ffffff</color>
    <color name="Smooch_remoteMessageBorder">#d9d9d9</color>
    <color name="Smooch_remoteMessageText">#000000</color>

    <color name="Smooch_userMessageBackground">@color/Smooch_accent</color>
    <color name="Smooch_userMessageBorder">@color/Smooch_accentDark</color>
    <color name="Smooch_userMessageFailedBackground">@color/Smooch_accentLight</color>
    <color name="Smooch_userMessageText">#ffffff</color>
</resources>
```

If you need to update the image of the Send button, simply add an image with the following name to your `drawables`:

```
smooch_btn_send_normal.png
```

You can find the original resources by browsing external libraries through Android Studio.

### Notification Action Intent Override

The default behavior of tapping on a push or in-app notification is to open the Smooch `ConversationActivity` intent.
If you want to change this behavior, simply override the following resource in `settings.xml` to the value of your choice:

```xml
<resources>
  <string name="Smooch_settings_notificationIntent">io.smooch.ui.ConversationActivity</string>
</resources>
```

<aside class="notice">Note that the specified intent must extend from the `Activity` class.</aside>
