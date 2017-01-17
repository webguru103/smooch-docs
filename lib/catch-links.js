// Modified from https://github.com/substack/catch-links/blob/master/index.js

var url = require('url');

module.exports = function (root, cb) {
    root.addEventListener('click', function (ev) {
        if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
            return true;
        }

        var anchor = null;
        for (var n = ev.target; n.parentNode; n = n.parentNode) {
            if (n.nodeName === 'A') {
                anchor = n;
                break;
            }
        }
        if (!anchor) {
            return true;
        }

        var href = anchor.getAttribute('href');
        var u = url.parse(anchor.getAttribute('href'));

        if (u.host && u.host !== location.host) {
            return true;
        }

        // Force page refresh for fully-qualified URLs.
        // Works around the fact that not all pages at docs.smooch.io are part of the same react application
        if (!href.startsWith('/')) {
            return true;
        }

        ev.preventDefault();

        cb(url.resolve(location.pathname, u.path || '') + (u.hash || ''));
        return false;
    });
};
