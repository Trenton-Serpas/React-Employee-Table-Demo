import React, {Component} from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import auth from '../auth';

class Edit extends Component {
    constructor(props) {
        super();
        if(!auth.authenticated) {
            props.history.push('/')
        }
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            cellPhone: '',
            homePhone: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.fetchEmployee().then(rs => this.setState({
                id: rs.ID,
                firstName: rs.FIRST_NAME,
                lastName: rs.LAST_NAME,
                address: rs.ADDRESS,
                city: rs.CITY,
                state: rs.STATE,
                zip: rs.ZIP,
                cellPhone: rs.CELL_PHONE,
                homePhone: rs.HOME_PHONE,
                email: rs.EMAIL,
            }));
        }
    }

    TrySubmit(e) {
        e.preventDefault();
        // If we gave it an employee
        if(this.props.match.params.id) {
            fetch('http://localhost:3000/employees/edit', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(rs => this.props.history.push('/list'));
        } else {
            fetch('http://localhost:3000/employees/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(rs => this.props.history.push('/list'));
        }
    }

    fetchEmployee = async () => {
        const data = await fetch('http://localhost:3000/employees/byID/' + this.props.match.params.id);
        const json = await data.json();
        return json.data[0];
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {        
        return (
            <div className="Card" style={{width: '600px'}}>
                <form onSubmit={e=>this.TrySubmit(e)}>
                    <input
                        minLength="2"
                        maxLength="35"
                        name="firstName"
                        value={this.state.firstName}
                        pattern="^[a-zA-Z]*$"
                        placeholder="First Name"
                        title="Alphabetical characters only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <input
                        minLength="2"
                        maxLength="35"
                        name="lastName"
                        value={this.state.lastName}
                        pattern="^[a-zA-Z]*$"
                        placeholder="Last Name"
                        title="Alphabetical characters only"
                        onChange={this.handleChange}
                        required>                        
                    </input>
                    <input
                        minLength="10"
                        maxLength="50"
                        name="address"
                        value={this.state.address}
                        pattern="^[a-zA-Z0-9 ]*$"
                        placeholder="Address"
                        title="Alphanumeric characters and whitespace only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <input
                        minLength="5"
                        maxLength="50"
                        name="city"
                        value={this.state.city}
                        pattern="[a-zA-Z ]*$"
                        placeholder="City"
                        title="Alphabetical characters and whitespace only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <select
                        name="state"
                        value={this.state.state}
                        placeholder="State"
                        onChange={this.handleChange}
                        required>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input
                        minLength="5"
                        maxLength="9"
                        name="zip"
                        value={this.state.zip}
                        pattern="^[0-9]*$"
                        placeholder="Zip"
                        title="Numbers only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <hr></hr>
                    <input
                        minLength="10"
                        maxLength="10"
                        name="homePhone"
                        value={this.state.homePhone}
                        type="tel"
                        pattern="^[0-9]*$"
                        placeholder="Home Phone"
                        title="Numbers only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <input
                        minLength="10"
                        maxLength="10"
                        name="cellPhone"
                        value={this.state.cellPhone}
                        type="tel"
                        pattern="^[0-9]*$"
                        placeholder="Cell Phone"
                        title="Numbers only"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <input
                        minLength="10"
                        maxLength="50"
                        name="email"
                        value={this.state.email}
                        type="email"
                        placeholder="Email"
                        title="Please match email format"
                        onChange={this.handleChange}
                        required>
                    </input>
                    <button>Submit</button>
                    <button type="button" onClick={e => this.props.history.push('/list')}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Edit);
