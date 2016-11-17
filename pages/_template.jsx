import React, { Component, PropTypes } from 'react';
import 'styles/markdown-styles';
import 'styles/main';

import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';

export default class extends Component {
    static propTypes = {
        children: PropTypes.any
    };

    scrollToHash = () => {
        const {location} = this.props;
        const {hash} = location;

        if (hash) {
            const hashNode = document.querySelector(hash);
            if (hashNode) {
                setTimeout(() => {
                    hashNode.scrollIntoView();
                });
            }
        }
    };

    componentDidMount() {
        this.scrollToHash();
    }

    componentDidUpdate() {
        this.scrollToHash();
    }

    render() {
        return <div>
                   <SiteNav />
                   <DocsNav />
                   { this.props.children }
               </div>;
    }
}
