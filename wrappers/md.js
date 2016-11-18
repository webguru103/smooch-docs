import React, { Component } from 'react';
import 'highlight.js/styles/default.css';
import Helmet from 'react-helmet';
import { config } from 'config';
import RemarkLowlight from 'remark-react-lowlight';
import modifyChildren from 'unist-util-modify-children';

import js from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

import remark from 'remark';
import reactRenderer from 'remark-react';

import merge from 'deepmerge';
import sanitizeGhSchema from 'hast-util-sanitize/lib/github.json';

import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';


const schema = merge(sanitizeGhSchema, {
    attributes: {
        '*': ['className']
    }
});

const preFunc = ({children}) => {
     return React.cloneElement(children[0]);
}

export default class extends Component {
    static propTypes = {
        router: React.PropTypes.object,
    };

    render() {
        const {layout = 'documentation', body, ...data} = this.props.route.page.data;
        let Layout;

        switch (layout) {
            case 'three-column':
                Layout = ThreeColumnLayout;
                break;
            case 'two-column':
            default:
                Layout = TwoColumnLayout;
                break;
        }


        const content = remark()
            .use(reactRenderer, {
                sanitize: schema,
                remarkReactComponents: {
                    code: RemarkLowlight({
                        json,
                        js,
                        javascript: js,
                        html: xml,
                        bash,
                        shell: bash
                    })
                }
            })
                .use(reactRenderer, {
                    sanitize: schema,
                    remarkReactComponents: {
                        pre: preFunc
                    }
                })
            .process(body)
            .contents;

        return <div className='markdown'>
                   <Helmet title={ `${config.siteTitle} | ${data.title}` } />
                   <Layout {...data}>
                       { content }
                   </Layout>
               </div>;
    }
}
