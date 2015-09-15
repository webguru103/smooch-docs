# Recommending answers

Recommending content to your users is a great way to share important information, and solve users' problems before they have to tap the "Messages" button. SupportKit beautifully previews your recommendations, so users can easily browse and find the one they are looking for. Content can be from any URL including online videos like Youtube.

![Recommended answers](/images/recommended.png)

The SupportKit SDK provides two types of recommendations -  a static default list of recommendations, and one dynamic top recommendation.

The default recommendations should showcase important information about your app (i.e. information that should apply to the majority of users). This list can include basic usage instructions for different areas of the app, unique or new features to show off, solutions to common problems, or anything else you would like to communicate to your users.

Use the `setDefaultRecommendations:` API to set these, for example: 

```objective_c
[SupportKit setDefaultRecommendations:@[ @"https://www.somearticle.com/article", @"https://somevideotoshow.com" ]];
```
```swift
SupportKit.setDefaultRecommendations(["https://www.somearticle.com/article", "https://somevideotoshow.com"])
```

The top recommendation will appear at the beginning of the list and will be the first one the user sees upon launching SupportKit. This recommendation should attempt to solve a problem the user has just experienced so they don't need to search for it. For example, if a user fails to log in, you may choose to recommend an article explaining the various types of login errors that can occur, and how to fix and/or work around them.

Use the `setTopRecommendations:` API to set these, for example: 

```objective_c
[SupportKit setTopRecommendation:@"https://yourdomain.zendesk.com/hc/en-us/articles/000000000-context-driven-recommendation"];
```
```swift
SupportKit.setTopRecommendation("https://yourdomain.zendesk.com/hc/en-us/articles/000000000-context-driven-recommendation")
```

Recommending content to your users is a great way to increase engagement with your app and reduce user's frustration by providing help before users even have the chance to ask for it.