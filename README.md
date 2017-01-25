# Smooch
*A complete platform to add multi-channel messaging to your software or business*

This project hosts the documentation available at [https://docs.smooch.io/](https://docs.smooch.io/).

The docs provides in-depth information on Smooch’s features and is meant to be a guide for developers integrating the SDK and businesses seeking to engage with their users.

All source code examples are provided in Objective-C, Swift, and JavaScript! You can view code examples inline.

For more in-depth details on Smooch’s API check out our [API reference](https://docs.smooch.io/rest/). The API reference documents every method and property available through Smooch. If you have any other questions, feel free to reach out to us [here](mailto:help@smooch.io).

## Get Started

Clone the repository and install the dependencies

    $ git clone git@github.com:smooch/smooch-docs.git
    $ cd smooch-docs
    $ npm install

Run the project in dev mode

    $ npm run dev

Docs will be available on [http://localhost:8000](http://localhost:8000).

## Structure

Content should go in the `pages/` folder and the structure inside it will match the URL.
Images should go in the `pages/images/` folder and the structure inside it will match the URL. They'll also be copied at deploy time.

If you want your page to show up in the table of content (sidebar), don't forget to add the URL to a section in `config.toml`.

Your Markdown files should should have the following header:

```
---
title: Some title                   // will be used as window.title
layout: two-column|three-column     // note that three-column is not implemented yet.
section: SECTION_ID                 // see note below
---
```


Note that in `config.toml`, `[section.SECTION_ID]` will match `SECTION_ID` of your Markdown header. This will determine what will be shown in the sidebar next to your content.

## Navigation
As mentioned above, the sidebar is generated from the sections in `config.toml`. Each `[section.SECTION_ID]` object in the config contains a list of subsection for it. In turn, each subsection (`[subsection.SUBSECTION_ID]`) contains a list of pages and a name (which will appear in the sidebar). When adding a new page or section, make sure to update the config to make it browsable via the sidebar. Otherwise, your page will only be accessible via its url.

### External links
If you need to have an external link in the sidebar, you just need to use this syntax : `Label__URL`. (ex: `API Reference__https://docs.smooch.io/rest/`). This will open the link in a new tab.

### Links
When writing local links in your content, make sure you have a trailing slash. Otherwise, Gatsby won't be able to match it to the actual route.

## Legacy

A part of the docs are still built with Slate, they can be installed locally with the following:

    $ cd slate
    $ gem install bundler
    $ bundle install

Run the server

    $ bundle exec middleman server

Those docs will be available on [http://localhost:4567](http://localhost:4567).

**Incompability with Gastby docs**

Links to Legacy docs from Gastby don't work in the local environment; you will be redirected to the docs in [production](https://docs.smooch.io/rest) instead. As a workaround, you need to type in [http://localhost:4567/](http://localhost:4567/) followed by the hash you want to navigate to.
