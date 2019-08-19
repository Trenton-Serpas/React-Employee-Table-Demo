import React, { Component, Fragment } from 'react';
import '../App.css';
import auth from '../auth';
import { Link, withRouter } from 'react-router-dom';

class List extends Component {
    componentDidMount() {
        this.fetchEmployees()
        .then(rs => this.setState({items: rs}));
    }

    fetchEmployees = async () => {
        const data = await fetch('http://localhost:8080/employees/list');
        const json = await data.json();
        return json;
    }

    constructor(props) {
        super();
        if(!auth.authenticated) {
            props.history.push('/')
        }
        this.state = { items: []};
    }

    render() {
        return (
            <Fragment>
                <button 
                    type="button"
                    onClick={e => this.props.history.push('/edit')}
                    style={{float: 'right', margin: '4px', marginRight: '5%'}}>
                    Add Employee
                </button>
                <table className='Card' style={{width: '90%'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items ? this.state.items.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/edit/${item.id}`}>
                                        {item.firstName + ' ' + item.lastName}
                                    </Link>
                                </td>
                                <td>{item.email}</td>
                            </tr>
                        )) : null }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default withRouter(List);
