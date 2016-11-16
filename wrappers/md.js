import React, { Component } from 'react';
import 'highlight.js/styles/default.css';
import Helmet from 'react-helmet';
import { config } from 'config';
import hljs from 'highlight.js';

import TwoColumnLayout from '../components/TwoColumnLayout';
import ThreeColumnLayout from '../components/ThreeColumnLayout';

export default class extends Component {
    static propTypes = {
        router: React.PropTypes.object,
    };

    componentDidMount() {
        hljs.initHighlightingOnLoad();
    }

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


        return <div className='markdown'>
                   <Helmet title={ `${config.siteTitle} | ${data.title}` } />
                   <Layout {...data}>
                       <div dangerouslySetInnerHTML={ { __html: body } } />
                   </Layout>
               </div>;
    }
}
