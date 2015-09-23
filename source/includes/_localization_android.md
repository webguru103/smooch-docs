# Localization

Every string you see in SupportKit can be [customized](#strings-customization) and localized. SupportKit provides a few languages out of the box, but [adding new languages](#adding-more-languages) is easy to do. When localizing strings, SupportKit looks for values in the strings.xml in your app first then in the SupportKit ui bundle, enabling you to customize any strings and add support for other languages.

## Adding more languages

To enable other languages beside the provided ones, first copy the english strings.xml file from the SupportKit ui bundle to the corresponding values folder for that language. Then, translate the values to match that language.

If you translate SupportKit's strings to a language not currently supported, we encourage you to share it with us so that every SupportKit user can benefit from it. You can do so by [forking](https://github.com/supportkit/supportkit-android/fork) our GitHub repo and creating a pull request, or just send us your string file at <a href="mailto:help@supportkit.io">help@supportkit.io</a>
