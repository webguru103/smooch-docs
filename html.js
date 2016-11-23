import React, { Component } from 'react';
import Helmet from 'react-helmet';

const BUILD_TIME = new Date().getTime();

export default class extends Component {
    static propTypes = {
        body: React.PropTypes.string,
    };

    render() {
        const head = Helmet.rewind();

        let css;
        if (process.env.NODE_ENV === 'production') {
            css = <style dangerouslySetInnerHTML={ { __html: require('!raw!./public/styles.css') } } />;
        }

        return <html {...head.htmlAttributes.toComponent()}>
               <head>
                   <meta charSet='utf-8' />
                   <meta httpEquiv='X-UA-Compatible'
                         content='IE=edge' />
                   <meta name='viewport'
                         content='width=device-width, initial-scale=1.0, user-scalable=no' />
                   { head.title.toComponent() }
                   { head.meta.toComponent() }
                   { head.link.toComponent() }
                   { css }
                   { head.script.toComponent() }
               </head>
               <body>
                   <div id='react-mount'
                        dangerouslySetInnerHTML={ { __html: this.props.body } } />
                   <script preload
                           src={ `/bundle.js?t=${BUILD_TIME}` } />
               </body>
               </html>;
    }
}
