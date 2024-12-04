import { func } from 'prop-types';
import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class CustomerList extends Component {
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
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error Fetching Data:', error);
            })
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId:id })
        this.props.onCustomerSelect(id);
    }

    handleRemove = (id) => {
       
        axios.delete(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => {
                console.log('customer deleted successfully Submitted:', response.data);
            })
            .catch(error => {
                console.error('There was an error submitting  Form:', error);
            });
    };



    render() {
        const { customers } = this.state;



        return (
            <div className="customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            <Link to={'/CustomerForm/${Customer.id}'}>{customer.name}</Link>

                            <button type="button" onClick={() => this.handleRemove(customer.id)}>
                                Delete
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

CustomerList.propTypes = {
    onCustomerSelect: func
}
export default CustomerList;