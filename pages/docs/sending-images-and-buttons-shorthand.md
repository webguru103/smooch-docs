---
title: Sending Images and Buttons (Shorthand)
section: docs
layout: two-column
---

# Sending Images and Buttons (Shorthand)

## Quick reference

Element  | Syntax | Example
--|---|--
 Link button | **%\[]()** | `%[Button label](http://anyurl.com)`
 Reply button | **%\[](reply:)** |  `%[Button label](reply:PAYLOAD)`
 Postback button | **%\[](postback:)**  |  `%[Button label ](postback:PAYLOAD)`
 Payment button | **$\[]()** | `$[Button label here](25.00)`
 Image | **!\[]()** | `![](http://url-of.the/image.jpg)`

## Composing structured messages with inline syntax

A combination of text (optional), image, and button will be sent to end-users as a card.

For example:

```markdown
A wrapped cat
![](https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg)
%[Purchase cat](https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg)
```

Will result in:

![structured message](/images/card.png)


Sending a series of quick reply messages together:

```markdown
%[wrapped](reply:wrapped)
%[unwrapped](reply:unwrapped)
%[dog](reply:dog)
```

Will be displayed in Web Messenger as:

![quick replies](/images/reply-options.png)
