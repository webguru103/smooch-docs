# Adding Smooch to your app

The Smooch library is distributed in both AAR and JAR format. If you are using Android Studio, follow the instructions for [installation of the AAR package](#android-studio-with-gradle).

<aside class="notice">The minimum supported SDK version is API level **15**, and your app must be compiled with at least API version **21**. If your app needs to support earlier versions of Android, you may still try to integrate, but it is untested and we cannot guarantee compatibility.
</aside>

## Android Studio with Gradle
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
    If your application has a FileProvider specified in the manifest, [follow these instructions](#replacing-the-smooch-fileprovider)
</aside>

## Initialize Smooch in your app

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

### Displaying the Smooch User Interface

Once you've initialized Smooch, you're ready to try it out.

Find a suitable place in your app's interface to invoke Smooch and use the code below to display the Smooch user interface. You can bring up Smooch whenever you think that your user will need access to help or a communication channel to contact you.

```java
ConversationActivity.show(this);
```

You should also take the time to [configure the push notifications setup](#configuring-push-notifications).

## Replacing the Smooch FileProvider
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
