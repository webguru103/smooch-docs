### Configuring Zendesk knowledge base

Smooch can also instantly embed your Zendesk Help Center in your app. This will give your users the ability to search your Zendesk knowledge base without leaving the app.

![kb search](loginandsearch.jpg)

To show the Zendesk knowledge base search, call the init API in the SDK with your Zendesk Help Center URL:

```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOURAPPTOKEN"];
settings.knowledgeBaseURL = @"https://smooch.zendesk.com"; //TODO: Replace with your own Zendesk URL
[Smooch initWithSettings:settings]; 
```
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.knowledgeBaseURL = "https://smooch.zendesk.com" //TODO: Replace with your own Zendesk URL
Smooch.initWithSettings(settings)
```
When specifying your Zendesk URL, make sure to include the protocol (http:// or https://) that matches your Zendesk instance's configuration.

Some Zendesk installations are shared between multiple apps. In such cases it's necessary to filter Smooch's search results to only articles relevant to the specific app. The Smooch filtering API provides a means to accomplish this, and allows filtering of search results based on categories, sections or forums (Zendesk knowledge bases are organized in three tiers: Category -> Section or Forum -> Article).

To find the id of a category, section or forum in Zendesk, simply navigate to the root of a given category/section/forum on your web portal, and copy the id contained in your browser's address bar. The id will be a numerical value in the last path component of the URL.

<aside class="info">
NOTE: Smooch only accepts category, section or forum ids, and not article ids.
</aside>

In HelpCenter, look for the word 'sections' or 'categories' in the URL, as shown in the images below.

![hc 2](/images/hcurl2.png)
![hc 1](/images/hcurl1.png)

If you're using an older version of Zendesk, look for the word 'forums' in the URL, as shown in the image below.

![hc 3](/images/hcurl3.png)

For example, to configure the SDK to only show articles under category ID 200033675:

```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOURAPPTOKEN"];
settings.knowledgeBaseURL = @"https://smooch.zendesk.com";

[settings excludeSearchResultsIf:SKTSearchResultIsNotIn
                      categories:@[@200033675]
                        sections:nil];
```
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.knowledgeBaseURL = "https://smooch.zendesk.com"

settings.excludeSearchResultsIf(SKTSearchResultsFilterMode.ResultIsNotIn, categories: [200033675], sections: nil)
```

Or, if instead you wanted to filter out all articles under section ID 200369774, your configuration would look like this:

```objective_c
[settings excludeSearchResultsIf:SKTSearchResultIsIn
                      categories:nil
                        sections:@[@200369774]];
```
```swift
settings.excludeSearchResultsIf(SKTSearchResultsFilterMode.ResultIsIn, categories: nil, sections: [200369774])
```

To configure filters using the older forum IDs, add forum IDs to the sections parameter like so:

```objective_c
[settings excludeSearchResultsIf:SKTSearchResultIsIn
                      categories:nil
                        sections:@[@200369774, @21931073]];
```
```swift
settings.excludeSearchResultsIf(SKTSearchResultsFilterMode.ResultIsIn, categories: nil, sections: [200369774, 21931073])
```