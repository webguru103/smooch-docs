# Customization

## Strings customization

Smooch lets you customize any strings it displays via Apple's localization mechanism. To override one or more strings, add an empty string file named `SmoochLocalizable.strings` in your Xcode project and specify new values for the keys you would like to override. For example, to change the "Messages" header, and the "Done" button create a file with these contents:

```
"Messages" = "My Messages";

"Done" = "I'm Done";
```

The full list of keys can be found in the `SmoochLocalizable.strings` file bundled with the Smooch SDK. To enable string customization across languages, make sure you "Localize" your `SmoochLocalizable.strings` file in Xcode.

![Localize SmoochLocalizable.strings](/images/localize.png)