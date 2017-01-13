// TODO : Figure out why there's a possible EventEmitter memory leak instead of blindly ignore it.
require('events').EventEmitter.defaultMaxListeners = Infinity;
import fs from 'fs-extra-promise';
import sm from 'sitemap' ;

// Sitemap generation taken from suggestions in https://github.com/gatsbyjs/gatsby/issues/12

function pagesToSitemap(pages) {
    const urls = pages.map(({path}) => {
        if (path !== undefined) {
            return {
                url: path,
                changefreq: 'daily',
                priority: 0.7
            };
        }
    });

    return urls.filter((u) => u !== undefined);
}

function generateSiteMap(pages) {
    const sitemap = sm.createSitemap({
        hostname: 'https://docs.smooch.io',
        cacheTime: '60000',
        urls: pagesToSitemap(pages)
    });

    console.log('Generating /public/sitemap.xml');

    fs.writeFileSync(
        `${__dirname}/public/sitemap.xml`,
        sitemap.toString()
    );
}

export function postBuild(pages, callback) {
    generateSiteMap(pages);
    callback();
}
