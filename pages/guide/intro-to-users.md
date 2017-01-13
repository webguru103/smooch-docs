---
title: Introduction to Users
section: guide
layout: two-column
---

# Who is a user?

See the [API reference](http://docs.smooch.io/rest/#app-user) for app users.

In the Smooch lexicon _user_ refers to an _end-user_ or _app user_. For example, a member of the public on Facebook Messenger, a visitor to your Website, the holder of an SMS number, or the user of a mobile app.

Each user has a single continuous conversation with a [Smooch app](#). Even if the conversation spans multiple channels like Messenger and SMS. It's still a single conversation. Because of this, users map directly to conversations, and the user's ID is used to reference the conversation as well as the user in the REST API.

Smooch doesn't have the concept of operators or agents as users. Responses from agents and operators come from the business entity as a whole. You can set the name of an operator, agent, or even bot merely by specifying the name property in a request to the [POST Message endpoint](http://docs.smooch.io/rest/#post-message).
