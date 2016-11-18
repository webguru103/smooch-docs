import frontMatter from 'front-matter';
import objectAssign from 'object-assign';

module.exports = function(content) {
    this.cacheable();
    const meta = frontMatter(content);
    const result = objectAssign({}, meta.attributes, {
        body: meta.body,
    });
    this.value = result;
    return `module.exports = ${JSON.stringify(meta)}`;
};
