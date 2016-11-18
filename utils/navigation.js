import { config, pages as sitePages } from 'config';

export const extractAnchors = (content = '') => {
    const matches = [];

    content.replace(/[^<]*(<h1 id="([^"]+)">([^<]+)<\/h1>)/g, (...args) => {
        matches.push({
            id: args[2],
            title: args[3]
        });
    });

    return matches;
};

export const generateNavStructure = () => {

    return Object.keys(config.docs)
        .map((key) => {
            const {name, pages} = config.docs[key];


            return {
                title: name,
                pages: pages.map((path) => {
                    const page = sitePages.find(({path: _path}) => path === _path);

                    if (!page) {
                        console.error(`No page found for path ${path}.`);
                    }

                    return {
                        path: page.path,
                        title: page.data.title
                    };
                })
            };
        });
};
