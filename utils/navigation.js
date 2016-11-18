import { config, pages as sitePages } from 'config';

export const generateNavStructure = (section) => {
    const {subsections} = config.sections[section];
    return subsections.map((subsection) => {
        const {name, pages} = config.subsections[subsection];

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
