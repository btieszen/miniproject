import { func } from 'prop-types';
import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null
        };
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:5000/customers')
        .then(response => {
            this.setState({ customers: response.data });
        })
            .catch(error => {
                console.error('Error Fetching Data:', error);
            })
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id })
        this.props.onCustomerSelect(id);
    }


    render() {
        const { customers } = this.state;

      

        return (
            <div className="customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            <Link to={'/CustomerForm/${Customer.id}'}>{customer.name} |  {customer.email}  |  {customer.phone}</Link>
                        
                            
                            

                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

Display.propTypes = {
    onCustomerSelect: func
}
export default Display;