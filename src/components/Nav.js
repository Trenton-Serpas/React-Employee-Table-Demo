import React, { Component } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav>
                <h2 style={{cursor: 'pointer'}} onClick={e => this.props.history.push('/')}><b>Employee Management App</b></h2>
            </nav>
        );
    };
}

export default withRouter(Nav);
