---
title: Authorization
section: guide
layout: two-column
---

# Authorization

The Smooch API provides granular access control capabilities that help keep user data, configuration settings and conversations secure.
This is accomplished through the use of scoped API access tokens that can only access a limited set of data and APIs.

The scopes available in the Smooch API provide progressively greater access to data and platform capabilities. For instance, **appUser** scoped tokens operate only within the context of a particular user, **app** tokens operate within the context of a particular app and thus all of the users, conversations and configuration of that particular app, while **account** tokens operate within the context of a Smooch account and thus provide access to the data of each app associated with the account.

| Scope | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Access Rights |
|---|---|---|
|**appUser**| | A specific user's conversation records and profile metadata|
|**app**| | A business' (also known as an "app" within Smooch) collection of conversations with all of its "users", their associated metadata and webhook configuration.|
|**account**| | Data belonging to all managed accounts (apps) associated with the account.|

&nbsp;

The examples illustrated in most sections of this guide, and most of the work you perform using the Smooch API, will be performed with API tokens you create at **app** scope.

Smooch recommends that you make use of the convenient [API wrappers](https://github.com/smooch/smooch-core-js) when using the API. These libraries greatly simplify authentication and usage of the Smooch API by letting you focus on application logic instead of the details around authentication.

If you'd like to use the API directly, or want to learn how Smooch manages authentication at the API level, read the documentation on crafting [JSON Web Tokens](/guide/jwt/).
