import React, { Component, PropTypes } from 'react';

export default class extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.context.router.push({
            pathname: '/guide/native-ios-sdk/'
        });
    }

    render() {
        return null;
    }
}
