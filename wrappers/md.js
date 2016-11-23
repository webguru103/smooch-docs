import React, { Component } from 'react';
import 'highlight.js/styles/default.css';
import Helmet from 'react-helmet';
import hljs from 'highlight.js';

import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';
import { SITE_ROOT } from '../utils/navigation';

export default class extends Component {
    componentDidMount() {
        hljs.initHighlightingOnLoad();
    }

    render() {
        const {route} = this.props;
        const {layout = 'two-column', body, ...data} = route.page.data;
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

        const path = `${SITE_ROOT}${route.path}`;

        const meta = [{
            property: 'og:title',
            content: data.title
        }, {
            property: 'og:url',
            content: path
        }];

        const link = [{
            rel: 'canonical',
            href: path
        }];

        return <div className='markdown'>
                   <Helmet title={ data.title }
                           meta={ meta }
                           link={ link } />
                   <Layout {...data}>
                       <div dangerouslySetInnerHTML={ { __html: body } } />
                   </Layout>
               </div>;
    }
}
