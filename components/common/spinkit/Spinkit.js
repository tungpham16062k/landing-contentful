import React from 'react';
import PropTypes from 'prop-types';
import *  as BRSpinkit from 'better-react-spinkit';

import { getColor } from '@utils/StyleUtils';

class Spinkit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initComp();
    }

    componentDidUpdate(prevProps) {
        const { name } = this.props;
        if (name !== prevProps.name) {
            this.initComp();
        }
    }

    initComp = () => {
        const { name } = this.props;
        this.Comp = BRSpinkit[name];
        this.setState(state => ({ reRender: !state.reRender }));
    }

    render() {
        const { color, ...rest } = this.props;
        return this.Comp ? <this.Comp {...{ color: getColor(color), ...rest }} /> : null;
    }

}

Spinkit.propTypes = {
    name: PropTypes.oneOf([
        'ChasingDots',
        'Circle',
        'CubeGrid',
        'DoubleBounce',
        'FadingCircle',
        'FoldingCube',
        'Pulse',
        'RotatingPlane',
        'ThreeBounce',
        'WanderingCubes',
        'Wave',
    ]),
    size: PropTypes.number,
    color: PropTypes.string,
};

Spinkit.defaultProps = {
    name: 'ThreeBounce',
    color: 'blue',
    size: 12,
};

export default Spinkit;