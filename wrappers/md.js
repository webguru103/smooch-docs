import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import catchLinks from 'catch-links';

import Page from '../components/Page';
import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';

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
            router.push(href);
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

        return <Page {...this.props}>
                   <Layout {...data}>
                       <div ref={ (c) => this._contentNode = findDOMNode(c) }
                            className='markdown'
                            dangerouslySetInnerHTML={ { __html: body } } />
                   </Layout>
               </Page>;
    }
}
