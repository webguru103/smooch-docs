# Smooch

TODO : Improve this README.

## Get started

- Clone the repository
- Install gatsby (`npm install -g gatsby`)
- Install dependencies (`npm install` in the repo folder)
- Run `gatsby develop` to run the project in dev mode.

## Structure

Content should go in the `pages/` folder and the structure inside it will match the URL.
Images should go in the `pages/images/` folder and the structure inside it will match the URL. They'll also be copied at deploy time.

If you want your page to show up in the table of content (sidebar), don't forget to add the URL to a section in `config.toml`.

Your markdown files should should have the following header :

```
---
title: Some title                   // will be used as window.title
layout: two-column|three-column     // note that three-column is not implemented yet.
section: SECTION_ID                 // see note below
---
```


Note that in `config.toml`, `[section.SECTION_ID]` will match `SECTION_ID` of your markdown header. This will determine what will be shown in the sidebar next to your content.

## Navigation
As mentionned above, sidebar is generated from the sections in `config.toml`. Each `[section.SECTION_ID]` object in the config contains a list of subsection for it. In turn, each subsection (`[subsection.SUBSECTION_ID]`) contains a list of pages and a name (which will appear in the sidebar). When adding a new page or section, make sure to update the config to make it browsable via the sidebar. Otherwise, your page will only be accessible via its url.

### Links
When writing local links in your content, make sure you have a trailing slash. Otherwise, Gatsby won't be able to match it to the actual route.
