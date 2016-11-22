## Styling the Conversation Interface

The style of the conversation user interface can be controlled through two techniques:

 * Using the `UIAppearance` proxy of `UINavigationBar` to style the navigation bar's color and appearance.
 * The `SKTSettings` class provides access to the status bar and the color of the message bubbles.

Suppose you wanted the conversation UI to have a black navigation bar and red message bubbles. First, you'd use `UINavigationBar`'s appearance proxy to set up the navigation bar. Then, you'd use SKTSettings to finish styling the UI:

```objective_c
SKTSettings* settings = [SKTSettings settingsWithAppToken:@"YOURAPP_TOKEN"];
settings.conversationAccentColor = [UIColor redColor];
settings.conversationStatusBarStyle = UIStatusBarStyleLightContent;

[[UINavigationBar appearance] setBarTintColor:[UIColor blackColor]];
[[UINavigationBar appearance] setTintColor:[UIColor redColor]];
[[UINavigationBar appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : [UIColor redColor] }];
```
```swift
var settings = SKTSettings(appToken: "YOUR_APP_TOKEN")
settings.conversationAccentColor = UIColor.redColor();
settings.conversationStatusBarStyle = UIStatusBarStyle.LightContent;

UINavigationBar.appearance().barTintColor = UIColor.blackColor()
UINavigationBar.appearance().tintColor = UIColor.redColor()
UINavigationBar.appearance().titleTextAttributes = [ NSForegroundColorAttributeName : UIColor.redColor()]
```
