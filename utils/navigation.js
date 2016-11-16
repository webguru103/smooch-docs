import { config, pages as sitePages } from 'config';

export const extractAnchors = (content) => {
    const matches = [];

    content.replace(/[^<]*(<h1 id="([^"]+)">([^<]+)<\/h1>)/g, (...args) => {
        matches.push({
            id: args[2],
            title: args[3]
        });
    });

    return matches;
};

export const generateNavStructure = (section) => {
    if (!config.docs[section]) {
        console.error(`No section named ${section} found in config.`);
        return [];
    }

    return config.docs[section].pages.map((path) => {
        const page = sitePages.find(({path: _path}) => path === _path);

        if (!page) {
            console.error(`No page found for path ${path}.`);
        }

        const {data: {title, body}} = page;
        return {
            title,
            path,
            anchors: extractAnchors(body).filter(({title: anchorTitle}) => title !== anchorTitle)
        };
    });
};
