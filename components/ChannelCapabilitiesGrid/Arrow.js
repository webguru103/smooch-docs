import React, { Component, PropTypes } from 'react';

export default class Arrow extends Component {
    static propTypes = {
        direction: PropTypes.oneOf(['left', 'right']).isRequired
    };

    render() {
        const {direction} = this.props;
        return <img src={ require('../../images/grid-arrow.svg') }
                    className={ ['grid-arrow', direction].join(' ') } />;
    }
}
