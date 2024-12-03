import { Component } from 'react';
import axios from 'axios';

class CustomerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            error: {},
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value)
    };

    validateForm = () => {
        const { name, email, phone } = this.state;
        const error = {};
        if (!name) error.name = 'Name is Required';
        if (!email) error.email = 'Email is Required';
        if (!phone) error.phone = 'Phone is Required';
        return error;
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Submitted customer:', this.state);

            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim(),
            };
            axios.post('http://127.0.0.1:5000/customers', customerData)
                .then(response => {
                    console.log('Data successfully Submitted:', response.data);
                })
                .catch(error => {
                    console.error('There was an error submitting  Form:', error);
                });
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, email, phone } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Customer</h3>
                <label>
                    Name:
                    <input type='text' name='name' value={name} onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' name='email' value={email} onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Phone:
                    <input type='tell' name='phone' value={phone} onChange={this.handleChange}
                    />
                </label>
                <br />
                <button type='submit'>submit</button>
            </form>
        );
    };
}
export default CustomerForm;