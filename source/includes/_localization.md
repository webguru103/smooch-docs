# Localization

Every string you see in Smooch can be [customized](#strings-customization) and localized. Smooch provides a few languages out of the box, but [adding new languages](#adding-more-languages) is easy to do. When localizing strings, Smooch looks for SmoochLocalizable.strings in your app bundle first then in the Smooch bundle, enabling you to customize any strings and add support for other languages.

## Enabling Localization in your app

For Smooch to display a language other than English, your app needs to first enable support for that language. You can enable a second language in your Xcode project settings:

![Enable Localization](/images/add_language.png)

Once you have this, Smooch will display itself in the device language for the supported language. English, French, Spanish, Chinese traditional, Arabic, German, Persian, Japanese and Finnish are currently included. See how to support more languages in [Adding more languages](#adding-more-languages)

<aside class="warning">
Localization is subject to caching. If you can't see your changes, cleaning your project, resetting the simulator, deleting your app from your test devices are good mesures.
</aside>

## Adding more languages

To enable other languages beside the provided ones, first copy the english SmoochLocalizable.strings file from the Smooch bundle to the corresponding .lproj folder for that language. Then, translate the values to match that language.

If you translate Smooch's strings to a language not currently supported, we encourage you to share it with us so that every Smooch user can benefit from it. You can do so by [forking](https://github.com/smooch/smooch-ios/fork) our GitHub repo and creating a pull request, or just send us your string file at <a href="mailto:help@smooch.io">help@smooch.io</a>
