import React, {Component} from 'react';
import '../App.css';
import auth from '../auth';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failedAttempt: false,
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    TryLogin(e) {
        e.preventDefault();
        this.fetchLogins().then(rs => {
            const match = rs.find(x => x.email === this.state.email)
            if(match && match.password === this.state.password) {
                auth.authenticated = true;
                this.props.history.push('/list');
            } else {
            this.setState({failedAttempt: true}); 
            }
        })
    }

    fetchLogins = async () => {
        const data = await fetch('http://localhost:8080/employees/login');
        const json = await data.json();
        return json;
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="Card" style={{width: '300px'}}>
                {this.state.failedAttempt ? <div className="Card" style={{backgroundColor: '#ffeeee', color: 'red', margin: '10px'}}>Invalid login</div> : null}
                <form onSubmit={e=>this.TryLogin(e)}>
                    <input
                        minLength="8"
                        maxLength="35"
                        name="email"
                        pattern="^[a-zA-Z0-9@.]*$"
                        title="Alphanumeric characters only"
                        placeholder="Email"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <input
                        minLength="8"
                        maxLength="35"
                        name="password"
                        pattern="^[a-zA-Z0-9]*$"
                        title="Alphanumeric characters only"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <button>Login</button>
                </form>
            </div>
        );
    }

   

}

export default withRouter(Login);