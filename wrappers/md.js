import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Helmet from 'react-helmet';
import catchLinks from 'catch-links';

import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';
import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';
import { SITE_ROOT } from '../utils/navigation';

export default class extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        route: PropTypes.object.isRequired
    };

    catchContentLinks = () => {
        const {router} = this.context;
        const node = this._contentNode;
        catchLinks(node, (href) => {
            router.push({
                pathname: href
            });
        });
    };

    componentDidMount() {
        this.catchContentLinks();
    }

    componentDidUpdate() {
        this.catchContentLinks();
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

        return <div>
                   <Helmet title={ data.title }
                           meta={ meta }
                           link={ link } />
                   <SiteNav section={ data.section } />
                   <DocsNav route={ route } />
                   <Layout {...data}>
                       <div ref={ (c) => this._contentNode = findDOMNode(c) }
                            className='markdown'
                            dangerouslySetInnerHTML={ { __html: body } } />
                   </Layout>
               </div>;
    }
}
