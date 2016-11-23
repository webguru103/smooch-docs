# Smooch

TODO : Improve this README.

## Get started

- Clone the repository
- Install gatsby (`npm install -g gatsby`)
- Install dependencies (`npm install` in the repo folder)
- Run `gatsby develop` to run the project in dev mode.

## Structure

Content should go in the `pages/` folder and the structure inside it will match the URL.
Images should go in the `pages/images` folder and the structure inside it will match the URL. They'll also be copied at deploy time.

If you want your page to show up in the table of content (sidebar), don't forget to add the URL to a section in `config.toml`.

Your markdown files should should have the following header :

```
---
title: Some title                   // will be used as window.title
layout: two-column|three-column     // note that three-column is not implemented yet.
section: section-id                 // see note below
---
```


Note that in `config.toml`, `[docs.section-id]` will match `section-id` of your markdown header. This will determine what will be shown in the sidebar next to your content.

## Navigation
As mentionned above, sidebar is generated from the sections in `config.toml`. When a page is rendered, we look up the section in the config and parse all the pages of that section to extract headers and anchors. If the first header has the same content as the page title, it will be ignored from the ToC so it doesn't get repeated (first level is page title then all h1s are nested under it in ToC).

Next and previous links will be auto-generated based on what is in `config.toml`.
